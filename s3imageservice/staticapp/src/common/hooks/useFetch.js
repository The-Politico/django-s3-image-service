import { useState, useEffect, useMemo } from 'react';

export default function useFetch(src, defaultData, refreshOnChange = true) {
  const [data, updateData] = useState(defaultData);

  const refresh = useMemo(() => {
    if (typeof src === 'function') {
      return () => {
        src()
          .then(d => updateData(d));
      };
    } else {
      return () => {
        fetch(src)
          .then(r => r.json())
          .then(d => updateData(d));
      };
    }
  }, [src]);

  useEffect(() => {
    if (refreshOnChange) {
      refresh();
    }
  }, [refreshOnChange, src]);

  return [data, refresh, updateData];
}
