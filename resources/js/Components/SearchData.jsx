import React from 'react'

const SearchData = ({ handleSearchData }) => {
    return (
        <input
            onInput={(e) => handleSearchData(e.target.value)}
            className='md:p-1 py-[1px] rounded-sm border shadow-sm border-gray-300 md:text-sm text-xs w-auto md:w-[150px] bg-slate-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-700'
            type="text"
            placeholder='Search'
        />
    )
}

export default SearchData
