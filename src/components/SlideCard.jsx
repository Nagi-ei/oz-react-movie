import React from 'react';

export default function SlideCard({ movie }) {
  return (
    <div className='flex flex-col items-center w-full'>
      <img
        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        alt='movie_img'
        className='object-cover w-full'
      />
      <span className='pb-8 text-lg'>{movie?.title}</span>
    </div>
  );
}

// 디자인 꾸미기
// 1. img 태그말고 배경으로 사진 넣기
// 2. 필터를 넣어서 글씨 색을 흰색으로 하기 쉽게?
// 3. 상세정보로 이동하는 버튼
