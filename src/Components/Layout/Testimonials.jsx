import React from 'react'




const testimonials = [
  {
    name: "John Doe",
    role: "CEO, CompanyX",
    feedback: "Fantastic service and lightning-fast delivery. Highly recommended!",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Jane Smith",
    role: "Marketing Manager",
    feedback: "Secure payment options made me feel confident shopping here.",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Alice Johnson",
    role: "Entrepreneur",
    feedback: "24/7 support team helped me instantly when I had a question.",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

const Testimonials = () => (
  <section className="bg-white py-16">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold mb-12 text-gray-800">What Our Customers Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map(({ name, role, feedback, avatar }, idx) => (
          <div key={idx} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
              className="w-20 h-20 rounded-full mx-auto mb-4"
              src={avatar}
              alt={name}
              loading="lazy"
            />
            <p className="text-gray-700 italic mb-4">"{feedback}"</p>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials