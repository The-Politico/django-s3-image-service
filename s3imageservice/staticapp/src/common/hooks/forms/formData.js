import { useState, useCallback } from 'react';
import assign from 'lodash/assign';
import flattenContent from 'Common/utils/flattenContent';
import roundDateToNearestPub from 'Common/utils/roundDateToNearestPub';

const getflattenedData = ({ defaultData, schema, type, loggedInUser }) => {
  return defaultData ?
    flattenContent(defaultData, schema) :
    type ?
      {
        // s3imageservice & interstitial
        author: loggedInUser.id,
        last_updated: null,
        type: type.id,
      } : {
        // editions
        publish_datetime: roundDateToNearestPub(new Date()),
      };
};

export default function useFormData({ defaultData, user, schema, type, updateType, findType }) {
  const [state, updateState] = useState(getflattenedData({ defaultData, schema, type, loggedInUser: user }));

  const onChange = useCallback(({ formData }) => {
    const update = assign({}, formData);
    const typeHasChanged = state.type !== update.type;
    if (findType && typeHasChanged) {
      const typeConfig = findType(update.type);

      for (let prop in typeConfig.json_schema.properties) {
        update[prop] = undefined;
      }
    }

    updateState(update);

    if (updateType && typeHasChanged) {
      updateType(update.type);
    }
  });

  return [state, onChange, updateState];
}
