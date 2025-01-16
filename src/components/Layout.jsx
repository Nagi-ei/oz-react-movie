import React from 'react';
import { Outlet } from 'react-router';
import NavBar from './Navbar';

export default function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
