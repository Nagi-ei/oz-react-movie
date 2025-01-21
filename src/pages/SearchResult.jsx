import React from 'react';
import { useSearchParams } from 'react-router';
import useFetch from '../hooks/useFetch';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import MovieCard from '../components/MovieCard';
import { useEffect } from 'react';

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  // console.log(searchParams.get('movie'));

  const url = `https://api.themoviedb.org/3/search/movie?query=${searchParams.get(
    'movie'
  )}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  };

  const { data, isLoading, error } = useFetch(url, options);

  // useEffect(() => {

  // }, [])

  if (isLoading)
    return (
      <main className='flex flex-wrap gap-4 p-8 list-none dark:bg-black'>
        <MovieCardSkeleton />
        <MovieCardSkeleton />
        <MovieCardSkeleton />
      </main>
    );

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
