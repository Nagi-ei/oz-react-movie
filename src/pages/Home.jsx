import React, { useState, useEffect, useRef } from 'react';
import MovieCard from '../components/MovieCard';
import LoopSlide from '../components/LoopSlide';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import useFetch from '@/hooks/useFetch';

export default function Home() {
  const skeletonArr = [...new Array(30)].map((_, i) => i + 1);
  const [popularMovies, setPopularMovies] = useState([]);
  const [page, setPage] = useState(1);

  const MOVIE_LIST_POPULAR = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  const MOVIE_LIST_TOP =
    'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';

  const {
    data: popularMoviesPage,
    isLoading: isLoadingPopular,
    error: errorPopular,
  } = useFetch(MOVIE_LIST_POPULAR, [page]);

  // 추가한 페이지까지 목록 업데이트 (중복 제거)
  useEffect(() => {
    setPopularMovies((prev) => [
      ...prev,
      ...popularMoviesPage.filter((m) => !prev.some((p) => p.id === m.id)),
    ]);
  }, [popularMoviesPage]);

  const {
    data: nowMovies,
    isLoading: isLoadingNow,
    error: errorNow,
  } = useFetch(MOVIE_LIST_TOP);

  // 무한 스크롤
  const targetRef = useRef(null);
  useEffect(() => {
    const observerCallback = (entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    };
    const options = { threshold: 0.5 };
    const observer = new IntersectionObserver(observerCallback, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [popularMovies]);

  // 렌더링
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
        <p className='text-sm lg:text-base'>
          ( {errorPopular ? errorPopular : ''} )
        </p>
        <p className='text-sm lg:text-base'>( {errorNow ? errorNow : ''} )</p>
      </main>
    );
  }

  return (
    <main className='dark:text-white dark:bg-black py-[88px]'>
      <LoopSlide movieList={nowMovies} />
      <h2 className='mt-6 ml-6 text-2xl lg:mt-12 lg:ml-12 lg:text-4xl'>
        Popular
      </h2>
      <ul className='flex flex-wrap justify-center gap-8 p-6 list-none'>
        {popularMovies
          .filter((movie) => movie.adult === false)
          .map((movie, i) =>
            popularMovies.length === i + 1 ? (
              <MovieCard movie={movie} key={movie.id} ref={targetRef} />
            ) : (
              <MovieCard movie={movie} key={movie.id} />
            )
          )}
      </ul>
    </main>
  );
}

// react-intersection-observer 나중에 사용해 보기
