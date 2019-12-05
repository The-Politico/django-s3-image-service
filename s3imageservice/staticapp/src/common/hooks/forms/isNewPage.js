import { useState, useDebugValue } from 'react';

export default function useIsNew(data) {
  const [state] = useState(!(data && data.id));
  useDebugValue(state);
  return state;
}
