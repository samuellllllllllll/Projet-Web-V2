import React, { useEffect, useState } from 'react';
import useAPI from '../api.js';

const authenticationProcess = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API = useAPI();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await API.get('/protected');
        setData(response.data);
      } catch (error) {
        setError('Error fetching protected data');
        console.error('Error fetching protected data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>{data}</p>
      )}
    </div>
  );
};

export default authenticationProcess;
