import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem } from '../../Redux/CreateSlice/CartSlice'
import DetailPage from '@/Components/Layout/DetailPage';
import { useNavigate } from 'react-router-dom';

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
          className={` group-hover:opacity-100  w-full text-center px-4 py-2 transition-opacity duration-300 ${isCart ? 'bg-black' : 'bg-red-500'} text-white ${className}`}
        >
          {isCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>
      </div>

    </>

  )
}

export default CartButton