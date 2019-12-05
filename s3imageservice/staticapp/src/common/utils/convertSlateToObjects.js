import assign from 'lodash/assign';

export default (data, fullSchema) => {
  const copy = assign({}, data);

  for (let schemaType in fullSchema) {
    const schema = fullSchema[schemaType];
    for (let prop in schema.ui) {
      if ('ui:widget' in schema.ui[prop] && schema.ui[prop]['ui:widget'] === 'slate') {
        if (prop !== 'content' && prop in copy && typeof copy[prop] !== 'undefined') {
          copy[prop] = JSON.parse(copy[prop]);
        } else if (prop in copy.content && typeof copy.content[prop] !== 'undefined') {
          copy.content[prop] = JSON.parse(copy.content[prop]);
        }
      }
    }
  }

  return copy;
};
