import React from 'react';

export default function MovieCard({ movie }) {
  return (
    <li>
      <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt='' />
      <span>{movie.title}</span>
      <span>{movie.vote_average}</span>
    </li>
  );
}
