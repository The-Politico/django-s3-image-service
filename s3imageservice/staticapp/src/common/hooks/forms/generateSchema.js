import { useState, useEffect } from 'react';
import splitSchemas from 'Common/utils/splitSchemas';
import mergeJsonSchema from 'Common/utils/mergeJsonSchema';
import mergeUiSchema from 'Common/utils/mergeUiSchema';

export default function useSchema(opts) {
  const [schema, updateSchema] = useState(generateSchema(opts));

  if (opts.type) {
    useEffect(() => {
      updateSchema(
        generateSchema(opts)
      );
    }, [opts.type.id]);
  }

  return schema;
}

const generateSchema = ({ baseJson, baseUi, type }) => {
  const typeJson = type && type.json_schema ? type.json_schema : {
    required: [],
    properties: {},
  };
  const typeUi = type && type.ui_schema ? type.ui_schema : {};

  // Convert the 4 shchemas into 8 shcemas by splitting on "ui:type"
  const [
    mainBaseJson,
    mainBaseUi,
    contextBaseJson,
    contextBaseUi,
  ] = splitSchemas(
    baseJson,
    baseUi
  );
  const [
    mainTypeJson,
    mainTypeUi,
    contextTypeJson,
    contextTypeUi,
  ] = splitSchemas(typeJson, typeUi);

  // Merge the 8 schemas back into 4 by combining on "ui:type"
  const mainJson = mergeJsonSchema(mainBaseJson, mainTypeJson);
  const mainUi = mergeUiSchema(mainBaseUi, mainTypeUi);
  const contextJson = mergeJsonSchema(contextBaseJson, contextTypeJson);
  const contextUi = mergeUiSchema(contextBaseUi, contextTypeUi);

  return {
    main: {
      json: mainJson,
      ui: mainUi,
    },
    context: {
      json: contextJson,
      ui: contextUi,
    },
  };
};
