import React from 'react';
import { useNavigate } from 'react-router';

export default function SlideCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(movie);
    navigate(`/details/${movie.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div
      className='flex flex-col items-center w-full'
      // style={{
      //   backgroundImage: `url(
      //     'https://image.tmdb.org/t/p/original${movie?.backdrop_path}'
      //   )`,
      // }}
    >
      <img
        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        alt='movie_img'
        className='object-cover w-full'
        // style={{
        //   filter: 'blur(2px)',
        //   // boxShadow: 'inset 50px 50px 50px 50px #000000',
        // }}
      />
      <div className='absolute right-24 bottom-[20%] flex flex-col items-end'>
        <h3 className='pb-4 text-5xl drop-shadow-[0_0_5px_rgba(0,0,0,1)] text-white'>
          {movie?.title}
        </h3>
        <p className='drop-shadow-[0_0_5px_rgba(0,0,0,1)] text-white'>
          {movie?.release_date}
        </p>
        <p className='drop-shadow-[0_0_5px_rgba(0,0,0,1)] text-white'>
          ⭐️ {movie?.vote_average}
        </p>
        <button
          onClick={handleClick}
          className='px-4 py-2 mt-6 text-white transition-all bg-black border border-white rounded-md opacity-50 hover:opacity-100'
        >
          More Info
        </button>
      </div>
    </div>
  );
}
