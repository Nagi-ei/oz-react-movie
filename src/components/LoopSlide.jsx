// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import SlideCard from './SlideCard';

export default function LoopSlide({ movieList }) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Navigation]}
      style={{
        // 나중에 이걸로 스타일 수정
        '--swiper-navigation-size': '44px',
        '--swiper-navigation-top-offset': '50%',
        '--swiper-navigation-sides-offset': '10px',
        // '--swiper-navigation-color': 'white',
        // '--swiper-pagination-color': 'red',
        '--swiper-theme-color': 'white',
      }}
      className='mySwiper'
    >
      <h2 className='absolute z-10 mb-6 ml-12 text-4xl top-8 left-0 text-white drop-shadow-[0_0_5px_rgba(0,0,0,1)]'>
        New
      </h2>
      {movieList.map((movie) => (
        <SwiperSlide key={movie.id}>
          <SlideCard movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
