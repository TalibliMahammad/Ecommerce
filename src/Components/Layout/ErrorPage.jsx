import React from 'react'
import Header from '@/Components/Layout/Header'
import Footer from '@/Pages/Footer'
import { Link } from 'react-router-dom'

const ErrorPage = () => {




    return (
        <>
          <Header />
      <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-900 text-white text-center px-4">
      
      <div className="text-9xl font-bold animate-bounce text-red-500">404</div>
      <h1 className="text-4xl mt-4 font-semibold">Page Not Found</h1>
      <p className="mt-2 text-lg text-gray-400">Sorry, the page you're looking for doesn't exist.</p>

      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg text-white font-medium shadow-lg"
      >
        Go back to Home
      </Link>
    </div>
    <Footer />
        </>
    )
}

export default ErrorPage