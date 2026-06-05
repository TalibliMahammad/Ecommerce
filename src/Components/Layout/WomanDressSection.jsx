import React, { useState, useEffect, useRef } from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { CiHeart } from 'react-icons/ci'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CartButton from '@/Components/Layout/CartButton'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import HeartButton from '@/Components/Layout/HeartButton'

const WomanDressSection = () => {

    const data = useSelector(state => state.fetchData.data.Woman?.Dress) || []
    const [swiperRef, setSwiperRef] = useState(null);
    const [visibleCount, setVisibleCount] = useState(8);
    const sentinelRef = useRef(null);



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






    useEffect(() => {
        setVisibleCount(Math.min(8, data.length || 0));
    }, [data.length]);

    useEffect(() => {
        if (!sentinelRef.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleCount((prev) => Math.min((data?.length) || 0, prev + 6));
                    }
                });
            },
            { root: null, rootMargin: '200px', threshold: 0.1 }
        );

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [data.length]);

    return (
    /*     <div className="flex flex-col items-center mt-16 px-4 w-full max-w-[1200px] mx-auto">

            <div className="  px-5 lg:pl-21 flex flex-col gap-5 lg:gap-5">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-0 lg:gap-[15px] font-bold">
                    <div className="rotate-90 lg:rotate-0 bg-red-500 rounded-[5px] h-[40px] w-[15px]"></div> Woman
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between lg:justify-start gap-5 lg:gap-20 font-bold">
                    <span className="text-[20px]   lg:text-[30px]">Dress</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-5 justify-center mt-5 w-full">
                {data.slice(0, 10).map((item, key) => (
                    <div
                        key={item.id || key}
                        className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-[400px] w-full max-w-[300px] sm:w-[48%] md:w-[30%] lg:w-[22%] overflow-hidden group relative"
                    >
                        <div
                            onClick={() => navigate(`/DetailPage/${item.id}`)}
                            className="relative h-[250px] w-full cursor-pointer"
                        >
                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold py-1 rounded-full z-10">
                                -20%
                            </div>

                            <div className="absolute top-2 right-2 z-10">
                                <HeartButton item={item} />
                            </div>

                            <img
                                className="h-full w-full object-contain p-5 transition-transform duration-300 group-hover:scale-105"
                                src={item.images[0].trim()}
                                alt="Product"
                            />

                            <div className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <CartButton item={item} />
                            </div>
                        </div>

                        <div className="p-4 flex flex-col gap-1">
                            <h3 className="text-lg font-medium text-gray-800 truncate">{item.name}</h3>
                            <h3 className="text-sm text-gray-500 truncate">{item.title || "Product Title"}</h3>
                            <h3 className="text-base font-semibold text-green-600">
                                {item.price ? `${item.price}$` : "Price not available"}
                            </h3>
                            <div className="cursor-pointer text-yellow-400 text-lg flex">
                                <span className="flex gap-1">
                                    {item.rating} {getStars(item.rating || 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col justify-center mt-[60px] w-full items-center">
                <Link to={`/AllProducts/Woman/Dress`} className="flex items-center justify-center">
                    <button className="text-[20px] h-[50px] w-[200px] bg-red-400 text-white hover:bg-black transition duration-500 rounded-[10px]">
                        View All
                    </button>
                </Link>
                <div className="border-b border-gray-300 h-[1px] w-full mt-[60px]"></div>
            </div>

        </div> */

         <div className="mt-[60px] w-full flex flex-col max-w-[1200px] mx-auto">

            <div className="  px-5 lg:pl-21">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-0 lg:gap-[15px] font-bold">
                    <div className="rotate-90 lg:rotate-0 bg-red-500 rounded-[5px] h-[40px] w-[15px]"></div> Woman
                </div>

                <div className="flex flex-col lg:flex-row items-center justify-between lg:justify-start gap-5 lg:gap-20 font-bold">
                    <span className="text-[20px] mt-5 md:text-[25px]">Woman Dress</span>
                </div>
            </div>


            <div className="w-full mt-[30px] px-5 lg:px-18">

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-start mx-auto">

                {data?.slice(0, visibleCount).map((item, key) => (

                        <div key={item.id || key} className="flex flex-col rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-[340px] w-full max-w-[280px] mx-auto overflow-hidden group relative bg-white">

                            <div onClick={() => navigate(`/DetailPage/${item.id}`)} className="relative h-[190px] w-full cursor-pointer bg-white flex items-center justify-center">
                                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold py-1 rounded-full z-10">
                                    -20%
                                </div>

                                <div className="absolute top-2 right-2 z-10">
                                    <HeartButton item={item} />
                                </div>

                                <img loading="lazy" className="max-h-full max-w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105" src={item.images?.[0]?.trim() || 'https://via.placeholder.com/300x300?text=No+Image'} alt={item.name || "Product"} />

                               
                            </div>

                            <div className="p-3 flex flex-col gap-1">
                                <h3 className="text-base font-medium text-gray-900 truncate">{item.name}</h3>
                                <h3 className="text-sm text-gray-500 truncate">{item.title || "Product Title"}</h3>
                                <h3 className="text-sm font-semibold text-red-600">
                                    {item.price ? `${item.price}$` : "Price not available"}
                                </h3>
                                <div className="cursor-pointer text-yellow-400 text-sm flex items-center gap-2">
                                    <span className="flex gap-1 items-center">
                                        {item.rating} {getStars(item.rating || 0)}
                                    </span>
                                </div>
                                
                                <div className="absolute bottom-2 right-2 z-10">
                                                        <CartButton item={item} />
                                                      </div>
                            </div>

                        </div>

                ))}

                </div>

                <div ref={sentinelRef} className="w-full h-6 mt-4" />

            </div>



            <div className="flex flex-col items-center justify-center  mt-[60px]  ">
                <Link to={`/AllProducts/Woman/Dress`} className="flex flex-col items-center justify-center">
                    <button className="text-[20px] h-[50px] w-[200px] bg-red-500 text-white hover:bg-red-700 transition duration-500 rounded-[10px]">
                        View All
                    </button>
                </Link>
                <div className="border-b border-gray-200 h-[1px] w-full mt-[60px] mr-auto"></div>
            </div>

        </div>
    );


}

export default WomanDressSection