import React from 'react'

const ShortData = ({ setRecord, setLoading, items }) => {

    const handleShortData = (e) => {
        setLoading(true);
        setTimeout(() => {
            setRecord(items.data);
            setRecord(prev => prev.slice(0, e));
            setLoading(false);
        }, 2000);
    }

    return (
        <select
            onChange={(e) => handleShortData(e.target.value)}
            defaultValue={15}
            name="short" id="short" className='md:px-7 md:py-1 md:text-sm text-xs px-6 py-0 rounded-sm border-gray-300 focus:outline-none bg-slate-100 focus:bg-white focus:ring-1 focus:ring-purple-700 mr-2'>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
        </select>
    )
}

export default ShortData
