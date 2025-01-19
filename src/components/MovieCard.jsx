import React from 'react';
import { useNavigate } from 'react-router';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(movie);
    navigate(`/details/${movie.id}`);
  };

  return (
    <li
      className='flex flex-col gap-2 hover:cursor-pointer w-[300px]'
      onClick={handleClick}
    >
      <div className='overflow-hidden'>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt='movie_img'
          className='w-[300px] h-[420px] object-cover hover:scale-110 ease-in duration-100'
        />
      </div>
      <span className='text-xl font-bold text-white'>{movie.title}</span>
      <span className='text-right text-white'>⭐️ {movie.vote_average}</span>
    </li>
  );
}
