import React from 'react';
import MovieCard from '../components/MovieCard';
import Slide from '../components/Slide';

export default function Home({ movieList }) {
  return (
    <main>
      <Slide movieList={movieList} />
      <ul className='list-none p-8 flex flex-wrap gap-4'>
        {movieList.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </ul>
    </main>
  );
}
