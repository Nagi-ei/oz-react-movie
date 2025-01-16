import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router';

export default function NavBar() {
  const [query, setQuery] = useState('');

  // input : 현재 controlled component, 검색 기능 없음
  const onSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <header className='flex justify-between items-center px-4 py-2 bg-zinc-300'>
      <div className='flex gap-2 items-center'>
        <h1 className='text-4xl font-extrabold mr-4'>
          <Link to={'/'}>Movie Tracker</Link>
        </h1>
        <nav>찜 / 본거</nav>
      </div>
      <form action='submit'>
        <input
          type='text'
          placeholder='Search...'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button onSubmit={onSearch}>🔍</button>
      </form>
      <div>
        <button className='mx-2 px-2 py-1 bg-zinc-400 rounded-xl'>
          Sign-in
        </button>
        <button className='mx-2 px-2 py-1 bg-zinc-400 rounded-xl'>
          Sign-up
        </button>
      </div>
    </header>
  );
}
