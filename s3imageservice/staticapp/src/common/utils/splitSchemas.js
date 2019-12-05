import keys from 'lodash/keys';
import includes from 'lodash/includes';
import pickBy from 'lodash/pickBy';

export default (jsonSchema, uiSchema) => {
  const filterForType = type => key =>
    !!uiSchema[key] &&
    !!uiSchema[key]['ui:type'] &&
    uiSchema[key]['ui:type'] === type;

  const mainKeys = keys(uiSchema).filter(filterForType('main'));
  const contextKeys = keys(uiSchema).filter(filterForType('context'));

  const mainJson = {
    required: jsonSchema.required ?
      jsonSchema.required.filter(k => includes(mainKeys, k)) :
      [],
    properties: jsonSchema.properties ?
      pickBy(jsonSchema.properties, (v, k) => includes(mainKeys, k)) :
      {},
  };

  const contextJson = {
    required: jsonSchema.required ?
      jsonSchema.required.filter(k => includes(contextKeys, k)) :
      [],
    properties: jsonSchema.properties ?
      pickBy(jsonSchema.properties, (v, k) => includes(contextKeys, k)) :
      {},
  };

  const mainUi = pickBy(uiSchema, (v, k) => includes(mainKeys, k));
  mainUi['ui:order'] = uiSchema['ui:order'] ? uiSchema['ui:order'].filter(k => includes(mainKeys, k)) : [];

  const contextUi = pickBy(uiSchema, (v, k) => includes(contextKeys, k));
  contextUi['ui:order'] = uiSchema['ui:order'] ? uiSchema['ui:order'].filter(k => includes(contextKeys, k)) : [];

  return [mainJson, mainUi, contextJson, contextUi];
};
