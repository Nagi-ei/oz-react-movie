import React from 'react';
import MovieCard from '../components/MovieCard';
import Slide from '../components/Slide';

export default function Home({ movieList }) {
  return (
    <main>
      <Slide movieList={movieList} />
      <ul className='flex flex-wrap gap-4 p-8 list-none'>
        {movieList.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </ul>
    </main>
  );
}
