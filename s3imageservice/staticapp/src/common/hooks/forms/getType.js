import { useState, useCallback, useDebugValue } from 'react';
import find from 'lodash/find';

const getTypeFromSelection = (allTypes, selection) => {
  let type = find(allTypes, { id: selection });
  if (!type) {
    type = find(allTypes, { name: selection });
  }
  if (!type) {
    throw new Error(`No type found with id or name: ${selection}`);
  }

  return type;
};

export default function useType(allTypes, selection) {
  const [state, updateState] = useState(getTypeFromSelection(allTypes, selection));

  const update = newSelection => {
    updateState(getTypeFromSelection(allTypes, newSelection));
  };

  const findType = useCallback(sel => {
    return getTypeFromSelection(allTypes, sel);
  }, [allTypes]);

  useDebugValue(state.id);

  return [state, update, findType];
};
