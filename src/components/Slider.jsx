import React from 'react';
// Swiper'dan gerekli modülleri ve stilleri import et
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

const Slider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="w-full h-full"
    >
      <SwiperSlide className="bg-blue-200 flex items-center justify-center">
        <h2 className="text-4xl">Slide 1</h2>
      </SwiperSlide>
      <SwiperSlide className="bg-green-200 flex items-center justify-center">
        <h2 className="text-4xl">Slide 2</h2>
      </SwiperSlide>
      <SwiperSlide className="bg-yellow-200 flex items-center justify-center">
        <h2 className="text-4xl">Slide 3</h2>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;