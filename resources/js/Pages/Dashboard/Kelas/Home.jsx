import HardTitle from '@/Components/HardTitle'
import Sidebar from '@/Layouts/Sidebar'
import { Link } from '@inertiajs/react';
import React from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi';

const Home = ({ items }) => {
    const trTbl = [
        { title: 'No' },
        { title: 'Nama Kelas' },
        { title: 'Kompetensi Keahlian' },
        { title: 'Action' },
    ];

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
                <Link href='/dashboard/kelas/create' className='bg-purple-700 md:rounded-md md:text-base text-xs rounded-sm px-2 py-[3px] md:px-3 md:py-1 text-white inline float-right'>Tambah Data +</Link>
            </div>

            {/* table md */}
            <div className="overflow-x-auto mt-2 sm:block hidden">
                <table className='w-full border-2 border-spacing-3'>
                    <thead className='bg-white text-slate-900 border-2 border-gray-300 py-1'>
                        <tr className='border-2 border-gray-300'>
                            {trTbl.map((row, index) => (
                                <th
                                    key={index}
                                    className={`p-3 text-sm font-normal md:font-semibold tracking-wide text-left border-x-2 border-gray-300 `}
                                >{row.title}</th>
                            ))}

                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100  '>
                        {items?.map((row, index) => (
                            < tr
                                key={index}
                                className={` border-x-2 border-gray-300 odd:bg-gray-200`} >
                                <>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>{index + 1}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>{row?.nama_kelas}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>{row?.kompetensi_keahlian}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>
                                        <button

                                            className='duration-100 text-sm md:text-xl text-black mr-1 font-medium md:font-semibold py-1 px-3 hover:text-amber-400'
                                        >
                                            <BiEdit className='inline' />
                                        </button>
                                        <Link
                                            href={`/dashboard/kelas/${row?.id}`}
                                            method={'delete'}
                                            className='duration-100 text-sm md:text-xl text-black mr-1 font-medium md:font-semibold py-1 px-3 hover:text-red-400'
                                        >
                                            <BiTrash className='inline' />
                                        </Link>
                                    </td>
                                </>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* table sm */}

            <div className='sm:hidden flex-col gap-y-3 my-3'>
                {items?.map((item, index) => (
                    <div key={index} className='flex flex-row odd:bg-gray-100 p-2 rounded-md'>
                        <ul className='inline-block mr-auto float-left'>
                            {trTbl.map((row, index) => (
                                <li
                                    key={index}
                                    className='mb-1 border-b-2 '>{row.title}
                                </li>
                            ))}
                        </ul>
                        <ul className='inline-block '>
                            <li className='mb-1 border-b-2'>{index + 1}</li>
                            <li className='mb-1 border-b-2'>{item?.nama_kelas}</li>
                            <li className='mb-1 border-b-2'>{item?.kompetensi_keahlian}</li>
                            <li className='my-2'>
                                <Link
                                    href={`/dashboard/kelas/${item?.id}`}
                                    method={'delete'}
                                    className='mr-2 font-semibold text-white bg-red-600 px-1 py-[2px] rounded-sm'>Hapus</Link>
                                <button className='font-semibold text-white bg-amber-600 px-1 py-[2px] rounded-sm'>Edit</button>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>


        </Sidebar>
    )
}

export default Home
