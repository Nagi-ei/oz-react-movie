import React from 'react';
import { useSearchParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import MovieCard from '../components/MovieCard';

export default function SearchResult() {
  const skeletonArr = [...new Array(30)].map((_, i) => i + 1);

  const [searchParams] = useSearchParams();
  // console.log(searchParams.get('movie'));

  const url = `https://api.themoviedb.org/3/search/movie?query=${searchParams.get(
    'movie'
  )}&include_adult=false&language=en-US&page=1`;

  const { data, isLoading, error } = useFetch(url);

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

  if (error) {
    return (
      <main className='flex flex-col items-center justify-center h-full gap-8'>
        <h2 className='lg:text-3xl'>Something went wrong! 😅</h2>
        <p className='text-sm lg:text-base'>( {error} )</p>
      </main>
    );
  }

  return (
    <main>
      <ul className='flex flex-wrap justify-center gap-4 p-8 list-none dark:bg-black'>
        {data
          .filter((movie) => movie.adult === false)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </ul>
    </main>
  );
}
