import React from 'react';
import Header from '@/Components/Layout/Header';
import Footer from '@/Pages/Footer';
import team from '../../assets/gifs/3917525-uhd_4096_2160_25fps.mp4'


const AboutUs = () => {
  return (

    <>
    <Header />
    <div className="font-sans text-gray-800">

      <section className="px-6 md:px-20 py-10">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">Our Story</h1>
            <p className="text-gray-600 leading-7">
              Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace
              with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data,
              and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers
              across the region.
              <br /><br />
              Exclusive has more than 1 million products to offer, growing at a very fast pace. Exclusive offers
              a diverse assortment in categories ranging from consumer...
            </p>
          </div>
          <div className="flex-1">
            <img
              src={team}
              alt="Our Story"
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </section>


      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 md:px-20 py-12 text-center">
        {[
          { value: "10.5k", label: "Sellers active on our site", icon: "🛍️" },
          { value: "33k", label: "Monthly Product Sales", icon: "📦", },
          { value: "45.5k", label: "Customers active on our site", icon: "👥" },
          { value: "25k", label: "Annual gross sale on our site", icon: "💰" },
        ].map((item, i) => (
          <div
            key={i}
            
            className={` hover:bg-red-400  hover:text-white transition-all duration-500 flex flex-col items-center p-6 rounded-lg border ${item.highlight ? 'bg-red-100 text-red-600 font-semibold' : 'bg-white'}`}
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <h3 className="text-2xl font-bold">{item.value}</h3>
            <p className="text-sm">{item.label}</p>
          </div>
        ))}
      </section>

  
      <section className="bg-gray-100 py-16 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              name: "Tom Cruise",
              role: "Founder & Chairman",
              img: "https://randomuser.me/api/portraits/men/45.jpg"
            },
            {
              name: "Emma Watson",
              role: "Managing Director",
              img: "https://randomuser.me/api/portraits/women/44.jpg"
            },
            {
              name: "Will Smith",
              role: "Product Designer",
              img: "https://randomuser.me/api/portraits/men/46.jpg"
            }
          ].map((member, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg text-center shadow hover:shadow-lg transition">
              <img src={member.img} alt={member.name} className="w-24 h-24 mx-auto rounded-full mb-4" />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
              <div className="flex justify-center gap-4 mt-4 text-xl text-gray-600">
                <i className="fab fa-twitter"></i>
                <i className="fab fa-facebook"></i>
                <i className="fab fa-linkedin"></i>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 px-6 md:px-20 py-16 text-center">
        {[
          { icon: "🚚", title: "Free and Fast Delivery", desc: "Free delivery for all orders over $140" },
          { icon: "📞", title: "24/7 Customer Service", desc: "Friendly 24/7 customer support" },
          { icon: "🔁", title: "Money Back Guarantee", desc: "We return money within 30 days" },
        ].map((feature, i) => (
          <div key={i} className="p-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition shadow">
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
    <Footer />
    </>
  );
};

export default AboutUs;
