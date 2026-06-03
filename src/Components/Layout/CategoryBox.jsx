import React from 'react';
import { IoIosPhonePortrait } from 'react-icons/io';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import { GiWatch } from 'react-icons/gi';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import { BsHeadphones } from 'react-icons/bs';
import { IoGameControllerSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const CategoryBox = () => {
  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    navigate(`/Electronics/${categoryName}`);
  };

  const categories = [
    { key: 'Phone', icon: IoIosPhonePortrait, label: 'Phone' },
    { key: 'Laptop', icon: HiOutlineComputerDesktop, label: 'Laptop' },
    { key: 'Smartwatch', icon: GiWatch, label: 'Smart Watch' },
    { key: 'Camera', icon: MdOutlinePhotoCamera, label: 'Camera' },
    { key: 'Earbuds', icon: BsHeadphones, label: 'EarBuds' },
    { key: 'Gaming', icon: IoGameControllerSharp, label: 'Gaming' },
  ];

  return (
    <div className="flex flex-col gap-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-20 lg:mt-24 pt-5">
        <div className="section-label">
          <div className="section-label-bar" />
          <span className="text-lg lg:text-xl">Electronics</span>
        </div>
      </div>

      <div className="flex justify-center gap-4 sm:gap-6 lg:gap-8 flex-wrap pb-4">
        {categories.map(({ key, icon: Icon, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => handleClick(key)}
            className="group w-full sm:w-[calc(50%-0.5rem)] lg:w-[200px] xl:w-[220px] h-[200px] lg:h-[220px] rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-emerald-200 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-cyan-50 transition-all duration-300 flex flex-col items-center justify-center gap-4"
          >
            <Icon className="size-16 lg:size-20 text-gray-500 group-hover:text-emerald-600 transition-colors" />
            <h3 className="font-semibold text-gray-700 group-hover:text-gray-900">{label}</h3>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryBox;
