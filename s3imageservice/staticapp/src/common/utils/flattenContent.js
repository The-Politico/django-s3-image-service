import assign from 'lodash/assign';

export default (data, schema) => {
  const flattened = assign({}, data, data.content);

  if (data.content && !data.content.content) {
    delete flattened.content;
  }

  for (let key in data) {
    if (data[key] === null) {
      data[key] = undefined;
    }
  }
  return flattened;
};
