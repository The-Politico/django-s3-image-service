import update from 'immutability-helper';

export default updateFiles => idx => {
  updateFiles(files => update(
    files,
    {
      $splice: [[idx, 1]],
    }
  ));
};
