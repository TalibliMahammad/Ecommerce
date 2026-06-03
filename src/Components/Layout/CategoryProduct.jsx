import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import Header from '@/Components/Layout/Header'
import Footer from '@/Pages/Footer'
import CategorySection from '@/Components/Layout/CategorySection'
import HeartButton from '@/Components/Layout/HeartButton'
import CartButton from '@/Components/Layout/CartButton' 

const CategoryProduct = () => {
    const navigate = useNavigate()
    const { categoryKey, subItem } = useParams()
    const formatedCategoryKey = categoryKey[0].toUpperCase() + categoryKey.slice(1).toLowerCase()
    const formatedSubItem = subItem[0].toUpperCase() + subItem.slice(1).toLowerCase()
    const data = useSelector(state => state.fetchData.data?.[formatedCategoryKey]?.[formatedSubItem]) || []

    const getStars = (rating) => {
        const stars = []
        const rounded = Math.round(rating)
        for (let i = 0; i < 5; i++) {
            stars.push(i < rounded ? "★" : "☆")
        }
        return stars.join("")
    }

    return (
        <>
            <Header />
            <div>
                <CategorySection />
                <div className="flex justify-center items-center mb-10 ">
                    <div className="flex justify-center items-center flex-col mt-20 px-4 w-[96%]  ">

                        <div className="flex flex-col-reverse lg:flex-row items-center w-full xl:pl-18 gap-2 font-bold mb-20">
                            <div className="rotate-90 lg:rotate-0 bg-red-500 rounded-[5px] h-[40px] w-[20px]"></div>
                            <span className="text-lg lg:text-xl">You See {subItem.toUpperCase()} product's</span>
                        </div>

                        <div className='w-full mt-6 px-4 lg:px-18'>
                            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-start mx-auto'>
                                {data.map((item) => (
                                    <div key={item.id} className="flex flex-col rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 h-[340px] w-full max-w-[280px] mx-auto overflow-hidden group relative bg-white">
                                        <div onClick={() => navigate(`/DetailPage/${item.id}`)} className="relative h-[190px] w-full cursor-pointer bg-white flex items-center justify-center">
                                            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">-20%</div>
                                            <div className="absolute top-2 right-2 z-10"><HeartButton item={item} /></div>
                                            <img loading="lazy" className="max-h-full max-w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105" src={item.images?.[0]?.trim() || 'https://via.placeholder.com/300x300?text=No+Image'} alt={item.name} />
                                            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-[88%] lg:left-0 lg:transform-none lg:translate-x-0 lg:w-full lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto"><CartButton item={item} /></div>
                                        </div>
                                        <div className="p-3 flex flex-col gap-1">
                                            <h3 className="text-base font-medium text-gray-900 truncate">{item.name}</h3>
                                            <h3 className="text-sm text-gray-500 truncate">{item.brand}</h3>
                                            <h3 className="text-sm text-gray-500 truncate">{item.title || "Product Title"}</h3>
                                            <h3 className="text-sm font-semibold text-red-600">{item.price ? `${item.price}$` : "Price not available"}</h3>
                                            <div className="cursor-pointer text-yellow-400 text-sm flex"><span className='flex gap-1'>{item.rating} {getStars(item.rating || 0)}</span></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default CategoryProduct
