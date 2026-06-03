// components/HeartButton.jsx
import React from "react";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { heartsFunc } from "../../Redux/CreateSlice/WishList";

const HeartButton = ({ item }) => {
    const dispatch = useDispatch();
    const WishListData = useSelector(state => state.wishList.WishListData);

    const isWished = WishListData.some(wish => wish.id === item.id);

    const handleClick = (e) => {
        e.stopPropagation(); 
        dispatch(heartsFunc(item));
    };

    return (
        <div className="absolute top-2 right-2 z-10 cursor-pointer">
            {isWished ? (
                <FaHeart
                    onClick={handleClick}
                    className="text-red-500 size-10 hover:scale-110 transition-transform duration-200"
                />
            ) : (
                <CiHeart
                    onClick={handleClick}
                    className="text-gray-400 size-10 hover:text-red-500 transition-all duration-200"
                />
            )}
        </div>
    );
};

export default HeartButton;
