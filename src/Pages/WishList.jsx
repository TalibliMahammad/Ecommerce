import React from 'react'
import Header from '@/Components/Layout/Header'
import Footer from '@/Pages/Footer'
import { CiHeart } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import { clearWishList, heartsFunc } from '../Redux/CreateSlice/WishList'
import { FaHeart } from 'react-icons/fa'
import CartButton from '@/Components/Layout/CartButton'
import wishEmpty from '/assets/gifs/emptyWish.mp4'
import { Result } from 'antd'
import { addItem } from '../Redux/CreateSlice/CartSlice'

const WishList = () => {
    const dispatch = useDispatch()
    const { WishListData } = useSelector((state) => state.wishList)
    const { data } = useSelector((state) => state.fetchData)
    const categoriesWishList = [...new Set(WishListData.map((item) => item.category))];


    const flattenNestedData = (data, path = []) => {
        const result = [];

        for (const key in data) {
            const value = data[key];

            if (Array.isArray(value)) {
                // Əgər dəyərlər array-dirsə, onları düzləşdir
                const taggedItems = value.map(item => ({
                    ...item,
                    categories: [...path, key]
                }));
                result.push(...taggedItems);
            } else if (typeof value === 'object' && value !== null) {

                result.push(...flattenNestedData(value, [...path, key]));
            }
        }

        return result;
    };



    const allProducts = flattenNestedData(data);


    const getRecommendedItems = (wishlistItems, allItems) => {
        const wishlistItemIds = wishlistItems.map(item => item.id);
        const wishlistCategories = wishlistItems.map(item => item.category.trim().toLowerCase());

        const recommended = allItems.filter(item =>
            !wishlistItemIds.includes(item.id) &&
            wishlistCategories.includes(item.category.trim().toLowerCase())
        );




        return recommended;
    };


    const recommendedItems = getRecommendedItems(WishListData, allProducts);;

    function getStars(rating) {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i}>
                    {i <= rating ? '⭐' : '☆'}
                </span>

            )
        }


        return stars
    }


    const handleMoveToAllBag = () => {
        WishListData.map((item) => {
            dispatch(addItem(item))
        })
        dispatch(clearWishList())
    }





    return (
        <div>
            <Header />
            <div className="px-5 md:px-10 mt-10">
                <div className="flex flex-col md:flex-row justify-between items-center text-2xl px-4 md:px-10">
                    <div>WishList ({WishListData.length})</div>
                    <div
                        onClick={handleMoveToAllBag}
                        className="border rounded-2xl p-2 w-full max-w-[300px] text-center cursor-pointer hover:bg-red-400 hover:text-white transition-all mt-4 md:mt-0"
                    >
                        Move All To Bag
                    </div>
                </div>

                <div className="flex flex-wrap justify-center md:justify-evenly mt-10 gap-6 px-2 md:px-0">
                    {WishListData.length === 0 ? (
                        <div className="flex items-center justify-center h-[60vh] w-full px-4">
                            <video
                                className="h-full max-w-full"
                                autoPlay
                                loop
                                muted
                                src={wishEmpty}
                            />
                        </div>
                    ) : (
                        WishListData.map((item, key) => (
                            <div
                                key={key}
                                className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-[400px] w-full max-w-[300px] overflow-hidden group relative"
                            >
                                <div className="relative h-[250px] w-full cursor-pointer">
                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                                        -20%
                                    </div>

                                    <div className="absolute top-2 right-2 z-10">
                                        {WishListData.some((wish) => wish.id === item.id) ? (
                                            <FaHeart
                                                onClick={() => dispatch(heartsFunc(item))}
                                                className="text-red-500 text-2xl cursor-pointer"
                                            />
                                        ) : (
                                            <CiHeart
                                                onClick={() => dispatch(heartsFunc(item))}
                                                className="text-black text-2xl cursor-pointer"
                                            />
                                        )}
                                    </div>

                                    <img
                                        className="h-full w-full object-contain p-5 transition-transform duration-300 group-hover:scale-105"
                                        src={item.images?.[0] || "https://via.placeholder.com/300"}
                                        alt={item.title}
                                    />

                                    <div className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <CartButton item={item} />
                                    </div>
                                </div>

                                <div className="p-4 flex flex-col items-start">
                                    <h3 className="text-sm text-gray-500 truncate">{item.brand}</h3>
                                    <h3 className="text-lg font-medium text-gray-500 truncate text-center w-full">
                                        {item.title.slice(0, 20) || "Product Title"}
                                    </h3>
                                    <h3 className="text-xl font-bold text-green-600 text-center w-full">
                                        {item.price ? `${item.price}$` : "Price not available"}
                                    </h3>
                                    <div className="cursor-pointer text-yellow-400 text-lg flex">
                                        <span className="flex gap-1">
                                            {item.rating}
                                            {getStars(item.rating || 0)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="px-5 md:px-10 mt-10">
                <div className="flex flex-col md:flex-row justify-between px-4 md:px-10">
                    <div className="flex flex-col-reverse md:flex-row items-center w-full gap-2 md:gap-6 font-bold text-2xl">
                        <div className="rotate-90 md:rotate-0 bg-red-500 rounded-[5px] h-[40px] w-[15px]"></div>
                        Just Recommended
                    </div>

                </div>

                <div className="flex flex-wrap justify-center md:justify-evenly mt-10 gap-6 px-2 md:px-20 mb-10">
                    {recommendedItems.length > 0 ? (
                        recommendedItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 h-[400px] w-full max-w-[300px] overflow-hidden group relative"
                            >
                                <div className="relative h-[250px] w-full cursor-pointer">
                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
                                        -20%
                                    </div>

                                    <div className="absolute top-2 right-2 z-10">
                                        <button
                                            onClick={() => handleWishlistToggle(item.id)}
                                            aria-label="Toggle Wishlist"
                                            className="text-white text-2xl hover:text-red-500 transition-colors duration-300"
                                        >
                                            <CiHeart />
                                        </button>
                                    </div>

                                    <img
                                        className="h-full w-full object-contain p-5 transition-transform duration-300 group-hover:scale-105"
                                        src={item.images?.[0] || "/default.jpg"}
                                        alt={item.name || item.title}
                                    />

                                    <div className="absolute bottom-0 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button
                                            onClick={() => onAddToCart(item)}
                                            className="w-full bg-black text-white py-2 font-semibold hover:bg-gray-800 transition-colors duration-300"
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>

                                <div className="p-4 flex flex-col gap-1">
                                    <h3 className="text-sm text-gray-500 truncate">{item.brand || item.category}</h3>
                                    <h3 className="text-lg font-medium text-gray-800 truncate">
                                        {(item.title || item.name)?.slice(0, 20)}
                                    </h3>
                                    <h3 className="text-base font-semibold text-green-600">{item.price} $</h3>
                                    <div className="cursor-pointer text-yellow-400 text-lg flex">
                                        <span className="flex gap-1">
                                            {item.rating} {getStars(item.rating || 0)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-xl text-gray-600">No recommendations available.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>


    )
}

export default WishList