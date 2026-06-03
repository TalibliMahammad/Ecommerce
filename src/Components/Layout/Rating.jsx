import React from 'react'
import { useSelector } from 'react-redux';





const Rating = () => {


  const allItems = useSelector((state) => state.fetchData.data) || [];




  const flatItems = Object.values(allItems)
    .flatMap(cat => Object.values(cat))
    .flat();

  const flatMap = flatItems.filter(item => item.id == id)

    const getStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i}>
                    {i <= rating ? '⭐' : '☆'}
                </span>
            );
        }


        return stars;
    };



    return (
        <div>
            <div className="  cursor-pointer text-yellow-400 text-lg flex">
                <span className='flex gap-1'>
                    <span>Rating</span> {item.rating} {getStars((item.rating || 0))}
                </span>
            </div>
            </div>
            )
}

            export default Rating