import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import MovieDetail from './pages/MovieDetail';
import Home from './pages/Home';
import NavBar from './components/Navbar';
import Layout from './components/Layout';

export default function App() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchList = async () => {
      const response = await fetch('/src/assets/data/movieListData.json');
      const data = await response.json();
      setMovieList(data.results);
    };
    fetchList();
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home movieList={movieList} />} />
          <Route path='/details' element={<MovieDetail />} />
        </Route>
      </Routes>
    </>
  );
}
