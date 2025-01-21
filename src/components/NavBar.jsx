import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useDebounce from '../hooks/useDebounce';
import { useDarkMode } from '../context/DarkModeContext';

export default function NavBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // input : 현재 controlled component, 검색 기능 없음
  const onSearch = (e) => {
    e.preventDefault();
    console.log(e.target.query.value);
    // console.log(query);
    if (query !== '') {
      navigate(`/search?movie=${query}`);
    }
  };

  useDebounce(
    () => {
      if (query !== '') {
        navigate(`/search?movie=${query}`);
      }
    },
    3000,
    [query]
  );

  return (
    <header className='flex items-center justify-between px-4 py-4 dark:bg-black dark:text-white'>
      <div className='flex items-center gap-2'>
        <h1 className='mr-4 font-["Poiret_One"] text-4xl'>
          <Link to={'/'}>Movie Tracker</Link>
        </h1>
        <nav className='flex justify-between w-40 gap-4 mx-4 font-light'>
          <Link to={'/'} className='transition-all hover:font-semibold'>
            Favorites
          </Link>
          <Link to={'/'} className='transition-all hover:font-semibold'>
            Watched
          </Link>
        </nav>
      </div>
      <form
        action='/submit'
        onSubmit={onSearch}
        className='flex justify-center gap-2 mx-4 grow'
      >
        <input
          type='text'
          name='query'
          placeholder='Search...'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className='px-4 py-1.5 mx-2 rounded outline-none bg-zinc-200 w-4/5 text-black'
        />
        <button className='text-2xl'>🔍</button>
      </form>
      <div>
        <button
          className='px-2 py-1 mx-2 bg-zinc-400 rounded-xl'
          onClick={toggleDarkMode}
        >
          {isDarkMode ? 'L' : 'D'}
        </button>
        <button className='px-2 py-1 mx-2 dark:bg-red-600 bg-zinc-400 rounded-xl'>
          Sign-in
        </button>
        <button className='px-2 py-1 mx-2 dark:bg-teal-950 rounded-xl'>
          Sign-up
        </button>
      </div>
    </header>
  );
}
