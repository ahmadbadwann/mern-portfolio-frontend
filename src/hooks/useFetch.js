import { useState, useEffect } from 'react';

export function useFetch(fetchFn, fallback = null) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchFn()
      .then((res) => {
        if (!cancelled) {
          setData(res.data || res);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.warn('API fetch failed, using fallback data:', err.message);
          setData(fallback);
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}
