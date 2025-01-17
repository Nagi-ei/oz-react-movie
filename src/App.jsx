import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import MovieDetail from './pages/MovieDetail';
import Home from './pages/Home';
import Layout from './components/Layout';

export default function App() {
  const [movieList, setMovieList] = useState([]);

  const MOVIE_LIST_POPULAR =
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}}`,
    },
  };

  // console.log(import.meta.env.VITE_API_KEY);

  useEffect(() => {
    const fetchList = async () => {
      const response = await fetch(MOVIE_LIST_POPULAR, options);
      const data = await response.json();
      setMovieList(data.results);
      // console.log(data.results);
    };
    fetchList();
  }, [MOVIE_LIST_POPULAR]);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home movieList={movieList} />} />
          <Route path='/details/:id' element={<MovieDetail />} />
        </Route>
      </Routes>
    </>
  );
}
