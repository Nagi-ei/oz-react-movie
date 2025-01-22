import { useState, useEffect } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  };

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(url, options);

        // 서버의 에러 응답은 성공으로 간주하므로, 따로 에러 발생시키기
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonedData = await response.json();
        if (jsonedData.results) {
          setData(jsonedData.results);
        } else {
          setData(jsonedData);
        }
      } catch (err) {
        console.log(err);
        setError(err.message); // err? err.message?
      } finally {
        setIsLoading(false);
      }
    };
    fetchAPI();
  }, []);

  return { data, isLoading, error };
}
