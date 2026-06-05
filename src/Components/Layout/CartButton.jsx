import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem } from '../../Redux/CreateSlice/CartSlice'
import DetailPage from '@/Components/Layout/DetailPage';
import { useNavigate } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";


const CartButton = ({ item, className  }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cartItems = useSelector(state => state.cartState.items) || [];
  const isCart = cartItems.some(cartItem => cartItem.id === item.id);

  const handleCart = (e) => {
    if (isCart) {
      dispatch(removeItem(item.id));
      e.stopPropagation();
    } else {
      dispatch(addItem(item));
      e.stopPropagation();
    }
  };



  return (
    <>
      <div className={``}>
        <button
          onClick={handleCart}
          className={`text-2xl ${isCart ? 'text-red-500' : 'text-green-800 hover:text-red-500'} ${className}`}  
        >
        <FaCartArrowDown size={30} />
        </button>
      </div>

    </>

  )
}

export default CartButton