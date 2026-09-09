import { useState, useEffect, useCallback } from 'react';
import { getDatasetSeries } from '../services/apiClient';

export const useSensorData = (datasetName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async (signal) => {
    if (!datasetName) {
      setData([]);
      setError(new Error('This dataset is not approved for the live dashboard.'));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const json = await getDatasetSeries(datasetName, { signal });
      setData(Array.isArray(json) ? json : []);
    } catch (err) {
      if (err.name !== 'AbortError') setError(err);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [datasetName]);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load]);

  return { data, loading, error, refetch: () => load() };
};
