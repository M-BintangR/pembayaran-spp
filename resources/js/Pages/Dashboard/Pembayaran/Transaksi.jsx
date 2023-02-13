import Sidebar from '@/Layouts/Sidebar'
import HardTitle from '@/Components/HardTitle'
import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import Loading from '@/Components/Loading';
import Paginate from '@/Components/Paginate';

const Transaksi = ({ siswa, user }) => {
    const [record, setRecord] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setRecord(siswa.data);
    }, [siswa]);

    const trTbl = [
        { title: 'No' },
        { title: 'Nama Siswa' },
        { title: 'NIS' },
        { title: 'Kelas' },
    ];

    const handleShortData = (e) => {
        setLoading(true);
        setTimeout(() => {
            setRecord(items.data);
            setRecord(prev => prev.slice(0, e));
            setLoading(false);
        }, 2000);
    }

    const handleSearchData = (target) => {
        if (target !== "") {
            setRecord(record.filter(item => {
                return item.nama.toLowerCase().includes(target.toLowerCase()) ||
                    item.nis.toLowerCase().toString().includes(target.toLowerCase()) || item.kelas.nama_kelas.toLowerCase().includes(target.toLowerCase());
            }));
        } else {
            setRecord(siswa.data);
        }
    }

    return (
        <Sidebar active={'pembayaran'} user={user}>
            <HardTitle title={'Pembayaran Siswa'} subTitle={'Data Pembayaran Siswa'} />
            <Loading loading={loading} />

            <div className='text-base font-semibold md:mb-5'>
                <select
                    onChange={(e) => handleShortData(e.target.value)}
                    defaultValue={10}
                    name="short" id="short" className='md:px-7 md:py-1 md:text-sm text-xs px-6 py-0 rounded-sm border-gray-300 focus:outline-none bg-slate-100 focus:bg-white focus:ring-1 focus:ring-purple-700 mr-2'>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>

                <input
                    onInput={(e) => handleSearchData(e.target.value)}
                    className='md:p-1 py-[1px] rounded-sm border shadow-sm border-gray-300 md:text-sm text-xs w-auto md:w-[150px] bg-slate-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-700'
                    type="text"
                    placeholder='Search'
                />
            </div>


            <div className="overflow-x-auto mt-2 sm:block hidden mb-5">
                <table className='w-full border-2 border-spacing-3'>
                    <thead className='bg-white text-slate-900 border-2 border-gray-300 py-1'>
                        <tr className='border-2 border-gray-300'>
                            {trTbl.map((row, index) => (
                                <th
                                    key={index}
                                    className={`p-3 text-sm font-normal md:font-semibold tracking-wide text-left border-x-2 border-gray-300 `}
                                >{row.title}</th>
                            ))}
                            <th
                                className={`p-3 text-sm font-normal md:font-semibold tracking-wide text-left border-x-2 border-gray-300 `}
                            >Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-100  '>
                        {record?.map((row, index) => (
                            < tr
                                key={index}
                                className={` border-x-2 border-gray-300 odd:bg-gray-200`} >
                                <>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>{index + 1}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 capitalize'>{row?.nama}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 capitalize'>{row?.nis}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 capitalize'>{row?.kelas?.nama_kelas}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>
                                        <Link
                                            className='duration-300 bg-gray-100 border-2 border-gray-300 text-gray-500 rounded-md py-2 px-3 hover:bg-green-600 hover:text-white font-semibold hover:border-green-700'
                                            href={route('pembayaran.create', row?.nisn)}>
                                            Bayar Spp +
                                        </Link>
                                    </td>
                                </>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className='duration-300 mt-3 mb-10 sm:hidden'>
                {record?.map((row, index) => (
                    <table class="w-full flex flex-row flex-no-wrap sm:bg-white overflow-hidden sm:shadow-lg ">
                        <thead class="text-white">
                            <tr class="bg-purple-700 flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 text-xs rounded-l-md">
                                {trTbl.map((tr, index) => (
                                    <th key={index} class="p-3 text-left">{tr.title}</th>
                                ))}
                                <th class="p-3 text-left h-[63px]" width="110px">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="flex-1 sm:flex-none">
                            <tr key={index} class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 text-xs">
                                <td class="border-grey-light border hover:bg-gray-100 p-3">{index + 1}</td>
                                <td class="border-grey-light border hover:bg-gray-100 p-3 truncate capitalize">{row?.nama}</td>
                                <td class="border-grey-light border hover:bg-gray-100 p-3 truncate capitalize">{row?.nis}</td>
                                <td class="border-grey-light border hover:bg-gray-100 p-3 truncate capitalize">{row?.kelas?.nama_kelas}</td>
                                <td class="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                                    <Link
                                        className='duration-300 bg-gray-100 border-2 border-gray-300 text-gray-500 rounded-md py-1 px-2 hover:bg-green-600 hover:text-white font-semibold hover:border-green-700 text-xs'
                                        href={route('pembayaran.create', row?.nisn)}>
                                        Bayar Spp +
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </div>


            <Paginate meta={siswa} />
        </Sidebar>
    )
}

export default Transaksi