import Sidebar from '@/Layouts/Sidebar'
import HardTitle from '@/Components/HardTitle'
import { Link, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { BiPrinter } from 'react-icons/bi';
import Loading from '@/Components/Loading';
import Paginate from '@/Components/Paginate';
import ShortData from '@/Components/ShortData';
import SearchData from '@/Components/SearchData';
import { tablePembayaran as trTbl } from '@/Components/url/url';

const Home = ({ items, user, short }) => {
    const [record, setRecord] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setRecord(items?.data);
    }, []);

    const handleShortData = (shorting) => {
        setLoading(true);
        router.get(route('pembayaran.index'), { short: shorting }, {
            onFinish: () => {
                setLoading(false);
            }
        });
    }

    const handleSearchData = (target) => {
        try {
            const prevRecord = record;
            const search = target.trim();
            if (target && search.length !== 0) {
                const url = search ? `/dashboard/pembayaran/search?search=${search}` : "/dashboard/pembayaran";
                axios.get(url)
                    .then(res => res?.data?.items)
                    .then(res => {
                        setRecord(res?.data || prevRecord);
                    });
            } else {
                setRecord(record);
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (

        <Sidebar active={'pembayaran'} user={user}>
            <HardTitle title={'History Pembayaran'} subTitle={'History Transaksi Pembayaran'} />
            <Loading loading={loading} />
            <div className='text-base font-semibold md:mb-5'>
                <ShortData handleShortData={handleShortData} short={short} />
                <SearchData handleSearchData={handleSearchData} />
                <Link href={route('transaksi')} className='bg-purple-700 md:rounded-md md:text-base text-xs px-2 py-[3px] md:px-3 md:py-1 text-white inline float-right md:relative fixed bottom-0 md:m-0 m-5 rounded-xl shadow-2xl right-0'>Tambah Pembayaran +</Link>
            </div>

            {/* table md */}
            <div className="overflow-x-auto mt-2 sm:block hidden mb-5">
                <table className='w-full border-2 border-spacing-3'>
                    <thead className='bg-white text-slate-900 border-2 border-gray-300 py-1'>
                        <tr className='border-2 border-gray-300'>
                            {trTbl.map((row, index) => (
                                <th
                                    key={index}
                                    className={`p-3 text-sm font-normal md:font-semibold tracking-wide text-left border-x-2 border-gray-300 `}
                                >{row?.title}</th>
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
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 capitalize'>{row?.nis}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 uppercase'>{row?.tanggal}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 capitalize'>{row?.bulan}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>
                                        <Link
                                            href={route('kwitansi', row?.nis)}
                                            className='duration-300 bg-gray-100 border-2 border-gray-300 text-gray-500 rounded-md py-2 px-3 hover:bg-green-600 hover:text-white font-semibold hover:border-green-700 box-border'
                                        >
                                            <BiPrinter className='text-md inline-block mr-1' />
                                            Kwitansi
                                        </Link>
                                    </td>
                                </>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* table sm */}

            <div className='duration-300 mt-3 mb-10 sm:hidden'>
                {record?.map((row, index) => (
                    <table key={index} className="w-full flex flex-row flex-no-wrap sm:bg-white overflow-hidden sm:shadow-lg ">
                        <thead className="text-white">
                            <tr className="bg-purple-700 flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 text-xs rounded-l-md">
                                {trTbl.map((tr, index) => (
                                    <th key={index} className="p-3 text-left">{tr.title}</th>
                                ))}
                                <th className="p-3 text-left h-[63px]" width="110px">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="flex-1 sm:flex-none">
                            <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 text-xs">
                                <td className="border-grey-light border hover:bg-gray-100 p-3">{index + 1}</td>
                                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate capitalize">{row?.nis}</td>
                                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate uppercase">{row?.tanggal}</td>
                                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate capitalize">{row?.bulan}</td>
                                <td className="border-grey-light border hover:bg-gray-100 px-3 truncate capitalize py-5 box-border">
                                    <Link
                                        href={route('kwitansi', row?.nis)}
                                        className='duration-300 text-black hover:text-green-600 text-lg'
                                    >
                                        <BiPrinter />
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </div>
            <Paginate meta={items} short={short} />
        </Sidebar>
    )
}

export default Home
