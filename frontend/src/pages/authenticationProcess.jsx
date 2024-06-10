import React, { useEffect, useState } from 'react';
import useAPI from '../api.js';

const authenticationProcess = () => {
  const [data, setData] = useState(null);
  const API = useAPI();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get('/protected');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching protected data:', error);
      }
    };

    fetchData();
  }, [API]);

  return (
    <div>
      {data ? <p>{data}</p> : <p>Loading...</p>}
    </div>
  );
};

export default authenticationProcess;
