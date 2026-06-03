import React from 'react'
import Footer from '@/Pages/Footer'

import { FaGoogle } from "react-icons/fa";
import Header from '@/Components/Layout/Header';
import { Link } from 'react-router-dom';
import imageL from '@/assets/3094352.jpg'
import FormRegister from '@/Components/Layout/FormRegister';
import googleIcon from '@/assets/google.png'

const Signin = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row h-auto md:h-[100vh] pt-5 items-center">
        {/* Şəkil bölməsi */}
        <div className="w-full md:w-1/2 h-64 md:h-full flex items-center">
          <img className="h-full w-full object-cover" src={imageL} alt="" />
        </div>

        {/* Form bölməsi */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-evenly flex-col items-center px-6 md:px-0 mt-8 md:mt-0">

          <div className="bg-white w-full max-w-md md:w-3/5 flex flex-col justify-between h-auto md:h-[80vh] p-6  rounded-2xl shadow-md">
            <div className="text-left flex flex-col gap-2 font-bold">
              <h2 className="text-2xl md:text-3xl">Create an Account</h2>
              <h4 className="text-xs md:text-sm text-gray-600">Enter your Details below</h4>
            </div>

            <div className="flex flex-col justify-between my-4">
              <FormRegister />
            </div>

            <div className="border border-gray-300 p-4 rounded-2xl cursor-pointer flex items-center justify-center gap-3 hover:bg-gray-100 transition">
              <img className="h-5 w-5" src={googleIcon} alt="Google icon" />
              <span className="text-sm md:text-base">Sign Up With Google</span>
            </div>
          </div>

          <div className="mt-6 text-center text-sm md:text-base">
            Do you have an account?{' '}
            <Link to="/login" className="underline text-blue-600 hover:text-blue-800">
              Login
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )

}

export default Signin