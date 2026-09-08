import { useState, useEffect } from 'react';
import SensorData1 from '../data/sensorData1.json';
import { normaliseApiRecords } from '../utils/timestampUtils.js';

export const useSensorData = (useMock = true, endpoint = '/api/streams') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    if (useMock) {
      setData(normaliseApiRecords(SensorData1));
      setLoading(false);
      return () => controller.abort();
    }

    fetch(endpoint, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        return response.json();
      })
      .then((json) => {
        const records = Array.isArray(json) ? json : [];
        setData(normaliseApiRecords(records));
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [useMock, endpoint]);

  return { data, loading, error };
};