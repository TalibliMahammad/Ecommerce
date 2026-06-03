import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import HeartButton from '@/Components/Layout/HeartButton';
import CartButton from '@/Components/Layout/CartButton';
import Timer from '@/Components/Layout/Timer';

export default function Electronics() {
  const { data } = useSelector((state) => state.fetchData);
  const Laptops = data?.Electronics?.Laptop || [];
  const navigate = useNavigate();

  // swiperRef useRef ilə
  const swiperRef = useRef(null);

  // Event handler memoizasiya
  const handleNavigate = useCallback(
    (id) => {
      navigate(`/DetailPage/${id}`);
    },
    [navigate]
  );

  // getStars funksiyasını memoizə etmək olar, amma burda sadədir
  const getStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i}>{i <= rating ? '⭐' : '☆'}</span>);
    }
    return stars;
  };

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  }, []);


  return (
    <div className="mt-16 lg:mt-24 flex flex-col gap-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="pt-5">
        <div className="section-label">
          <div className="section-label-bar" />
          <span className="text-lg">Electronics</span>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between lg:justify-start gap-5 lg:gap-20 mt-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Laptops</h2>
          <Timer />
        </div>
      </div>

        <div className="flex gap-5">
          {Laptops.length > 0 && (
            <div className="w-full">
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                slidesPerView={'auto'}
                spaceBetween={20}
                pagination={{ type: 'fraction' }}
                autoplay={{ delay: 5000, disableOnInteraction: false }} 
                loop={false}
                modules={[Pagination, Navigation, Autoplay]}
                navigation={true}
                className="mySwiper h-[500px] overflow-hidden"
              >
                {Laptops.slice(0, 15).map((item) => (
                  <SwiperSlide key={item.id} className=" w-[200px] lg:max-w-[300px] !flex !items-center !justify-center">
                    <div className="flex flex-col rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-[340px] w-[280px] overflow-hidden group relative bg-white">
                      <div onClick={() => handleNavigate(item.id)} className="relative h-[190px] w-full cursor-pointer bg-white flex items-center justify-center">
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded-full z-10">-20%</div>
                        <div className="absolute top-2 right-2 z-10"><HeartButton item={item} /></div>
                        <img loading="lazy" decoding="async" className="max-h-full max-w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105" src={item.images?.[0]?.trim() || 'https://via.placeholder.com/300x300?text=No+Image'} alt="Product" />
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-[88%] lg:left-0 lg:transform-none lg:translate-x-0 lg:w-full lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto"><CartButton item={item} /></div>
                      </div>

                      <div className="p-3 flex flex-col gap-1">
                        <h3 className="text-base font-medium text-gray-900 truncate">{item.name}</h3>
                        <h3 className="text-sm text-gray-500 truncate">{item.title || 'Product Title'}</h3>
                        <h3 className="text-sm font-semibold text-red-600">{item.price ? `${item.price}$` : 'Price not available'}</h3>
                        <div className="cursor-pointer text-yellow-400 text-sm flex">
                          <span className="flex gap-1">{item.rating} {getStars(item.rating || 0)}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>

      <div className="flex flex-col items-center justify-center">
        <Link to={`/AllProducts/Electronics/Laptop`} className="flex flex-col items-center justify-center">
          <button className="text-[20px] h-[50px] w-[200px] bg-red-400 text-white hover:bg-black transition duration-500 rounded-[10px]">
            View All
          </button>
        </Link>
        <div className="border-b border-gray-300 h-[1px] w-full mt-[60px] mr-auto"></div>
      </div>
    </div>
  );
}