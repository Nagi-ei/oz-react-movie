import { useState } from 'react';
import { useEffect } from 'react';
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
    <>
      <nav>
        <h1>무우우우우우비</h1>
      </nav>
      <ul className='list-none p-8 flex flex-wrap gap-4'>
        {movieList.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </ul>
    </>
  );
}
