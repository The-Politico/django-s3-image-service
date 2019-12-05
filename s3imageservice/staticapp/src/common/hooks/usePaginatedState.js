import { useState, useCallback, useMemo, useEffect } from 'react';
import keys from 'lodash/keys';
import get from 'lodash/get';
import useFetch from 'Common/hooks/useFetch';
import api from 'Common/utils/api';

export default (config) => {
  const { endpoint, instance, action, params, countAccesor = 'count', default: defaultData } = config;

  const [page, updatePage] = useState(1);
  const updatePageNumber = useCallback(val => {
    updatePage(parseInt(val));
  });

  useEffect(() => {
    updatePageNumber(1);
  }, [config]);

  useEffect(() => {
    refresh();
  }, [config, page]);

  const fetchFunc = useCallback(
    () => {
      const paramConfig = new URLSearchParams();
      keys(params).forEach(p => paramConfig.append(p, params[p]));
      paramConfig.append('page', page);
      const paramString = `?${paramConfig.toString()}`;

      return api[endpoint].GET({ instance, action, params: paramString });
    },
    [endpoint, instance, action, params, page]);

  const [data, refresh] = useFetch(fetchFunc, defaultData, false);

  const hasNext = useMemo(() => page !== parseInt(get(data, countAccesor)), [page, data, config]);
  const hasPrev = useMemo(() => page !== 1, [page]);

  const next = useCallback(() => {
    if (hasNext) {
      updatePage(prev => prev + 1);
    }
  }, [updatePage, hasNext]);

  const previous = useCallback(() => {
    if (hasPrev) {
      updatePage(prev => prev - 1);
    }
  }, [updatePage, hasPrev]);

  return {
    data: [data, refresh],
    page: [page, updatePageNumber],
    next: [hasNext, next],
    previous: [hasPrev, previous],
  };
};
