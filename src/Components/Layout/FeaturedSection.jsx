import React from 'react'


const FeaturedSection = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 lg:mt-28">
      <div className="flex flex-col-reverse lg:flex-row items-center gap-0 lg:gap-3 font-bold text-gray-900 section-label">
        <div className="section-label-bar" />
        <span className="text-base lg:text-lg text-gray-500 uppercase tracking-wider">Featured</span>
      </div>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-6">
        New Arrival
      </h2>

      <div className="mt-8 lg:mt-10 rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-gray-100 aspect-video max-h-[480px]">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="./SlidersImages/4727645-uhd_3840_2160_25fps.mp4"
        />
      </div>
    </section>
  );
};

export default FeaturedSection