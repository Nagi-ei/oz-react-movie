import React from 'react';
import MovieCard from '../components/MovieCard';
import LoopSlide from '../components/LoopSlide';

export default function Home({ movieList }) {
  return (
    <main>
      <LoopSlide movieList={movieList} />
      <ul className='flex flex-wrap gap-4 p-8 list-none'>
        {movieList.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </ul>
    </main>
  );
}
