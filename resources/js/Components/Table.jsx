import React from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi';


export const TableMd = ({ rows, headings }) => {
    return (
        <div className="overflow-x-auto mt-2 sm:block hidden">
            <table className='w-full border-2 border-spacing-3'>
                <thead className='bg-white text-slate-900 border-2 border-gray-300 py-1'>
                    <tr className='border-2 border-gray-300'>
                        <th
                            className={`p-3 text-sm font-normal md:font-semibold tracking-wide text-left border-x-2 border-gray-300 `}
                        >Nama Kelas</th>
                        <th
                            className={`p-3 text-sm font-normal md:font-semibold tracking-wide text-left border-x-2 border-gray-300`}
                        >Kompetensi Keahlian</th>
                        <th
                            className={`p-3 text-sm font-normal md:font-semibold tracking-wide text-left border-x-2 border-gray-300`}
                        >Action</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-gray-100  '>
                    < tr className={` border-x-2 border-gray-300 odd:bg-gray-200`} >
                        <>
                            <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>3 RPL 1</td>
                            <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>Rekayasa Prangkat Lunak</td>
                            <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>
                                <button
                                    className='duration-100 text-sm md:text-xl text-black mr-1 font-medium md:font-semibold py-1 px-3 hover:text-amber-400'
                                >
                                    <BiEdit className='inline' />
                                </button>
                                <button
                                    className='duration-100 text-sm md:text-xl text-black mr-1 font-medium md:font-semibold py-1 px-3 hover:text-red-400'
                                >
                                    <BiTrash className='inline' />
                                </button>
                            </td>
                        </>
                    </tr>
                    < tr className={`bg-white border-x-2 border-gray-300 odd:bg-gray-200`} >
                        <>
                            <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>3 RPL 1</td>
                            <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>Rekayasa Prangkat Lunak</td>
                            <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>
                                <button
                                    className='duration-100 text-sm md:text-xl text-black mr-1 font-medium md:font-semibold py-1 px-3 hover:text-amber-400'
                                >
                                    <BiEdit className='inline' />
                                </button>
                                <button
                                    className='duration-100 text-sm md:text-xl text-black mr-1 font-medium md:font-semibold py-1 px-3 hover:text-red-400'
                                >
                                    <BiTrash className='inline' />
                                </button>
                            </td>
                        </>
                    </tr>
                    < tr className={`bg-white border-x-2 border-gray-300 odd:bg-gray-200 `} >
                        <>
                            <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>3 RPL 1</td>
                            <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>Rekayasa Prangkat Lunak</td>
                            <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>
                                <button
                                    className='duration-100 text-sm md:text-xl text-black mr-1 font-medium md:font-semibold py-1 px-3 hover:text-amber-400'
                                >
                                    <BiEdit className='inline' />
                                </button>
                                <button
                                    className='duration-100 text-sm md:text-xl text-black mr-1 font-medium md:font-semibold py-1 px-3 hover:text-red-400'
                                >
                                    <BiTrash className='inline' />
                                </button>
                            </td>
                        </>
                    </tr>
                    < tr className={`bg-white border-x-2 border-gray-300 odd:bg-gray-200`} >
                        <>
                            <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>3 RPL 1</td>
                            <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>Rekayasa Prangkat Lunak</td>
                            <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>
                                <button
                                    className='duration-100 text-sm md:text-xl text-black mr-1  font-medium md:font-semibold py-1 px-3 hover:text-amber-400'
                                >
                                    <BiEdit className='inline' />
                                </button>
                                <button
                                    className='duration-100 text-sm md:text-xl text-black mr-1  font-medium md:font-semibold py-1 px-3 hover:text-red-400'
                                >
                                    <BiTrash className='inline' />
                                </button>
                            </td>
                        </>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export const TableSm = ({ rows, headings }) => {
    return (
        <div className='sm:hidden flex-col gap-y-3 my-3'>
            <div className='flex flex-row odd:bg-gray-100 p-2 rounded-md'>
                <ul className='inline-block mr-auto float-left'>
                    <li className='mb-1 border-b-2 '>No</li>
                    <li className='mb-1 border-b-2'>Nama Kelas</li>
                    <li className='mb-1 border-b-2'>Kompetensi Keahlian</li>
                    <li className='my-2'>Action</li>
                </ul>
                <ul className='inline-block '>
                    <li className='mb-1 border-b-2'>1</li>
                    <li className='mb-1 border-b-2'>3 RPL 2</li>
                    <li className='mb-1 border-b-2'>Rekayasa Prangkat Lunak</li>
                    <li className='my-2'>
                        <button className='mr-2 font-semibold text-white bg-red-600 px-1 py-[2px] rounded-sm'>Hapus</button>
                        <button className='font-semibold text-white bg-amber-600 px-1 py-[2px] rounded-sm'>Edit</button>
                    </li>
                </ul>
            </div>
            <div className='flex flex-row odd:bg-gray-100 p-2 rounded-md'>
                <ul className='inline-block mr-auto float-left'>
                    <li className='mb-1 border-b-2 '>No</li>
                    <li className='mb-1 border-b-2'>Nama Kelas</li>
                    <li className='mb-1 border-b-2'>Kompetensi Keahlian</li>
                    <li className='my-2'>Action</li>
                </ul>
                <ul className='inline-block '>
                    <li className='mb-1 border-b-2'>1</li>
                    <li className='mb-1 border-b-2'>3 RPL 2</li>
                    <li className='mb-1 border-b-2'>Rekayasa Prangkat Lunak</li>
                    <li className='my-2'>
                        <button className='mr-2 font-semibold text-white bg-red-600 px-1 py-[2px] rounded-sm'>Hapus</button>
                        <button className='font-semibold text-white bg-amber-600 px-1 py-[2px] rounded-sm'>Edit</button>
                    </li>
                </ul>
            </div>
        </div>

    )
}

