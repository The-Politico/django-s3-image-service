import update from 'immutability-helper';
import chunk from 'lodash/chunk';
import api from 'Common/utils/api';
import keys from 'lodash/keys';
import { capfirst } from 'journalize';
import getContentByName from 'Common/utils/getContentByName';
import csrftoken from 'Common/constants/csrf';
import { USER_ID } from 'Common/constants/user';

const CHUNK_SIZE = 3;
const UPLOAD_URL = `//${window.location.host}${getContentByName('UPLOAD_ROOT')}`;
const S3_ROOT = getContentByName('S3_ROOT');

const upload = (file, settings) => {
  if (file.status !== 'complete' && file.status !== 'uploading') {
    const formData = new FormData();
    formData.append('img', file.file);

    console.log('settings', settings);

    if (settings.sizes) { formData.append('sizes', `[${settings.sizes}]`); }
    if (settings.compression) { formData.append('compression', settings.compression); }
    if (settings.progressive) { formData.append('progressive', settings.progressive); }
    if (settings.convertToJPG) { formData.append('convertToJPG', settings.convertToJPG); }

    window.formData = formData;

    return fetch(UPLOAD_URL, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrftoken,
      },
      body: formData,
    })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          return resp.text()
            .then(text => {
              let e;
              try {
                console.log('textError', text);
                const parsedError = JSON.parse(text);
                console.error('Error Report:');
                console.table(parsedError);
                console.log(parsedError);

                const firstError = parsedError[keys(parsedError)[0]];
                if (firstError) {
                  e = new Error(capfirst(`${firstError}`));
                }
              } catch (err) {}

              if (!e) {
                e = new Error(`${resp.statusText}. See console for more.`);
              }
              e.errorText = text;
              return e;
            });
        }
      });
  }
};

const record = async(uploadData) => {
  const canonical = uploadData.canonical;
  const slug = /^([\d/\w]*)-?[\d]*\.[A-Za-z]{3,4}$/.exec(canonical.split(S3_ROOT)[1])[1];
  try {
    const resp = await api.upload.POST({
      data: {
        canonical,
        slug,
        data: uploadData,
        owner: USER_ID,
      },
    });
    return resp;
  } catch (e) {
    return e;
  }
};

const setStatus = ({ updateFiles, idx, status, error, src, name, id }) => {
  updateFiles(filesBeforeUpdate => {
    const updateData = {
      [idx]: {
        status: {
          $set: status,
        },
        error: {
          $set: error,
        },
      },
    };

    if (id) {
      updateData[idx].id = { $set: id };
    }

    if (name) {
      updateData[idx].name = { $set: name };
    }

    if (src) {
      updateData[idx].src = { $set: src };
    }

    return update(filesBeforeUpdate, updateData);
  });
};

export default async({ files, updateFiles, updateError, updateUploadInProgress, settings }) => {
  updateUploadInProgress(true);
  const chunks = chunk(files, CHUNK_SIZE);

  for (let cIdx = 0; cIdx < chunks.length; cIdx++) {
    await Promise.all(chunks[cIdx].map(async(f, fIdx) => {
      const truIndex = fIdx + (cIdx * CHUNK_SIZE);
      if (files[truIndex].status !== 'complete') {
        setStatus({ idx: truIndex, status: 'uploading', updateFiles });
        const uploadResp = await upload(chunks[cIdx][fIdx], settings);
        if (uploadResp instanceof Error) {
          setStatus({ idx: truIndex, status: 'failed', error: uploadResp.message, updateFiles });
        } else {
          const recordResp = await record(uploadResp);
          if (recordResp instanceof Error) {
            setStatus({ updateFiles, idx: truIndex, status: 'failed', error: recordResp.message });
          } else {
            setStatus({ updateFiles, idx: truIndex, status: 'complete', src: recordResp.canonical, name: recordResp.slug, id: recordResp.id });
          }
        }
      }
    }));
  }

  updateUploadInProgress(false);
};
