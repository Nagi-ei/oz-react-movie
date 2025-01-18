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
      modules={[Pagination, Navigation]}
      className='mySwiper'
    >
      {movieList.map((movie) => (
        <SwiperSlide key={movie.id}>
          <SlideCard movie={movie} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
