import assign from 'lodash/assign';

export default (original, merge) => {
  const copy = assign({}, original, merge);

  const originalRequired = original.required ? original.required : [];
  const mergeRequired = merge.required ? merge.required : [];
  copy.required = [...originalRequired, ...mergeRequired];

  copy.properties = assign({}, original.properties, merge.properties);
  return copy;
};
