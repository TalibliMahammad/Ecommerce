import React, { useState } from 'react'
import Header from '@/Components/Layout/Header'
import Footer from '@/Pages/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem, updateQuantity } from '../../Redux/CreateSlice/CartSlice'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { MdDelete } from "react-icons/md";
import { FiPlus, FiMinus } from 'react-icons/fi'

const CartPage = () => {
    const DataCart = useSelector((state) => state.cartState.items)
    const dispatch = useDispatch()
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0)
    const navigate = useNavigate();

    const subtotal = DataCart.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
    const shipping = 20;
    const discountTotal = subtotal - (subtotal * (discount / 100));
    const total = discountTotal + shipping;





    const applyCoupon = () => {
        if (couponCode.trim().toLowerCase() === 'discount30') {
            setDiscount(30);
            toast.success('Coupon applied successfully');
        } else {
            setDiscount(0);
            toast.error('Invalid coupon code');
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-white">
            <ToastContainer />
            <Header />
            {DataCart.length > 0 ? (
                <div className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 animate-slide-down">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Shopping Cart <span className="text-emerald-600">({DataCart.length})</span>
                        </h1>
                        <button
                            onClick={() => navigate('/')}
                            className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1 transition-colors"
                        >
                            ← Return to Shop
                        </button>
                    </div>

                    <div className="hidden md:grid grid-cols-12 gap-4 text-sm font-semibold text-gray-500 border-b border-gray-200 pb-3 mb-2">
                        <span className="col-span-5">Product</span>
                        <span className="col-span-2 text-center">Price</span>
                        <span className="col-span-3 text-center">Quantity</span>
                        <span className="col-span-2 text-right">Subtotal</span>
                    </div>

                    <div className="space-y-3">
                      {DataCart.map((item, index) => (
                        <div
                            key={item.id}
                            className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-2 items-center bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-slide-up"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                                <img src={item.image} alt={item.title} className="h-20 w-20 sm:h-24 sm:w-24 object-contain rounded-xl bg-gray-50 hover:scale-105 transition-transform duration-300" />
                                <span className="font-medium text-gray-900 line-clamp-2">{item.title}</span>
                            </div>
                            <span className="md:col-span-2 text-center font-semibold text-gray-700">
                                ${typeof item.price === 'number' ? item.price.toFixed(2) : '0.00'}
                            </span>
                            <div className="md:col-span-3 flex justify-center items-center gap-2 bg-gray-50 rounded-xl p-2">
                                <button
                                    type="button"
                                    onClick={() => {
                                      dispatch(updateQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }));
                                    }}
                                    className="w-9 h-9 rounded-lg bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 font-bold transition-all duration-200 flex items-center justify-center border border-gray-200 hover:border-emerald-300"
                                >
                                    <FiMinus className="w-4 h-4" />
                                </button>
                                <span className="font-bold text-gray-900 min-w-[2.5ch] text-center">{item.quantity}</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                      dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
                                    }}
                                    className="w-9 h-9 rounded-lg bg-white hover:bg-emerald-50 text-gray-700 hover:text-emerald-600 font-bold transition-all duration-200 flex items-center justify-center border border-gray-200 hover:border-emerald-300"
                                >
                                    <FiPlus className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="md:col-span-2 flex justify-end md:justify-between items-center gap-3">
                                <span className="font-bold text-gray-900">
                                    ${typeof item.totalPrice === 'number' ? item.totalPrice.toFixed(2) : '0.00'}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => {
                                      dispatch(removeItem(item.id));
                                      toast.info('Item removed from cart');
                                    }}
                                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:scale-110 transition-all duration-200 border border-red-200"
                                    aria-label="Remove"
                                >
                                    <MdDelete className="size-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                    </div>

                  
                    

                    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    placeholder="Coupon code"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={applyCoupon}
                                    className="px-6 py-3 rounded-xl font-medium bg-gray-900 text-white hover:bg-gray-800 transition shrink-0"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 space-y-4">
                            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">Cart Totals</h2>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-sm text-emerald-600">
                                    <span>Discount ({discount}%)</span>
                                    <span className="font-medium">−${(subtotal * (discount / 100)).toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Shipping</span>
                                <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-4 mt-2 text-gray-900">
                                <span>Total</span>
                                <span className="text-emerald-600">${total.toFixed(2)}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => navigate('/Payment')}
                                className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 transition shadow-lg shadow-emerald-500/20 mt-2"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
                    <div className="max-w-md w-full text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                        <p className="text-gray-500 mb-6">Add items from the shop to get started.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                    <div className="w-full max-w-2xl mt-8 aspect-video rounded-2xl overflow-hidden bg-gray-100">
                        <video className="w-full h-full object-cover" autoPlay loop muted playsInline src={CartAnimation} />
                    </div>
                </div>
            )}

            <Footer />
        </div>
    )

}

export default CartPage