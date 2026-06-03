import React from 'react'
const faqs = [
  {
    question: "How fast is your delivery?",
    answer: "We offer delivery within 24-48 hours in most major cities with real-time tracking.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept credit cards, PayPal, digital wallets, and cash on delivery.",
  },
  {
    question: "What is your return policy?",
    answer: "You can return products within 30 days for a full refund or exchange.",
  },
];
const FaQs = () => {
  return (
    <section className="bg-gray-50 py-16">
    <div className="max-w-5xl mx-auto px-4">
      <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map(({ question, answer }, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold mb-2">{question}</h3>
            <p className="text-gray-600">{answer}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default FaQs