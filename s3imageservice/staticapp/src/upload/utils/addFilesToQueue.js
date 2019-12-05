import includes from 'lodash/includes';
import update from 'immutability-helper';

import getContentByName from 'Common/utils/getContentByName';
import * as supportedFiles from 'Common/constants/supported';

const MB_LIMTIT = getContentByName('FILE_MB_LIMIT');

export default ({ additions, updateFiles, updateError }) => {
  updateFiles(files => {
    for (let af of additions) {
      if (includes(files.map(f => f.file.name), af.name)) {
        updateError(`The file ${af.name} is already in your queue.`);
        return files;
      }

      if (!includes(supportedFiles.TYPES, af.type)) {
        updateError(`The file ${af.name} is not a supported file type.`);
        return files;
      }

      if (af.size > supportedFiles.SIZE) {
        updateError(`The file ${af.name} is too large. Images must be < ${MB_LIMTIT}MB.`);
        return files;
      }
    }

    updateError(null);

    const newFiles = update(files, {
      $push: additions.map(af => ({
        file: af,
        status: 'pending',
        name: af.name,
        src: null,
        id: null,
      })),
    });

    return newFiles;
  });
};
