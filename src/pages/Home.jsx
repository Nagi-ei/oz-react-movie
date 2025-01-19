import React from 'react';
import MovieCard from '../components/MovieCard';
import LoopSlide from '../components/LoopSlide';
import MovieCardSkeleton from '../components/MovieCardSkeleton';

export default function Home({ movieList, isLoading }) {
  if (isLoading) {
    return (
      <main className='bg-black'>
        <ul className='flex flex-wrap gap-4 p-8 list-none'>
          {Array(20).map((e) => (
            <MovieCardSkeleton />
          ))}
        </ul>
      </main>
    );
  }
  return (
    <main className='bg-black'>
      <LoopSlide movieList={movieList} />
      <ul className='flex flex-wrap gap-4 p-8 list-none'>
        {movieList.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </ul>
    </main>
  );
}
