import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CartButton from '@/Components/Layout/CartButton'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import HeartButton from '@/Components/Layout/HeartButton';
import { useState, useEffect } from 'react';


const WomanShoes = () => {
    const woman = useSelector(state => state.fetchData?.data?.Woman?.['Sport-shoes'])
    const [swiperRef, setSwiperRef] = useState(null);
    const navigate = useNavigate();



    const getStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i}>
                    {i <= rating ? '⭐' : '☆'}
                </span>
            );
        }


        return stars;
    };


    return (
        <div className="mt-[60px] w-full flex flex-col max-w-[1200px] mx-auto">

            <div className="  px-5 lg:pl-21">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-0 lg:gap-[15px] font-bold">
                    <div className="rotate-90 lg:rotate-0 bg-red-500 rounded-[5px] h-[40px] w-[15px]"></div> Woman
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between lg:justify-start gap-5 lg:gap-20 font-bold">
                    <span className="text-[20px] mt-5 md:text-[25px]">Sport Shoes</span>
                </div>
            </div>


            <div className="w-full mt-[30px] px-5 lg:px-18">

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-start mx-auto">

                {woman?.slice(0, 10).map((item, key) => (

                        <div key={item.id || key} className="flex flex-col rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-[340px] w-full max-w-[280px] mx-auto overflow-hidden group relative bg-white">

                            <div onClick={() => navigate(`/DetailPage/${item.id}`)} className="relative h-[190px] w-full cursor-pointer bg-white flex items-center justify-center">
                                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold py-1 rounded-full z-10">-20%</div>
                                <div className="absolute top-2 right-2 z-10"><HeartButton item={item} /></div>
                                <img loading="lazy" className="max-h-full max-w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105" src={item.images?.[0]?.trim() || 'https://via.placeholder.com/300x300?text=No+Image'} alt={item.name || "Product"} />
                                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-[88%] lg:left-0 lg:transform-none lg:translate-x-0 lg:w-full lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto"><CartButton item={item} /></div>
                            </div>

                            <div className="p-3 flex flex-col gap-1">
                                <h3 className="text-base font-medium text-gray-900 truncate">{item.name}</h3>
                                <h3 className="text-sm text-gray-500 truncate">{item.title || "Product Title"}</h3>
                                <h3 className="text-sm font-semibold text-red-600">{item.price ? `${item.price}$` : "Price not available"}</h3>
                                <div className="cursor-pointer text-yellow-400 text-sm flex items-center gap-2"><span className="flex gap-1 items-center">{item.rating} {getStars(item.rating || 0)}</span></div>
                            </div>

                        </div>

                ))}

                </div>

            </div>



            <div className="flex flex-col items-center justify-center  mt-[60px]  ">
                <Link to={`/AllProducts/Woman/Sport-Shoesj`} className="flex flex-col items-center justify-center">
                    <button className="text-[20px] h-[50px] w-[200px] bg-red-400 text-white hover:bg-black transition duration-500 rounded-[10px]">
                        View All
                    </button>
                </Link>
                <div className="border-b border-gray-300 h-[1px] w-full mt-[60px] mr-auto"></div>
            </div>

        </div>

    )
}

export default WomanShoes

