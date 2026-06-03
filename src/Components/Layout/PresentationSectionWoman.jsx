import React from 'react'


const PresentationSectionWoman = () => {
    return (

        <div className='flex flex-col items-center'>

            <div className='flex  mt-10  items-center lg:items-end    flex-col  lg:flex-row  px-21 justify-start w-full gap-5'>
                <div className=' rotate-90 lg:rotate-0 bg-red-500 rounded-[5px] h-[40px] w-[15px]'></div>
                <h1 className=' text-xl font-bold  capitalize'>Our Models</h1>
            </div>

            <div className='mt-[100px] flex justify-center'>
                <div className='  flex justify-center'>
                    <video className='' autoPlay loop muted src={'./SlidersImages/3917525-uhd_4096_2160_25fps.mp4'}></video>
                </div>
            </div>


        </div>
    )
}

export default PresentationSectionWoman