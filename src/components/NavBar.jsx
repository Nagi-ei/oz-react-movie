import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useDebounce from '../hooks/useDebounce';
import { useDarkMode } from '../context/DarkModeContext';
import { Button } from '@/components/ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Input } from '@/components/ui/input';
import { useMediaQuery } from 'react-responsive';
import { ChevronLeft } from 'lucide-react';

export default function NavBar() {
  const [query, setQuery] = useState('');
  const [isSearchBarOn, setSearchBarOn] = useState(false);
  const navigate = useNavigate();

  const { isDarkMode, toggleDarkMode } = useDarkMode();

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
    <>
      <header className='fixed top-0 z-10 flex items-center justify-between w-full px-4 py-6 bg-white border-b dark:bg-black dark:text-white dark:border-t-zinc-600 border-t-zinc-300'>
        <Button
          onClick={() => navigate(-1)}
          variant='outline'
          className='px-3 py-4 rounded-xl lg:hidden'
        >
          <ChevronLeft />
        </Button>
        <div className='flex items-center gap-2'>
          <h1 className='sm:mr-4 font-["Poiret_One"] text-2xl sm:text-4xl xl:pl-2'>
            <Link to={'/'}>Movie Archive</Link>
          </h1>
          <nav className='flex justify-between w-40 gap-4 mx-4 font-light max-lg:hidden'>
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
          className={`flex justify-center gap-2 lg:mx-4 grow max-lg:fixed max-lg:w-full max-lg:left-0 max-lg:top-[85px] bg-white dark:bg-black ${
            isSearchBarOn ? 'max-lg:flex' : 'max-lg:hidden'
          }`}
        >
          <Input
            type='text'
            name='query'
            placeholder='Search...'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            className='px-4 py-1.5 lg:mx-2 lg:w-4/5'
          />
          <button className='text-2xl'>🔍</button>
        </form>
        <div className='flex items-center justify-end gap-4'>
          <div className='flex items-center gap-1'>
            <Label htmlFor='dark-mode-toggle'>{isDarkMode ? 'L' : 'D'}</Label>
            <Switch id='dark-mode-toggle' onClick={toggleDarkMode} />
          </div>
          <Button className='max-lg:hidden'>Sign-up</Button>
          <Button className='max-lg:hidden'>Sign-in</Button>
        </div>
      </header>
      <nav className='fixed bottom-0 z-10 w-full bg-white border-t lg:hidden dark:bg-black dark:border-t-zinc-600 border-t-zinc-300'>
        <ul className='flex justify-center'>
          <li className='w-1/4 py-6 text-center'>
            <Link to={'/'} className='w-full h-full'>
              Home
            </Link>
          </li>
          <li className='w-1/4 py-6 text-center'>
            <Link
              onClick={() => {
                setSearchBarOn((prev) => !prev);
              }}
              className='w-full h-full'
            >
              Search
            </Link>
          </li>
          <li className='w-1/4 py-6 text-center'>
            <Link to={'/mylist'} className='w-full h-full'>
              My List
            </Link>
          </li>
          <li className='w-1/4 py-6 text-center'>
            <Link to={'/signin'} className='w-full h-full'>
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
