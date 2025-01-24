import MovieCard from '@/components/MovieCard';
import MovieCardSkeleton from '@/components/MovieCardSkeleton';
import useFetch from '@/hooks/useFetch';
import React from 'react';
import { useParams } from 'react-router';

export default function MovieDetail() {
  const { id } = useParams();
  console.log(id);
  const skeletonArr = [...new Array(30)].map((_, i) => i + 1);

  // MOVIES - Details
  const MOVIES_DETAILS = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const {
    data: movieDetails,
    isLoading: isLoadingDetails,
    error: errorDetails,
  } = useFetch(MOVIES_DETAILS);

  // MOVIES - Similar
  const MOVIES_SIMILAR = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;
  const {
    data: moviesSimilar,
    isLoading: isLoadingSimilar,
    error: errorSimilar,
  } = useFetch(MOVIES_SIMILAR);

  console.log(moviesSimilar);

  if (isLoadingDetails || isLoadingSimilar) {
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

  if (errorDetails || errorSimilar) {
    return (
      <main className='flex flex-col items-center justify-center h-full gap-8 pt-[88px]'>
        <h2 className='lg:text-3xl'>Something went wrong! 😅</h2>
        <p className='text-sm lg:text-base'>( {error} )</p>
      </main>
    );
  }

  return (
    <main className='flex flex-col px-12 py-48 bg-black grow text-zinc-400 lg:pt-96 dark:text-zinc-400 xl:px-36 2xl:px-60'>
      {/* 배경 이미지 */}
      <img
        src={`https://image.tmdb.org/t/p/original${movieDetails?.backdrop_path}`}
        alt='background image'
        draggable={false}
        className='absolute left-0 z-0 top-20 blur-sm max-sm:top-20'
      />

      <h2 className='z-0 pb-4 mb-4 text-2xl lg:text-5xl font-semibold border-b drop-shadow-[0_0_5px_rgba(0,0,0,1)] text-white'>
        {movieDetails?.title}
      </h2>

      <div className='z-0 flex flex-col gap-4 pb-8 border-b lg:gap-8 md:flex-row dark:border-t-zinc-600 border-t-zinc-300'>
        <img
          src={`https://image.tmdb.org/t/p/original${movieDetails?.poster_path}`}
          alt='poster'
          draggable={false}
          className='md:w-1/2'
        />
        {/* 영화 정보 */}
        <div className='z-0 flex gap-4'>
          <div className='z-0 flex flex-col gap-4 lg:pr-4 lg:static sm:top-[500px] w-full'>
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
        </div>
      </div>

      {/* 비슷한 영화 목록 */}
      <section className='pt-8'>
        <h3 className='text-xl font-semibold lg:text-3xl'>Similar Movies</h3>
        <ul className='flex flex-wrap justify-center gap-4 p-8 list-none'>
          {moviesSimilar?.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </ul>
      </section>
    </main>
  );
}
