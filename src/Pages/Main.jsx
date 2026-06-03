import React, { useEffect } from 'react'
import FlashSales from '@/Components/Layout/Electronics'
import CategoryBox from '@/Components/Layout/CategoryBox'
import WomanDressSection from '@/Components/Layout/WomanDressSection'  
import FeaturedBottom from '@/Components/Layout/FeaturedBottom'
import FeaturedSection from '@/Components/Layout/FeaturedSection'
import OurProducts from '@/Components/Layout/WomanShoes'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../Redux/CreateSlice/FetchDataSlice'
import { Link, useParams } from 'react-router-dom'
import Electronics from '@/Components/Layout/Electronics'

import PresentationSectionWoman from '@/Components/Layout/PresentationSectionWoman'


const Main = () => {
  const dispatch = useDispatch();

  const { mainCategory, subCategory } = useParams();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch])


  return (
    <div className=''>

      <Electronics />
      <CategoryBox />
      <WomanDressSection />
      <PresentationSectionWoman />
      <OurProducts />
      <FeaturedSection />
      <FeaturedBottom /> 

    </div>
  )
}

export default Main