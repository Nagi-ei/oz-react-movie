import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import MovieCard from './components/MovieCard';

export default function App() {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/src/assets/data/movieListData.json');
      const data = await response.json();
      setMovieList(data.results);
    };
    fetchData();
  }, []);

  return (
    <ul>
      {movieList.map((movie) => (
        <MovieCard movie={movie} key={movie.id} />
      ))}
    </ul>
  );
}

// https://image.tmdb.org/t/p/w400/4xJd3uwtL1vCuZgEfEc8JXI9Uyx.jpg
