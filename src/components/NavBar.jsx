import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useDebounce from '../hooks/useDebounce';
import { useDarkMode } from '../context/DarkModeContext';
import { Button, buttonVariants } from '@/components/ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Input } from '@/components/ui/input';
import { ChevronLeft } from 'lucide-react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import { Popover } from '@radix-ui/react-popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { PopoverContent } from '@radix-ui/react-popover';
import { Avatar } from './ui/avatar';
import { AvatarImage } from '@radix-ui/react-avatar';
import { useUser } from '../context/UserContext';

export default function NavBar() {
  const [query, setQuery] = useState('');
  const [isSearchBarOn, setSearchBarOn] = useState(false);
  const navigate = useNavigate();

  const { user } = useUser();
  const { logout } = useSupabaseAuth();
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
        <h1 className='sm:mr-4 font-["Poiret_One"] text-2xl sm:text-4xl xl:pl-2'>
          <Link to={'/'}>Movie Archive</Link>
        </h1>
        {/* <nav className='flex justify-between w-40 gap-4 mx-4 font-light max-lg:hidden'>
            <Link to={'/'} className='transition-all hover:font-semibold'>
              Favorites
            </Link>
            <Link to={'/'} className='transition-all hover:font-semibold'>
              Watched
            </Link>
          </nav> */}

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
          {user ? (
            <Popover>
              <PopoverTrigger className='max-lg:hidden'>
                <Avatar>
                  <AvatarImage src={`${user.profileImageUrl}`} alt='Avatar' />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className='flex flex-col gap-2 px-3 py-4 mx-1 mt-3 rounded-md bg-zinc-300 dark:bg-zinc-600'>
                <span className='text-center'>{user.userName}</span>
                <Link
                  to={'/mylist'}
                  className={`${buttonVariants({
                    variant: 'outline',
                  })}`}
                >
                  My List
                </Link>
                <Link
                  to={'/profile'}
                  className={`${buttonVariants({
                    variant: 'outline',
                  })}`}
                >
                  Profile
                </Link>
                <Button onClick={logout}>Sign-out</Button>
              </PopoverContent>
            </Popover>
          ) : (
            <div className='flex gap-2 max-lg:hidden'>
              <Link
                to='/signup'
                className={`${buttonVariants({
                  variant: 'outline',
                })} max-lg:hidden`}
              >
                Sign-up
              </Link>
              <Link
                to='/signin'
                className={`${buttonVariants({
                  variant: 'outline',
                })} max-lg:hidden`}
              >
                Sign-in
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* 모바일 네비게이션바 */}
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
            <Link to={user ? '/profile' : '/signin'} className='w-full h-full'>
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
