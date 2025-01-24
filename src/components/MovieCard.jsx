import React from 'react';
import { useNavigate } from 'react-router';
import MyLIstButton from './MyLIstButton';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(movie);
    navigate(`/details/${movie.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <li
      className='relative flex flex-col gap-2 hover:cursor-pointer w-[45%] md:w-[30%] lg:w-[23%] 2xl:w-[300px] dark:text-white'
      onClick={handleClick}
    >
      <div className='overflow-hidden'>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={`${movie.title}`}
          draggable={false}
          className='w-[300px] lg:h-[420px] object-cover hover:scale-110 ease-in duration-100'
        />
      </div>
      <span className='lg:text-xl'>{movie.title}</span>
      <span className='text-sm font-extralight lg:text-base'>
        ⭐️ {movie.vote_average}
      </span>
      <MyLIstButton moreClass='absolute top-2 right-2 z-10' />
    </li>
  );
}
