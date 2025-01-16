import React from 'react';

export default function SlideCard({ movie }) {
  return (
    <div className='flex flex-col items-center'>
      <div className='h-[300px] overflow-hidden'>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt='movie_img'
          className='w-[300px] h-[420px] object-cover'
        />
      </div>
      <span className='text-lg mb-2'>{movie.title}</span>
    </div>
  );
}
