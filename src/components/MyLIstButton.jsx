import { useDarkMode } from '@/context/DarkModeContext';
import { Heart, Check, Minus } from 'lucide-react';
import React from 'react';

export default function MyLIstButton({ moreClass }) {
  const { isDarkMode } = useDarkMode();
  return (
    <div
      className={`flex bg-zinc-300 opacity-80 rounded-full dark:bg-zinc-800 p-2 gap-2 ${moreClass}`}
    >
      {/* <Minus size={20} className='cursor-pointer' /> */}
      <Check size={20} className='cursor-pointer' />
      <Heart
        fill={isDarkMode ? 'white' : 'gray'}
        size={20}
        className='cursor-pointer'
      />
      {/* <Heart size={20} className='cursor-pointer' /> */}
    </div>
  );
}

// 버튼 클릭시 전환 (주석 되어있는 마이너스와 하트) - 상태로 관리, props로 전달 받기
// 버튼은 전환만, 그 영화가 유저의 데이터에 있는지 없는지는 MovieDetail과 MovieCard에서 관리
// 이벤트 버블링(?) 처리 필요 - MovieCard
