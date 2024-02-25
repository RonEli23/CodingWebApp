import axios from '../api/axios';
import { useEffect, useState } from 'react';

const useAxios = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoint);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('API Error:', error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {}; // Cleanup if needed
  }, [endpoint]);

  return { data, loading };
};

export default useAxios;
