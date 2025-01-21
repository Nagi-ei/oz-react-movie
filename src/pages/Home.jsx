import React from 'react';
import MovieCard from '../components/MovieCard';
import LoopSlide from '../components/LoopSlide';
import MovieCardSkeleton from '../components/MovieCardSkeleton';

export default function Home({ movieList, isLoading }) {
  const skeletonArr = [...new Array(30)].map((_, i) => i + 1);

  if (isLoading) {
    return (
      <main className='bg-black'>
        <ul className='flex flex-wrap justify-center gap-4 p-8 list-none'>
          {skeletonArr.map((n) => (
            <MovieCardSkeleton key={n} />
          ))}
        </ul>
      </main>
    );
  }
  return (
    <main className='dark:text-white dark:bg-black'>
      <LoopSlide movieList={movieList} />
      <h2 className='mt-12 ml-12 text-4xl'>Popular</h2>
      <ul className='flex flex-wrap justify-center gap-8 p-6 list-none'>
        {movieList
          .filter((movie) => movie.adult === false)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </ul>
    </main>
  );
}
