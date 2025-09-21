import { useEffect, useState } from "react";

// Custom hook to fetch data from an API
export function useFetch(fetchFn, initialValue = null) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState('');
  const [fetchPlaces, setFetchPlaces] = useState(initialValue);

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchPlaces(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      } finally {
        setIsFetching(false);
      }
    };
    fetchPlaces();
  }, [fetchFn]);

  return { isFetching, setFetchPlaces, fetchPlaces, error };  
};