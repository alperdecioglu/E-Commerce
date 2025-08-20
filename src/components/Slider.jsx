import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom'; 

import sliderImage1 from '../assets/slide1.jpg'; 
import sliderImage2 from '../assets/slide2.jpg';

const Slider = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      className="w-full h-full"
      loop={true}
    >
      <SwiperSlide 
        className="bg-cover bg-center" 
        style={{ backgroundImage: `url(${sliderImage1})` }}
      >
        <div className="container mx-auto h-full flex items-center">
          <div className="text-left text-white max-w-lg p-8">
            <h5 className="font-bold">2025 YAZ</h5>
            <h1 className="text-4xl md:text-6xl font-bold my-4 leading-tight">YENİ KOLEKSİYON</h1>
            <p className="text-lg md:text-xl max-w-sm mb-8">
              Yeni Gelenler
            </p>
            
            <Link to="/shop" className="px-10 py-4 bg-primary text-white rounded font-bold text-xl hover:bg-opacity-90">
              ALIŞVERİŞE BAŞLA
            </Link>
          </div>
        </div>
      </SwiperSlide>
      
      <SwiperSlide 
        className="bg-cover bg-top" 
        style={{ backgroundImage: `url(${sliderImage2})` }}
      >
        <div className="container mx-auto h-full flex items-center">
          <div className="text-left text-white max-w-lg p-8">
            <h5 className="font-bold">YENİ SEZON</h5>
            <h1 className="text-4xl md:text-6xl font-bold my-4 leading-tight">KEŞFET</h1>
            <p className="text-lg md:text-xl max-w-sm mb-8">
              Yeni Trendleri Keşfet
            </p>
            
            <Link to="/shop" className="px-10 py-4 bg-primary text-white rounded font-bold text-xl hover:bg-opacity-90">
              GÖZ AT
            </Link>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
