import React from 'react'

const HardTitle = ({ title, subTitle }) => {
    return (
        <div className="md:mt-5 mt-2 md:mb-8 mb-2 bg-slate-100 rounded-md py-3 px-4">
            <h1 className='text-base md:text-2xl font-semibold capitalize'>{title}</h1>
            <p className='text-xs capitalize'>{subTitle}</p>
        </div>
    )
}

export default HardTitle
