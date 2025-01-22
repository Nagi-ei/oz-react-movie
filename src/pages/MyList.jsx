import React from 'react';
import { Outlet } from 'react-router';

export default function MyList() {
  return (
    <main className='flex flex-col items-center pt-[88px] grow'>
      <div>Favorites / Watched</div>
      <Outlet />
    </main>
  );
}
