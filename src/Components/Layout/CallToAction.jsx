import React from 'react'

const CallToAction = () => {
  return (
     <section className="bg-indigo-600 py-16 text-white text-center">
    <div className="max-w-4xl mx-auto px-4">
      <h2 className="text-4xl font-extrabold mb-4">Ready to experience the best?</h2>
      <p className="mb-8 text-lg max-w-xl mx-auto">
        Join thousands of satisfied customers and get started with our amazing services today.
      </p>
      <button className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300">
        Get Started Now
      </button>
    </div>
  </section>
  )
}

export default CallToAction