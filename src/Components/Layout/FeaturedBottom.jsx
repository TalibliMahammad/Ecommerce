import React from 'react'
import { TbTruckDelivery } from "react-icons/tb";
import { BiPhoneCall } from "react-icons/bi";
import { FaMoneyBillTransfer } from "react-icons/fa6";

const FeaturedBottom = () => {
  return (
    <div className="my-[100px] flex justify-center gap-8 flex-wrap px-4">
      {[
        {
          icon: <TbTruckDelivery className="text-5xl text-indigo-600" />,
          title: "Free & Fast Delivery",
          desc: "Free delivery for all orders over $140",
        },
        {
          icon: <BiPhoneCall className="text-5xl text-green-600" />,
          title: "24/7 Customer Service",
          desc: "Friendly customer support always ready",
        },
        {
          icon: <FaMoneyBillTransfer className="text-5xl text-yellow-500" />,
          title: "Money Back Guarantee",
          desc: "We return your money within 30 days",
        },
      ].map((item, idx) => (
        <div
          key={idx}
          className="bg-white hover:shadow-2xl transition-shadow duration-300 rounded-2xl p-6 w-[300px] text-center flex flex-col items-center gap-4 border border-gray-200"
        >
          {item.icon}
          <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
          <p className="text-sm text-gray-500">{item.desc}</p>
        </div>
      ))}
    </div>

  )
}

export default FeaturedBottom