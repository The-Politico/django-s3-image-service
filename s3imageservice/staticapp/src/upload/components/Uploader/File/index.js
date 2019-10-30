import React, { useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import sleep from 'Common/utils/sleep';

import Status from './Status';

import { styles } from './styles.scss';

const waitForUpload = async(url, intervalTime = 500, limit = 10) => {
  if (!url) {
    return false;
  }

  const resp = await fetch(url, {
    method: 'GET',
  });

  if (resp.ok) {
    return true;
  } else if (limit === 0) {
    return false;
  } else {
    await sleep(intervalTime);
    return waitForUpload(url, intervalTime, limit - 1);
  }
};

const Files = (props) => {
  const { status, error, name, src, id, idx, remove } = props;

  const [preview, updatePreview] = useState('icon');

  const onClick = useCallback(() => {
    if (id) {
      window.open(`../detail/${id}`, '_blank');
    }
  }, [id]);

  useEffect(() => {
    const waitFor = async() => {
      const imageIsReady = await waitForUpload(src);
      if (imageIsReady) {
        updatePreview(src);
      }
    };
    waitFor();
  }, [src]);

  return (
    <div className={classnames('file-wrapper', styles)}>
      <div className={classnames('file', status, { isLink: id })}>

        {status !== 'complete' &&
          <div className='remove' onClick={() => remove(idx)}>
            <span>X</span>
          </div>
        }

        <div onClick={onClick} className='image'>
          {preview === 'icon' ?
            <i className='far fa-image' /> :
            <img src={preview} alt='' />
          }
        </div>

        <div className='filename'>
          {name}
        </div>

        <Status>{status}</Status>

        <div className='error'>
          {error}
        </div>
      </div>
    </div>
  );
};

export default Files;
