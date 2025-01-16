import React from 'react';

export default function MovieCard({ movie }) {
  return (
    <li className='flex flex-col gap-2 border'>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt='movie_img'
        className='w-[300px] h-[420px] object-cover'
      />
      <span className='text-xl font-bold'>{movie.title}</span>
      <span className='text-right'>평균 ⭐️ : {movie.vote_average}</span>
    </li>
  );
}
