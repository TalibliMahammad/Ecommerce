import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '@/Components/Layout/Header'
import Footer from '@/Pages/Footer'
import { TbTruckDelivery, TbShieldCheck, TbRefresh, TbStar } from "react-icons/tb";
import { useParams, useNavigate } from 'react-router-dom'
import { CiShoppingCart } from 'react-icons/ci'
import { HiCreditCard } from 'react-icons/hi2'
import { FiMinus, FiPlus } from 'react-icons/fi'
import HeartButton from '@/Components/Layout/HeartButton'
import CartButton from '@/Components/Layout/CartButton'
import { addItem, removeItem } from '@/Redux/CreateSlice/CartSlice'
import { toast } from 'react-toastify'

const DetailPage = ({ item, className }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const allItems = useSelector((state) => state.fetchData.data) || [];
  const flatItems = Object.values(allItems)
    .flatMap(cat => Object.values(cat))
    .flat();

  const product = flatItems.find(item => item.id == id)

  const cartItems = useSelector(state => state.cartState.items) || [];
  const isInCart = cartItems.some(cartItem => cartItem.id === product?.id);

  const colors = ['#000000', '#DC2626', '#2563EB', '#16A34A', '#F59E0B']
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change))
  }

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(removeItem(product.id));
      toast.info('Removed from cart');
    } else {
      dispatch(addItem({ ...product, quantity, selectedColor, selectedSize }));
      toast.success('Added to cart!');
    }
  }

  const handleBuyNow = () => {
    setIsLoading(true)
    if (!isInCart) {
      dispatch(addItem({ ...product, quantity, selectedColor, selectedSize }))
    }
    setTimeout(() => {
      setIsLoading(false)
      navigate('/Payment')
      toast.success('Proceeding to payment...')
    }, 500)
  }

  const getRecommendedItems = (currentProduct, allItems) => {
    if (!currentProduct) return []
    return allItems
      .filter(item => item.id !== currentProduct.id && item.category === currentProduct.category)
      .slice(0, 8)
  }

  const recommendedItems = getRecommendedItems(product, flatItems)

  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="container mx-auto px-4 py-8">
          {/* Product Section */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12 animate-slide-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Gallery */}
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8">
                <div className="sticky top-8">
                  {/* Main Image */}
                  <div className="relative mb-6">
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-lg bg-white">
                      <img
                        src={product.images?.[selectedImage] || product.images?.[0]}
                        alt={product.title}
                        className="w-full h-full object-contain p-8"
                      />
                    </div>
                    {/* Sale Badge */}
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      -20%
                    </div>
                    {/* Heart Button */}
                    <div className="absolute top-4 right-4">
                      <HeartButton item={product} />
                    </div>
                  </div>

                  {/* Thumbnail Images */}
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {product.images?.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                          selectedImage === index
                            ? 'border-emerald-500 shadow-lg scale-105'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-contain p-2"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="space-y-6">
                  {/* Title and Rating */}
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                      {product.title}
                    </h1>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <TbStar
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(product.rating || 0)
                                  ? 'fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-600 font-medium">
                          {product.rating || 0} ({Math.floor(Math.random() * 100) + 50} reviews)
                        </span>
                      </div>
                      <span className="text-emerald-600 font-semibold flex items-center gap-1">
                        <TbShieldCheck className="w-5 h-5" />
                        In Stock ({product.stock || 50})
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-emerald-600">
                      ${product.price}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ${(product.price * 1.2).toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-semibold">
                      Save 17%
                    </span>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Color Selection */}
                  {product.category?.toLowerCase().includes('clothing') && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Color</h3>
                      <div className="flex gap-3">
                        {colors.map((color, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedColor(index)}
                            className={`w-10 h-10 rounded-full border-4 transition-all duration-300 transform hover:scale-110 ${
                              selectedColor === index
                                ? 'border-emerald-500 scale-110 ring-2 ring-emerald-200 shadow-lg'
                                : 'border-gray-200 hover:border-emerald-300'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Size Selection */}
                  {product.category?.toLowerCase().includes('clothing') && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
                      <div className="flex gap-3 flex-wrap">
                        {sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-5 py-2 rounded-xl border-2 font-bold transition-all duration-300 transform hover:scale-105 ${
                              selectedSize === size
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 scale-105 shadow-md'
                                : 'border-gray-200 text-gray-700 hover:border-emerald-300'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity and Actions */}
                  <div className="space-y-4">
                    {/* Quantity */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border-2 border-gray-200 rounded-xl hover:border-emerald-400 transition-colors duration-300 shadow-sm">
                          <button
                            onClick={() => handleQuantityChange(-1)}
                            className="p-3 hover:bg-emerald-50 rounded-l-xl transition-all duration-200 text-gray-700 hover:text-emerald-600 font-bold"
                          >
                            <FiMinus className="w-5 h-5" />
                          </button>
                          <span className="px-6 py-3 font-bold text-lg text-gray-900 min-w-[60px] text-center">{quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(1)}
                            className="p-3 hover:bg-emerald-50 rounded-r-xl transition-all duration-200 text-gray-700 hover:text-emerald-600 font-bold"
                          >
                            <FiPlus className="w-5 h-5" />
                          </button>
                        </div>
                        <span className="text-gray-600 font-semibold">
                          Total: <span className="text-emerald-600 text-lg">${(product.price * quantity).toFixed(2)}</span>
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <button
                        onClick={handleBuyNow}
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 active:shadow-md flex items-center justify-center gap-2 btn-hover group relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            Processing...
                          </div>
                        ) : (
                          <>
                            <HiCreditCard className="w-6 h-6 group-hover:animate-bounce-soft" />
                            Buy Now
                          </>
                        )}
                      </button>
                      <button
                        onClick={handleAddToCart}
                        className={`flex-1 py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 active:shadow-md flex items-center justify-center gap-2 btn-hover group relative overflow-hidden ${
                          isInCart
                            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                            : 'bg-gradient-to-r from-slate-700 to-slate-900 hover:from-slate-800 hover:to-black text-white'
                        }`}
                      >
                        <div className={`absolute inset-0 transition-opacity duration-300 ${isInCart ? 'bg-red-600 opacity-0 group-hover:opacity-20' : 'bg-black opacity-0 group-hover:opacity-10'}`}></div>
                        <CiShoppingCart className={`w-6 h-6 group-hover:scale-110 transition-transform`} />
                        {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-3 text-gray-600">
                      <TbTruckDelivery className="w-8 h-8 text-emerald-500" />
                      <div>
                        <p className="font-semibold">Free Delivery</p>
                        <p className="text-sm">Orders over $100</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <TbRefresh className="w-8 h-8 text-emerald-500" />
                      <div>
                        <p className="font-semibold">30 Days Return</p>
                        <p className="text-sm">Money back guarantee</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600">
                      <TbShieldCheck className="w-8 h-8 text-emerald-500" />
                      <div>
                        <p className="font-semibold">Secure Payment</p>
                        <p className="text-sm">100% protected</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommended Products */}
          {recommendedItems.length > 0 && (
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-1 h-12 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full"></div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
                    <p className="text-gray-600">Similar products you might like</p>
                  </div>
                </div>
                <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recommendedItems.map((item) => (
                  <div key={item.id} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-emerald-200">
                    <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                      <img
                        src={item.images?.[0]}
                        alt={item.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3">
                        <HeartButton item={item} />
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <CartButton item={item} />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1 truncate">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-emerald-600">${item.price}</span>
                        <div className="flex items-center gap-1">
                          <TbStar className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{item.rating || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DetailPage