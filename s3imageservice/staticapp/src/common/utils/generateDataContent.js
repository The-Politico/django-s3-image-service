export default (data, type) => {
  const content = {};

  for (let prop in type.json_schema.properties) {
    if (data[prop]) {
      content[prop] = data[prop];
      if (prop !== 'content') {
        delete data[prop];
      }
    } else if (type.json_schema.properties[prop].type === 'string') {
      // "Blank" empty string fields
      content[prop] = '';
    } else {
      // "Nullify" other empty fieds
      content[prop] = null;
    }
  }

  return content;
};
