import { Inertia } from '@inertiajs/inertia';
import { router } from '@inertiajs/react';
import React from 'react'

const ShortData = ({ handleShortData, short }) => {

    return (
        <select
            value={short}
            onChange={(e) => handleShortData(e.target.value)}
            name="short" id="short" className='md:px-7 md:py-1 md:text-sm text-xs px-6 py-0 rounded-sm border-gray-300 focus:outline-none bg-slate-100 focus:bg-white focus:ring-1 focus:ring-purple-700 mr-2'>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
        </select>
    )
}

export default ShortData
