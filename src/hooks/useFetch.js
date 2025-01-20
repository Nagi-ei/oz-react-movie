import { useState, useEffect } from 'react';

export default function useFetch(url, options) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(url, options);

        // 서버의 에러 응답은 성공으로 간주하므로, 따로 에러 발생시키기
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonedData = await response.json();
        setData(jsonedData.results);
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
