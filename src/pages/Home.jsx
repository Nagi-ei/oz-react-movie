import React from 'react';
import MovieCard from '../components/MovieCard';

export default function Home({ movieList }) {
  return (
    <main>
      <ul className='list-none p-8 flex flex-wrap gap-4'>
        {movieList.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </ul>
    </main>
  );
}
