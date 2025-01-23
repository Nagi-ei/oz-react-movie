import { useUser } from '@/context/UserContext';
import React from 'react';
import { Outlet } from 'react-router';

export default function Profile() {
  const { user } = useUser();

  console.log('user:', user);
  return (
    <>
      {user ? (
        <div className='flex items-center justify-center h-full px-4 grow'>
          Profile
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}
