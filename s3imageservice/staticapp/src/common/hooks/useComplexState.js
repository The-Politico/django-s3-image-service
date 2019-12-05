import { useState, useCallback } from 'react';
import assign from 'lodash/assign';

export default initialState => {
  const [state, updateState] = useState(initialState);
  const smartUpdate = useCallback(changes => updateState(assign({}, state, changes)), [state, updateState]);
  return [state, smartUpdate];
};
