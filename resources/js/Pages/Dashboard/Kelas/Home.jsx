import HardTitle from '@/Components/HardTitle'
import { TableMd, TableSm } from '@/Components/Table';
import Sidebar from '@/Layouts/Sidebar'
import React from 'react'


const Home = () => {
    return (
        <Sidebar>
            <HardTitle title={'Data Kelas'} subTitle={'Kelola Data Kelas'} />
            <div className='text-base font-semibold'>
                <select name="" id="" className='md:px-7 md:py-1 md:text-sm text-xs px-6 py-0 rounded-sm border-gray-300 focus:outline-none bg-slate-100 focus:bg-white focus:ring-1 focus:ring-purple-700 mr-2'>
                    <option value="">10</option>
                    <option value="">20</option>
                    <option value="">30</option>
                </select>
                <input
                    className='md:p-1 py-[1px] rounded-sm border shadow-sm border-gray-300 md:text-sm text-xs w-[100px] md:w-[150px] bg-slate-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-700'
                    type="text"
                    placeholder='Search'
                />
                <button className='bg-purple-700 md:rounded-md md:text-base text-xs rounded-sm px-2 py-[3px] md:px-3 md:py-1 text-white inline float-right'>Tambah Data +</button>
            </div>
            <TableMd />
            <TableSm />


        </Sidebar>
    )
}

export default Home
