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
    <main className='flex p-12 bg-black text-zinc-400'>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
        alt='poster'
      />
      <div className='flex flex-col gap-4 p-4'>
        <h2 className='pb-2 text-3xl font-bold text-white border-b'>
          {movie?.title}
        </h2>
        <span>
          ⭐️ {movie?.vote_average} // {movie?.release_date} // {movie?.runtime}{' '}
          m
        </span>
        <ul className='flex justify-end gap-2'>
          {movie?.genres?.map((g) => (
            <span key={g.id}>#{g.name}</span>
          ))}
        </ul>
        <p className='pt-2 border-t'>{movie?.overview}</p>
      </div>
    </main>
  );
}
