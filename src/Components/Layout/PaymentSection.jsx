import React, { useState, useEffect } from 'react';
import Header from '@/Components/Layout/Header';
import Footer from '@/Pages/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../Redux/CreateSlice/CartSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { HiCreditCard, HiBanknotes, HiCheckCircle } from 'react-icons/hi2';

const initialForm = {
  firstName: '',
  companyName: '',
  streetAddress: '',
  apartment: '',
  townCity: '',
  phone: '',
  email: '',
  saveInfo: false,
};

const PaymentSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartState.items);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.totalPrice || 0), 0);
  const shipping = subtotal >= 100 ? 0 : 20;
  const discountAmount = subtotal * (discount / 100);
  const total = Math.max(0, subtotal - discountAmount + shipping);

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      navigate('/Cart', { replace: true });
    }
  }, [cartItems.length, navigate, orderPlaced]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const required = { firstName: 'First Name', streetAddress: 'Street Address', townCity: 'Town/City', phone: 'Phone Number', email: 'Email Address' };
    const next = {};
    for (const [key, label] of Object.entries(required)) {
      if (!String(form[key] || '').trim()) next[key] = `${label} is required`;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (form.email && !emailRegex.test(form.email)) next.email = 'Invalid email address';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const applyCoupon = () => {
    if (couponCode.trim().toLowerCase() === 'discount30') {
      setDiscount(30);
      toast.success('Coupon applied successfully');
    } else if (couponCode.trim()) {
      setDiscount(0);
      toast.error('Invalid coupon code');
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(clearCart());
    setOrderPlaced(true);
    toast.success('Order placed successfully! Thank you for your purchase.');
    setTimeout(() => navigate('/', { state: { orderSuccess: true } }), 1500);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <>
        <Header />
        <div className="min-h-[50vh] flex items-center justify-center p-6">
          <p className="text-gray-500">Redirecting to cart...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (orderPlaced) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 p-6 bg-gradient-to-b from-emerald-50 to-white">
          <HiCheckCircle className="w-20 h-20 text-emerald-500" />
          <h2 className="text-2xl font-bold text-gray-800">Order placed successfully!</h2>
          <p className="text-gray-600">Redirecting you to home...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <ToastContainer position="top-center" />
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-500 text-sm sm:text-base mb-6 sm:mb-8">Complete your order securely.</p>

          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Billing Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">1</span>
                  Billing Details
                </h2>
                <div className="grid gap-4 sm:gap-5">
                  {[
                    { name: 'firstName', label: 'First Name *', placeholder: 'First Name', required: true },
                    { name: 'companyName', label: 'Company Name', placeholder: 'Company Name (optional)', required: false },
                    { name: 'streetAddress', label: 'Street Address *', placeholder: 'Street Address', required: true },
                    { name: 'apartment', label: 'Apartment, floor, etc.', placeholder: 'Apartment, floor, etc. (optional)', required: false },
                    { name: 'townCity', label: 'Town/City *', placeholder: 'Town/City', required: true },
                    { name: 'phone', label: 'Phone Number *', placeholder: 'Phone Number', required: true, type: 'tel' },
                    { name: 'email', label: 'Email Address *', placeholder: 'Email Address', required: true, type: 'email' },
                  ].map(({ name, label, placeholder, required, type = 'text' }) => (
                    <div key={name} className="flex flex-col gap-1">
                      <label className="text-sm font-medium text-gray-700">{label}</label>
                      <input
                        type={type}
                        name={name}
                        value={form[name]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        required={required}
                        className={`w-full border rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition shadow-sm ${
                          errors[name] ? 'border-red-400 bg-red-50/50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      />
                      {errors[name] && <span className="text-xs text-red-500">{errors[name]}</span>}
                    </div>
                  ))}
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="saveInfo"
                      checked={form.saveInfo}
                      onChange={handleChange}
                      className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-sm text-gray-600">Save this information for faster check-out next time</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-bold">2</span>
                  Your Order
                </h2>

                <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center py-2 border-b border-gray-100 last:border-0">
                      <img src={item.image} alt={item.title} className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-lg bg-gray-100" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{item.title}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-gray-900 whitespace-nowrap">${typeof item.totalPrice === 'number' ? item.totalPrice.toFixed(2) : '0.00'}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount ({discount}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-3 mt-2 text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 space-y-3">
                  <p className="text-sm font-medium text-gray-700">Payment method</p>
                  <label className="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition hover:bg-gray-50 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 border-gray-200">
                    <input
                      type="radio"
                      name="payment"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={() => setPaymentMethod('bank')}
                      className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                    />
                    <HiCreditCard className="w-5 h-5 text-gray-500" />
                    <span className="font-medium text-gray-800">Bank Transfer</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition hover:bg-gray-50 focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 border-gray-200">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                    />
                    <HiBanknotes className="w-5 h-5 text-gray-500" />
                    <span className="font-medium text-gray-800">Cash on Delivery</span>
                  </label>
                </div>

                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="px-4 py-3 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full py-4 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition shadow-lg shadow-emerald-500/25"
                >
                  Place Order
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSection;
