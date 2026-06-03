import React, { useState } from 'react';
import { IoSendOutline } from 'react-icons/io5';
import { BsQrCode } from 'react-icons/bs';
import { PiGooglePlayLogoLight } from 'react-icons/pi';
import { RiAppleLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Subscribe */}
          <div className="lg:col-span-2 max-w-sm">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
              Exclusive
            </h2>
            <h3 className="text-lg font-semibold mt-4 mb-2">Subscribe</h3>
            <p className="text-gray-400 text-sm mb-4">Get 10% off your first order</p>
            <div className="flex gap-0 rounded-xl overflow-hidden border border-gray-600 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/30 transition">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 h-12 px-4 text-gray-900 bg-gray-100 focus:bg-white focus:outline-none text-sm"
              />
              <button
                type="button"
                className="h-12 px-5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-medium transition shrink-0"
              >
                <IoSendOutline className="text-xl" />
              </button>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base font-semibold mb-4">Support</h3>
            <p className="text-gray-400 text-sm">Baku Khatai, Zigh street 31</p>
            <p className="text-gray-400 text-sm mt-1">MahammadTalibli@outlook.com</p>
            <p className="text-gray-400 text-sm mt-1">+99455-925-35-40</p>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-base font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-emerald-400 transition">My Account</Link></li>
              <li><Link to="/login" className="text-gray-400 hover:text-emerald-400 transition">Login / Register</Link></li>
              <li><Link to="/Cart" className="text-gray-400 hover:text-emerald-400 transition">Cart</Link></li>
              <li><Link to="/WishList" className="text-gray-400 hover:text-emerald-400 transition">Wishlist</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-emerald-400 transition">Shop</Link></li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="text-base font-semibold mb-4">Quick Link</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-emerald-400 transition">Privacy Policy</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-emerald-400 transition">Terms Of Use</Link></li>
              <li><Link to="/" className="text-gray-400 hover:text-emerald-400 transition">FAQ</Link></li>
              <li><Link to="/ContactUs" className="text-gray-400 hover:text-emerald-400 transition">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Download App - full width on mobile, or keep in grid */}
        <div className="mt-12 pt-10 border-t border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <BsQrCode className="text-5xl sm:text-6xl text-gray-500 shrink-0" />
            <div>
              <h3 className="text-base font-semibold mb-1">Download App</h3>
              <p className="text-gray-400 text-sm">Save $3 with App — New User Only</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <a href="#" className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 transition">
                  <PiGooglePlayLogoLight className="text-xl" />
                  Google Play
                </a>
                <a href="#" className="inline-flex items-center gap-2 bg-white text-gray-900 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 transition">
                  <RiAppleLine className="text-xl" />
                  App Store
                </a>
              </div>
            </div>
          </div>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Exclusive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
