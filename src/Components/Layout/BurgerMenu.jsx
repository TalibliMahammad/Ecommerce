import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { CiHeart, CiShoppingCart } from "react-icons/ci";

const BurgerMenu = ({ logData, wishCount = 0, cartCount = 0, setIsOpen }) => {
  const [openMainCategory, setOpenMainCategory] = useState(false);
  const [openSubCategory, setOpenSubCategory] = useState(null);
  const navigate = useNavigate();

  const categories = [
    {
      key: "woman",
      title: "Woman's Fashion",
      subItems: ["Dress", "Shirt", "Pants", "Classic-Shoes", "Sport-Shoes", "Accessories"],
    },
    {
      key: "man",
      title: "Man's Fashion",
      subItems: ["Accessories", "Pants", "Polo", "T-Shirt", "Shoes"],
    },
    {
      key: "Electronics",
      title: "Electronics",
      subItems: ["Laptop", "Camera", "Earbuds", "Gaming", "Phone", "SmartWatch"],
    },
    {
      key: "Home",
      title: "Home & Lifestyle",
      subItems: ["Home", "Lifestyle"],
    },
    {
      key: "Sport",
      title: "Sports & Outdoor",
      subItems: ["Sport"],
    },
    {
      key: "Baby",
      title: "Baby & Toys",
      subItems: ["Baby"],
    },
    {
      key: "Pets",
      title: "Groceries & Pets",
      subItems: ["Pets"],
    },
    {
      key: "Health",
      title: "Health & Beauty",
      subItems: ["Health", "Beauty"],
    },
  ];/*   burger menu daxilndeki kateqoriyalar */

  const handleNavigate = (catKey, subItem) => {
    const path = `/category/${catKey}/${subItem.toLowerCase().replace(/\s+/g, "-")}`;
    navigate(path);
    setIsOpen(false); // menyunu bağla
  };

  return (
    <div className="fixed  top-0 left-0 h-full w-[75%] sm:w-[300px] bg-black/90 backdrop-blur-lg z-50 shadow-2xl flex flex-col justify-between py-6 border-r border-white/10 overflow-y-auto">
      
      {/* Top icons */}
      {/* wishliste gedirsen klik edende */}
      <div className="flex justify-between items-center px-6 mb-6 ">
        <Link to="/wishList" className="relative text-gray-300 hover:text-pink-400 transition">
          <CiHeart className="text-3xl" />
          {wishCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {wishCount}
            </span>
          )}
        </Link>
        <Link to="/cart" className="relative text-gray-300 hover:text-yellow-400 transition">
          <CiShoppingCart className="text-3xl" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Pages */}
      <nav className="flex flex-col gap-4 text-[16px] font-medium text-gray-300 px-6">
        {[
          { label: "Home", to: "/" },
          { label: "About", to: "/aboutus" },
          { label: "Contact", to: "/contactus" },
          { label: "Our Services", to: "/ourservices" },
        ].map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            className="hover:text-white transition-all"
            onClick={() => setIsOpen(false)}
          >
            {label}
          </Link>
        ))}

        {/* Category dropdown */}
        <div>
          <div
            className="flex items-center justify-between py-2 cursor-pointer hover:text-white"
            onClick={() => setOpenMainCategory(!openMainCategory)}
          >
            <span className="text-gray-300">🗂️ Categories</span>
            {openMainCategory ? (
              <MdKeyboardArrowDown className="text-xl" />
            ) : (
              <MdKeyboardArrowRight className="text-xl" />
            )}
          </div>

          {openMainCategory && (
            <div className="mt-2 space-y-2">
              {categories.map((cat) => (
                <div key={cat.key}>
                  <div
                    onClick={() => setOpenSubCategory(openSubCategory === cat.key ? null : cat.key)}
                    className="flex justify-between items-center px-3 py-2 text-sm text-gray-300 hover:bg-white/10 rounded-md cursor-pointer"
                  >
                    <span>{cat.title}</span>
                    {openSubCategory === cat.key ? (
                      <MdKeyboardArrowDown />
                    ) : (
                      <MdKeyboardArrowRight />
                    )}
                  </div>
                  {openSubCategory === cat.key && (
                    <div className="ml-5 mt-1 flex flex-col gap-1">
                      {cat.subItems.map((sub, idx) => (
                        <div
                          key={idx}
                          onClick={() => handleNavigate(cat.key, sub)}
                          className="text-xs text-gray-300 hover:text-white transition cursor-pointer"
                        >
                          ▸ {sub}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>



      {/* Bottom Auth */}
      {!logData?.name && (
        <div className="px-6 mt-6 flex flex-col gap-3">
          <Link
            to="/login"
            className="text-center py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-600 transition"
            onClick={() => setIsOpen(false)}
          >
            🔐 Log In
          </Link>
          <Link
            to="/signin"
            className="text-center py-2 rounded-lg bg-purple-700 text-white hover:bg-purple-600 transition"
            onClick={() => setIsOpen(false)}
          >
            ✍️ Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;
