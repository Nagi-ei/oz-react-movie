import { useDarkMode } from '@/context/DarkModeContext';
import { Heart, Check, Minus } from 'lucide-react';
import React from 'react';

export default function MyLIstButton({ moreClass }) {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`flex bg-zinc-300 opacity-80 rounded-full dark:bg-zinc-800 p-2 gap-2 ${moreClass}`}
    >
      {/* <Minus size={20} /> */}
      <Check size={20} />
      <Heart fill={isDarkMode ? 'white' : 'black'} size={20} />
      {/* <Heart size={20} /> */}
    </div>
  );
}
