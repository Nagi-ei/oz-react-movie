import MovieCardSkeleton from '@/components/MovieCardSkeleton';
import useFetch from '@/hooks/useFetch';
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router';

export default function MovieDetail() {
  const { id } = useParams();
  const isMobile = useMediaQuery({
    query: '(max-width: 639px)',
  });

  const skeletonArr = [...new Array(30)].map((_, i) => i + 1);

  // MOVIES - Details
  const MOVIES_DETAILS = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  const {
    data: movieDetails,
    isLoading: isLoadingDetails,
    error: errorDetails,
  } = useFetch(MOVIES_DETAILS);

  // 홈페이지 링크 정도 더 추가하기
  // MOVIES - Similar 에서 비슷한 영화 긁어서 아래 목록 띄워주기

  if (isLoadingDetails) {
    return (
      <main className='bg-black pt-[88px]'>
        <ul className='flex flex-wrap justify-center gap-4 p-8 list-none'>
          {skeletonArr.map((n) => (
            <MovieCardSkeleton key={n} />
          ))}
        </ul>
      </main>
    );
  }

  if (errorDetails) {
    return (
      <main className='flex flex-col items-center justify-center h-full gap-8 pt-[88px]'>
        <h2 className='lg:text-3xl'>Something went wrong! 😅</h2>
        <p className='text-sm lg:text-base'>( {error} )</p>
      </main>
    );
  }

  return (
    <main className='relative flex flex-col px-12 pt-48 bg-black text-zinc-400 lg:pt-96 dark:text-zinc-400 sm:pt-[88px]'>
      <img
        src={`https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path}`}
        alt='background image'
        draggable={false}
        className='absolute top-0 left-0 z-0 blur-md max-sm:top-20'
      />
      <h2 className='z-0 pb-4 mb-8 text-2xl lg:text-5xl font-semibold border-b drop-shadow-[0_0_5px_rgba(0,0,0,1)] text-white'>
        {movieDetails?.title}
      </h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
        alt='poster'
        draggable={false}
        className='z-0 mb-12 sm:hidden'
      />
      <div className='relative z-0 flex gap-4'>
        <div className='sm:absolute z-0 flex flex-col gap-4 lg:pr-4 lg:static sm:top-[500px] w-full'>
          <ul className='flex flex-wrap justify-end gap-2'>
            {movieDetails?.genres?.map((g) => (
              <span
                key={g.id}
                className='drop-shadow-[0_0_5px_rgba(0,0,0,1)] text-white'
              >
                #{g.name}
              </span>
            ))}
          </ul>
          <span className='drop-shadow-[0_0_5px_rgba(0,0,0,1)] text-white'>
            ⭐️ : {movieDetails?.vote_average}
          </span>
          <span className='drop-shadow-[0_0_5px_rgba(0,0,0,1)] text-white'>
            📅 : {movieDetails?.release_date}
          </span>
          <span className='drop-shadow-[0_0_5px_rgba(0,0,0,1)] text-white'>
            ⏰ : {Math.floor(movieDetails?.runtime / 60)}h{' '}
            {movieDetails?.runtime % 60}m
          </span>
          <p className='pt-2 border-t'>{movieDetails?.overview}</p>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`}
          alt='poster'
          draggable={false}
          className='z-0 mb-12 max-sm:hidden'
        />
      </div>
    </main>
  );
}
