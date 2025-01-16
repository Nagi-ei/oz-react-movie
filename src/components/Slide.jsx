import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, EffectCoverflow, Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import SlideCard from './SlideCard';

export default function Slide({ movieList }) {
  return (
    <Swiper
      modules={[Navigation, Scrollbar, A11y, EffectCoverflow]}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      coverflowEffect={{ rotate: 25, stretch: 100, slideShadows: false }}
      style={{
        // 나중에 이걸로 스타일 수정
        '--swiper-navigation-size': '44px',
        '--swiper-navigation-top-offset': '50%',
        '--swiper-navigation-sides-offset': '10px',
        '--swiper-navigation-color': 'white',
      }}
      spaceBetween={20}
      slidesPerView={3}
      effect='coverflow'
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      className='bg-[#00000080]'
    >
      {movieList.map((m) => (
        <SwiperSlide key={m.id}>
          <SlideCard movie={m} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
