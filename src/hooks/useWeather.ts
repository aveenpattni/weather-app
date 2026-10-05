import { useCallback, useEffect, useState } from 'react';

import { fetchCurrentWeather, Units, Weather } from '../api/weather';

export function useWeather(city: string, units: Units) {
  const [data, setData] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    // Abort the in-flight request so a stale response can't overwrite a newer one.
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchCurrentWeather(city, units, controller.signal)
      .then((weather) => {
        setData(weather);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setData(null);
        setError(err instanceof Error ? err.message : 'Something went wrong.');
        setLoading(false);
      });

    return () => controller.abort();
  }, [city, units, reloadKey]);

  const refetch = useCallback(() => setReloadKey((key) => key + 1), []);

  return { data, loading, error, refetch };
}
