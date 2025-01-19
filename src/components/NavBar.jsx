import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router';

export default function NavBar() {
  const [query, setQuery] = useState('');

  // input : 현재 controlled component, 검색 기능 없음
  const onSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    console.log(e.target.value);
  };

  return (
    <header className='flex items-center justify-between px-4 py-2 bg-black'>
      <div className='flex items-center gap-2'>
        <h1 className='mr-4 font-sans text-4xl font-thin text-white'>
          <Link to={'/'}>Movie Tracker</Link>
        </h1>
        <nav className='text-white'>찜 / 본거</nav>
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
        <button className='px-2 py-1 mx-2 bg-zinc-400 rounded-xl'>
          Sign-in
        </button>
        <button className='px-2 py-1 mx-2 bg-zinc-400 rounded-xl'>
          Sign-up
        </button>
      </div>
    </header>
  );
}
