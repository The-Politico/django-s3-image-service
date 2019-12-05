import assign from 'lodash/assign';

export default (original, merge) => {
  const copy = assign({}, original, merge);

  const mergeOrder = merge['ui:order'] ? merge['ui:order'] : [];
  const originalOrder = original['ui:order'] ? original['ui:order'] : [];
  copy['ui:order'] = [...originalOrder, ...mergeOrder];
  return copy;
};
