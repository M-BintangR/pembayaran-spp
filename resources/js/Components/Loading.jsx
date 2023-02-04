import React from 'react'

const Loading = ({ loading }) => {
    return (
        <div className={`fixed bg-yellow-500 text-white duration-1000 md:left-[47%] md:right-[46%] left-[40%] right-[40%] ${loading ? 'opacity-100 top-28' : 'opacity-0 top-0'} py-2 px-3 rounded-md shadow-xl md:text-base text-sx`}>
            Memuat...
        </div>
    )
}

export default Loading
