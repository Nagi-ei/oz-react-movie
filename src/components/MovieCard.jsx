import React from 'react';
import { useNavigate } from 'react-router';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/details');
  };

  return (
    <li
      className='flex flex-col gap-2 border hover:cursor-pointer'
      onClick={handleClick}
    >
      <div className='overflow-hidden'>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt='movie_img'
          className='w-[300px] h-[420px] object-cover hover:scale-110 ease-in duration-100'
        />
      </div>
      <span className='text-xl font-bold'>{movie.title}</span>
      <span className='text-right'>평균 ⭐️ : {movie.vote_average}</span>
    </li>
  );
}
