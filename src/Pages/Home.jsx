import React from 'react'
import Header from '@/Components/Layout/Header'
import CategorySection from '@/Components/Layout/CategorySection'
import Main from '@/Pages/Main'
import Footer from '@/Pages/Footer'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <Header />
      <main className="flex-1">
        <CategorySection />
        <div className="py-12">
          <Main />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home