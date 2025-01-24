import React from 'react';
import MovieCard from '../components/MovieCard';
import LoopSlide from '../components/LoopSlide';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import useFetch from '@/hooks/useFetch';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Home() {
  const skeletonArr = [...new Array(30)].map((_, i) => i + 1);
  const [page, setPage] = useState(1);

  const MOVIE_LIST_POPULAR = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  const MOVIE_LIST_TOP =
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

  const {
    data: popularMovies,
    isLoading: isLoadingPopular,
    error: errorPopular,
  } = useFetch(MOVIE_LIST_POPULAR);

  const {
    data: nowMovies,
    isLoading: isLoadingNow,
    error: errorNow,
  } = useFetch(MOVIE_LIST_TOP);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const isScrollAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight;
    }),
      [];
  });

  if (isLoadingPopular || isLoadingNow) {
    return (
      <main className='bg-black sm:pt-[88px]'>
        <ul className='flex flex-wrap justify-center gap-4 p-8 list-none'>
          {skeletonArr.map((n) => (
            <MovieCardSkeleton key={n} />
          ))}
        </ul>
      </main>
    );
  }

  if (errorPopular || errorNow) {
    return (
      <main className='flex flex-col items-center justify-center h-full gap-8 sm:pt-[88px]'>
        <h2 className='lg:text-3xl'>Something went wrong! 😅</h2>
        <p className='text-sm lg:text-base'>( {error} )</p>
      </main>
    );
  }

  return (
    <main className='dark:text-white dark:bg-black pt-[88px]'>
      <LoopSlide movieList={nowMovies} />
      <h2 className='mt-6 ml-6 text-2xl lg:mt-12 lg:ml-12 lg:text-4xl'>
        Popular
      </h2>
      <ul className='flex flex-wrap justify-center gap-8 p-6 list-none'>
        {popularMovies
          .filter((movie) => movie.adult === false)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </ul>
    </main>
  );
}
