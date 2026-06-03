import React, { useState } from 'react'
import { FiChevronDown } from "react-icons/fi";
import { CiSearch, CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterData } from '../../Redux/CreateSlice/FetchDataSlice';
import UserMenu from '@/Components/Layout/UserMenu';
import BurgerMenu from '@/Components/Layout/BurgerMenu';

const Header = () => {


  const { user, isAuthenticated } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")/* deyeri yenilemek üçün  */
  const [showUserMenu, setShowUserMenu] = useState(false);/*   deyeri yenilemek*/
  const { data } = useSelector((state) => state.fetchData)/*  datanı çəkmək storedan */


  const dispatch = useDispatch()/* funksiyani çəkmək counterslicedan */
  const { WishListData } = useSelector((state) => state.wishList)/*  daxilindəki deyerlere çatmaq */
  const DataCart = useSelector((state) => state.cartState.items)/*  daxilindeki deyerlere çatmaq */

  const handleInput = (e) => {
    setInputValue(e.target.value)/*  inputdan gelen deyeri useStatedeki deyerle evez  edir  */
    dispatch(filterData(e.target.value))/*  funksiyanin icine daxil olan deyeri action payloada oturur */
  }
/* mürəkkəb obyketleri açmaq üçün funksiya */
  function collectAllArrays(obj) {/*  içindəki obyektləri əhatə edir */
    let result = [];/*  boş array lazımdır ki, arraylar; onun içinə yığsın */
    for (const key in obj) {/*  bu sətir dataların keylerine çatır */
      
      if (Array.isArray(obj[key])) {/*  əgər arraydırsa, deyişkenin içinə əlavə et */

        result = result.concat(obj[key]);
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {/* əks halda  obyektdirsə,  və deyilsə null  yeniden çağır yoxla  arraydırsa deyişekene
        əlave edecek */
        result = result.concat(collectAllArrays(obj[key]));
      }
    }

    return result;
  }

  const allProducts = collectAllArrays(data);

  window.allProducts = allProducts;
  const navLinkClass = ({ isActive }) =>
    `relative pb-1 transition-all duration-300 ${isActive ? 'after:w-full text-emerald-600' : 'after:w-0 text-gray-700 hover:text-gray-900'
    } after:absolute after:left-0 after:bottom-0 after:h-0.5 after:bg-gradient-to-r after:from-emerald-500 after:to-cyan-500 after:transition-all after:duration-300 hover:after:w-full`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white lg:min-h-[7vh] py-2 lg:py-0 flex items-center justify-center lg:justify-end">
        <div className="max-w-7xl w-full px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-[13px] lg:text-[15px]">
          <span className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            Summer Sale — Free Express Delivery
            <span className="font-semibold text-emerald-400">OFF 50%</span>
            <Link to="/" className="underline underline-offset-2 hover:text-emerald-300 transition">Shop Now</Link>
          </span>
          <span className="flex items-center gap-1.5 text-gray-300 cursor-pointer hover:text-white transition">
            English <FiChevronDown className="w-4 h-4" />
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 h-16 lg:h-20">
        <Link to="/" className="shrink-0">
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-transparent bg-clip-text tracking-tight">
            Exclusive
          </h1>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/product" className={navLinkClass}>Product</NavLink>
          <NavLink to="/ContactUs" className={navLinkClass}>Contact</NavLink>
          <NavLink to="/AboutUs" className={navLinkClass}>About Us</NavLink>
          <NavLink to="/ourservices" className={navLinkClass}>Our Services</NavLink>
          {!isAuthenticated && (
            <>
              <Link to="/login" className="ml-4 px-4 py-2 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition">
                Log in
              </Link>
              <Link to="/signin" className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-medium hover:from-emerald-600 hover:to-cyan-600 transition shadow-md">
                Register
              </Link>
            </>
          )}
        </nav>

        <div className="hidden lg:flex items-center gap-2 lg:gap-3 shrink-0">
          <div className="relative w-48 xl:w-56">
            <input
              type="text"
              value={inputValue}
              onChange={handleInput}
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/20 transition"
              autoComplete="off"
            />
            <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-gray-400 pointer-events-none" />
            {inputValue && (
              <div className="absolute left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-72 overflow-y-auto overflow-x-hidden">
                {Array.isArray(window.allProducts)
                  ? window.allProducts
                      .filter(
                        (item) =>
                          item.title?.toLowerCase().includes(inputValue.toLowerCase()) ||
                          item.brand?.toLowerCase().includes(inputValue.toLowerCase())
                      )
                      .slice(0, 8)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="px-4 py-3 hover:bg-emerald-50 cursor-pointer border-b border-gray-100 last:border-0 transition"
                          onClick={() => {
                            setInputValue(item.title);
                            dispatch(filterData(item.title));
                            if (item.id === 2) navigate('/product/semin');
                            else navigate(`/DetailPage/${item.id}`);
                          }}
                        >
                          <span className="font-medium text-gray-900">{item.title}</span>
                          <span className="text-xs text-gray-500 ml-2">{item.brand}</span>
                        </div>
                      ))
                  : <div className="px-4 py-3 text-gray-500">No products found</div>}
              </div>
            )}
          </div>

          <button type="button" onClick={() => navigate('/WishList')} className="p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition relative">
            <CiHeart className="text-[22px]" />
            {WishListData.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-[11px] font-semibold rounded-full px-1">
                {WishListData.length}
              </span>
            )}
          </button>
          <button type="button" onClick={() => navigate('/Cart')} className="p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition relative">
            <CiShoppingCart className="text-[22px]" />
            {DataCart.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center bg-emerald-500 text-white text-[11px] font-semibold rounded-full px-1">
                {DataCart.length}
              </span>
            )}
          </button>
          <div className="relative">
            <button type="button" onClick={() => setShowUserMenu(!showUserMenu)} className="p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition">
              <CiUser className="text-[22px]" />
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 z-50">
                <UserMenu logData={logData} onClose={() => setShowUserMenu(false)} />
              </div>
            )}
          </div>
        </div>

        {isOpen && (
          <BurgerMenu
            logData={logData}
            wishCount={WishListData.length}
            cartCount={DataCart.length}
            setIsOpen={setIsOpen}
          />
        )}

        <button type="button" onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100 transition" aria-label="Menu">
          {isOpen ? <IoCloseOutline className="text-3xl" /> : <RxHamburgerMenu className="text-3xl" />}
        </button>
      </div>
    </header>
  )
}

export default Header