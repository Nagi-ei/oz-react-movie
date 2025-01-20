import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useDebounce from '../hooks/useDebounce';

export default function NavBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // input : 현재 controlled component, 검색 기능 없음
  const onSearch = (e) => {
    e.preventDefault();
    console.log(e.target.query.value);
    // console.log(query);
    navigate(`/search?movie=${query}`);
  };

  useDebounce(() => navigate(`/search?movie=${query}`), 3000, [query]);

  return (
    <header className='flex items-center justify-between px-4 py-2 bg-black'>
      <div className='flex items-center gap-2'>
        <h1 className='mr-4 font-sans text-4xl font-thin text-white'>
          <Link to={'/'}>Movie Tracker</Link>
        </h1>
        <nav className='text-white'>찜 / 본거</nav>
      </div>
      <form action='/submit' onSubmit={onSearch}>
        <input
          type='text'
          name='query'
          placeholder='Search...'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button>🔍</button>
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
