import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';

export default function MovieDetail() {
  const [movie, setMovie] = useState({});
  const param = useParams();
  // console.log(param);

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await fetch('/src/assets/data/movieDetailData.json');
      const data = await response.json();
      setMovie(data);
    };
    fetchDetail();
  }, []);

  return (
    <main className='flex p-12'>
      <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt='' />
      <div className='p-4 flex flex-col gap-4'>
        <h2 className='text-3xl font-bold border-b pb-2'>{movie.title}</h2>
        <span>
          ⭐️ {movie.vote_average} // {movie.release_date} // {movie.runtime} m
        </span>
        <ul className='flex justify-end gap-2'>
          {movie.genres?.map((g) => (
            <span key={g.id} className='px-2 py-1 bg-slate-300 rounded-xl'>
              {g.name}
            </span>
          ))}
        </ul>
        <p className='border-t pt-2'>{movie.overview}</p>
      </div>
    </main>
  );
}
