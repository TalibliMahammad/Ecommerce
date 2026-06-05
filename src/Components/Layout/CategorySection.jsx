import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MdKeyboardArrowRight } from "react-icons/md";
import HomeSlider from '@/Components/Layout/HomeSlider';
import { useNavigate } from 'react-router-dom';

const CategorySection = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleToggleMenu = useCallback((menuSection) => {
    setActiveMenu(prev => (prev === menuSection ? null : menuSection));
  }, []);

  const handleCategory = useCallback((categoryKey, subItem) => {
    const categoryPath = categoryKey.toLowerCase();
    const subPath = subItem ? `/${subItem.toLowerCase().replace(/\s+/g, '-')}` : '';
    const path = `/category/${categoryPath}${subPath}`;
    navigate(path);
    setMobileMenuOpen(false);
  }, [navigate]);

  const categories = useMemo(() => [
    {
      key: 'woman',
      title: "Woman's Fashion",
      icon: "👗",
      subItems: ['Dress', 'Shirt', 'Pants', 'Classic-Shoes', 'Sport-Shoes', 'Accessories']
    },
    {
      key: 'man',
      title: "Man's Fashion",
      icon: "👔",
      subItems: ['Accessories', 'Pants', 'Polo', 'T-Shirt', 'Shoes']
    },
    {
      key: 'Electronics',
      title: 'Electronics',
      icon: "📱",
      subItems: ['Laptop', 'Camera', 'Earbuds', 'Gaming', 'Phone', 'SmartWatch']
    },
    {
      key: 'Home',
      title: 'Home & Lifestyle',
      icon: "🏠",
      subItems: ['Home', 'Lifestyle']
    },
    {
      key: 'Sport',
      title: 'Sports & Outdoor',
      icon: "⚽",
      subItems: ['Sport']
    },
    {
      key: 'Baby',
      title: 'Baby & Toys',
      icon: "🧸",
      subItems: ['Baby']
    },
    {
      key: 'Pets',
      title: 'Groceries & Pets',
      icon: "🐾",
      subItems: ['Pets']
    },
    {
      key: 'Health',
      title: 'Health & Beauty',
      icon: "💄",
      subItems: ['Health', 'Beauty']
    },
  ], []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hero Section with Slider */}
      <div className="mb-16">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <HomeSlider />
          <div className="absolute top-8 left-8 z-20">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 drop-shadow-lg">
              Welcome to
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 drop-shadow-md">
              Your Ultimate Shopping Destination
            </p>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-12">
        {isReady ? (
          categories.map((category) => (
            <div
              key={category.key}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-emerald-200 hover:-translate-y-1"
              onClick={() => handleToggleMenu(category.key)}
            >
              <div className="text-center">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
                  {category.title}
                </h3>
              </div>

              {/* Dropdown for subcategories */}
              <div className={`absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
                activeMenu === category.key ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
              } z-30`}>
                {category.subItems.map((item, subIndex) => (
                  <button
                    key={subIndex}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategory(category.key, item);
                    }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors duration-200 first:pt-4 last:pb-4"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))
        ) : (
          // Loading skeletons
          Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-center">
                <div className="w-12 h-12 bg-slate-200 rounded-full mx-auto mb-3 animate-pulse"></div>
                <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategorySection;
