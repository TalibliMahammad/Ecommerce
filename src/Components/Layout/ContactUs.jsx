
import React from 'react';
import Header from '@/Components/Layout/Header';
import Footer from '@/Pages/Footer';

const ContactUs = () => {
    return (
        <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br bg-stone-100 to-white flex items-center justify-center px-4 py-12">
            <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl p-10 grid md:grid-cols-2 gap-10">
            
                <div className="space-y-6">
                    <h2 className="text-4xl font-extrabold text-indigo-600">Get in Touch</h2>
                    <p className="text-gray-600 text-lg">
                        We'd love to hear from you! Reach out with any questions or feedback.
                    </p>
                    <div className="space-y-4 text-gray-800">
                        <div className="flex items-center space-x-3">
                       
                            <span className="font-medium">Mahammad Talibli</span>
                        </div>
                        <div className="flex items-center space-x-3">
                           
                            <a href="mailto:mahammadtalibli@outlook.com" className="hover:underline text-blue-600">
                                mahammadtalibli@outlook.com
                            </a>
                        </div>
                        <div className="flex items-center space-x-3">
                        
                            <a href="tel:+994702253540" className="hover:underline text-blue-600">
                                +994 70 225 35 40
                            </a>
                        </div>
                    </div>
                </div>

               
                <form className="space-y-5">
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Your Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your name"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Your Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-sm font-semibold text-gray-700">Message</label>
                        <textarea
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Write your message here..."
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-indigo-700 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default ContactUs;
