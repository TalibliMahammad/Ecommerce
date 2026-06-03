import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiUser } from "react-icons/ci";
import { BsBagCheck } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/CreateSlice/AuthSlice';

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className='absolute top-full mt-2   flex  flex-col gap-4 right-0 bg-stone-200 shadow-lg rounded-md text-black text-sm p-2 z-50 w-[200px]'>
      <Link to="/profile" className=' flex justify-left items-center   px-3 py-1 hover:bg-gray-100 gap-5'><FaRegUser className='size-5' /> Manage My Account</Link>
      <Link to="/myorder" className=' flex justify-left  items-center   px-3 py-1 hover:bg-gray-100 gap-5'> <BsBagCheck className='size-5 '/> My Order</Link>
      <Link to="/cancellation" className=' flex justify-left  items-center   px-3 py-1 hover:bg-gray-100 gap-5 '> <MdOutlineCancel className='size-5 ' /> My Cancellations</Link>
      <Link to="/reviews" className=' flex justify-left  items-center   px-3 py-1 hover:bg-gray-100 gap-5 '><MdOutlineReviews  className='size-5 '  /> My Reviews</Link>

      <button
        onClick={handleLogout}
        className='px-3 py-1 hover:bg-gray-100 w-full text-left  flex gap-5'
      >
       <FiLogOut className='size-5 ' /> LogOut
      </button>
    </div>
  );
};

export default UserMenu;
