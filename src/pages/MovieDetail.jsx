import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
    },
  };

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      setMovie(data);
    };
    fetchDetail();
  }, []);

  // 홈페이지 링크 정도 더 추가하기
  // MOVIES - Similar 에서 비슷한 영화 긁어서 아래 목록 띄워주기

  return (
    <main className='relative flex flex-col px-12 bg-black text-zinc-400 pt-96 dark:text-zinc-400'>
      <img
        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        alt='background image'
        draggable={false}
        className='absolute top-0 left-0 z-0 blur-md'
      />
      <h2 className='z-0 pb-4 mb-8 text-5xl font-semibold border-b drop-shadow-[0_0_5px_rgba(0,0,0,1)] text-white'>
        {movie?.title}
      </h2>
      <div className='z-0 flex gap-4'>
        <div className='z-0 flex flex-col gap-4 pr-4'>
          <ul className='flex justify-end gap-2'>
            {movie?.genres?.map((g) => (
              <span
                key={g.id}
                className='drop-shadow-[0_0_5px_rgba(0,0,0,1)] text-white'
              >
                #{g.name}
              </span>
            ))}
          </ul>
          <span className='drop-shadow-[0_0_5px_rgba(0,0,0,1)] text-white'>
            ⭐️ : {movie?.vote_average}
          </span>
          <span className='drop-shadow-[0_0_5px_rgba(0,0,0,1)] text-white'>
            📅 : {movie?.release_date}
          </span>
          <span className='drop-shadow-[0_0_5px_rgba(0,0,0,1)] text-white'>
            ⏰ : {Math.floor(movie?.runtime / 60)}h {movie?.runtime % 60}m
          </span>
          <p className='pt-2 border-t'>{movie?.overview}</p>
        </div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          alt='poster'
          draggable={false}
          className='z-0 mb-12'
        />
      </div>
    </main>
  );
}
