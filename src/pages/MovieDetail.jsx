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

  return (
    <main className='flex p-12'>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
        alt=''
      />
      <div className='flex flex-col gap-4 p-4'>
        <h2 className='pb-2 text-3xl font-bold border-b'>{movie?.title}</h2>
        <span>
          ⭐️ {movie?.vote_average} // {movie?.release_date} // {movie?.runtime}{' '}
          m
        </span>
        <ul className='flex justify-end gap-2'>
          {movie?.genres?.map((g) => (
            <span key={g.id} className='px-2 py-1 bg-slate-300 rounded-xl'>
              {g.name}
            </span>
          ))}
        </ul>
        <p className='pt-2 border-t'>{movie?.overview}</p>
      </div>
    </main>
  );
}
