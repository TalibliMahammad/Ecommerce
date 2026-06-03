import React from 'react';
import Header from '@/Components/Layout/Header';
import Footer from '@/Pages/Footer';
import Testimonials from '@/Components/Layout/Testimonials';
import FaQs from '@/Components/Layout/FaQs';
import CallToAction from '@/Components/Layout/CallToAction';

const services = [
    {
        icon: '🚚',
        title: 'Fast Delivery',
        info: 'Get your orders delivered swiftly with real-time tracking and reliable logistics.',
    },
    {
        icon: '💳',
        title: 'Secure Payment',
        info: 'Multiple secure payment options with full encryption and fraud protection.',
    },
    {
        icon: '📞',
        title: '24/7 Support',
        info: 'Our friendly support team is available anytime to help you.',
    },
    {
        icon: '🔄',
        title: 'Easy Returns',
        info: 'Enjoy stress-free returns within 30 days with instant processing.',
    },
];

const OurServices = () => {
    return (
        <>
            <Header />
            <Testimonials />
            <FaQs />
            <CallToAction />
            <Footer />
        </>
    );
};

export default OurServices;
