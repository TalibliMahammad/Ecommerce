import React from 'react'
import Header from '@/Components/Layout/Header'
import Footer from '@/Pages/Footer'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import CartButton from '@/Components/Layout/CartButton'
import HeartButton from '@/Components/Layout/HeartButton'

const Categoryboxproduct = () => {


    const { category, categoryName } = useParams()

    const data = useSelector((state) => {
        if (state.fetchData.data &&
            state.fetchData.data[category] &&
            state.fetchData.data[category][categoryName]) {
            return state.fetchData.data[category][categoryName];
        }
        return [];
    });

    
    console.log(categoryName);

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
        <div className=' bg-stone-100 '>
            <Header />
            <div className='w-full mt-6 px-4 lg:px-18'>
                <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-start mx-auto'>
                    {data.map((item) => (
                        <div key={item.id} className="flex flex-col rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-[340px] w-full max-w-[280px] mx-auto overflow-hidden group relative bg-white">
                            <div className="relative h-[190px] w-full cursor-pointer bg-white flex items-center justify-center">
                                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">-20%</div>
                                <div className="absolute top-2 right-2 z-10"><HeartButton item={item} /></div>
                                <img loading="lazy" className="max-h-full max-w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105" src={item.images?.[0] || 'https://via.placeholder.com/300x300?text=No+Image'} alt={item.title} />
                                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-[88%] lg:left-0 lg:transform-none lg:translate-x-0 lg:w-full lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto"><CartButton item={item} /></div>
                            </div>
                            <div className="p-3 flex flex-col gap-1">
                                <h3 className="text-sm text-gray-500 truncate" >{item.brand}</h3>
                                <h3 className="text-base font-medium text-gray-900 truncate">{(item.title || '').slice(0, 40)}</h3>
                                <h3 className="text-sm font-semibold text-red-600">{item.price} $</h3>
                                <div className="cursor-pointer text-yellow-400 text-sm flex"><span className='flex gap-1'> {item.rating} {getStars((item.rating || 0))} </span></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>







            <Footer />
        </div>
    )
}

export default Categoryboxproduct