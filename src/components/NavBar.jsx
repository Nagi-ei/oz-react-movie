import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useDebounce from '../hooks/useDebounce';
import { useDarkMode } from '../context/DarkModeContext';
import { Button } from '@/components/ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

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
    <header className='flex items-center justify-between px-4 py-6 dark:bg-black dark:text-white'>
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
      <div className='flex items-center justify-end gap-4'>
        <div className='flex items-center gap-1'>
          <Label htmlFor='dark-mode-toggle'>{isDarkMode ? 'L' : 'D'}</Label>
          <Switch id='dark-mode-toggle' onClick={toggleDarkMode} />
        </div>
        <Button>Sign-up</Button>
        <Button>Sign-in</Button>
      </div>
    </header>
  );
}
