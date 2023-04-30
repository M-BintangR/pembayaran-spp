import Sidebar from '@/Layouts/Sidebar'
import HardTitle from '@/Components/HardTitle'
import { Link, router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import Loading from '@/Components/Loading';
import Paginate from '@/Components/Paginate';
import { BsCheck } from 'react-icons/bs';
import { RiCloseFill } from 'react-icons/ri';
import ShortData from '@/Components/ShortData';
import SearchData from '@/Components/SearchData';
import { tableTransaksi01 as trTbl } from '@/Components/url/url';
import { tableTransaksi02 as trTbl2 } from '@/Components/url/url';
import { month } from '@/Components/url/url';

const Transaksi = ({ siswa, short }) => {
    const { auth } = usePage().props;
    const [record, setRecord] = useState([]);
    const [loading, setLoading] = useState(false);
    const [tblLoading, setTblLoading] = useState(false);

    useEffect(() => {
        setTblLoading(true);
        setTimeout(() => {
            setRecord(siswa.data);
            setTblLoading(false);
        }, 200);
    }, [siswa]);

    const handleShortData = (e) => {
        setLoading(true);
        router.get(route('transaksi'), { short: e }, {
            onSuccess: () => {
                setLoading(false);
            }
        });
    }

    const handleSearchData = (target) => {
        try {
            const prevRecord = record;
            const search = target.trim();
            if (target && search.length !== 0) {
                const url = search ? `/dashboard/pembayaran/transaksi/search?search=${search}` : "/dashboard/pembayaran/search";
                axios.get(url)
                    .then(res => res?.data?.items)
                    .then(res => {
                        setRecord(res?.data || prevRecord);
                    });
            } else {
                setRecord(prevRecord);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Sidebar active={'pembayaran'} user={auth.user}>
            <HardTitle title={'Pembayaran Siswa'} subTitle={'Data Pembayaran Siswa'} />
            <Loading loading={loading} />

            <div className='text-base font-semibold md:mb-5'>
                <ShortData handleShortData={handleShortData} short={short} />
                <SearchData handleSearchData={handleSearchData} />
                <Link href={route('pembayaran.index')} className='bg-green-500 md:rounded-md md:text-base text-xs px-2 py-[3px] md:px-3 md:py-1 text-white inline float-right md:relative fixed bottom-0 md:m-0 m-5 rounded-xl shadow-2xl right-0'>Cetak Kuitansi +</Link>
            </div>

            {record && !tblLoading ? (
                <>
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
                                            {month.map((mon, i) => {
                                                let match = false;
                                                for (const bulan of row?.pembayaran) {
                                                    if (bulan.bulan_bayar.toLowerCase() === mon.toLowerCase()) {
                                                        match = true;
                                                        break;
                                                    }
                                                }
                                                return (
                                                    <td key={i} className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 capitalize'>{match ?
                                                        <BsCheck className='text-green-600 font-bold text-lg' /> : <RiCloseFill className='text-red-600 font-bold text-lg' />
                                                    }
                                                    </td>
                                                )
                                            })}
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
                            <table key={index} className="w-full flex flex-row flex-no-wrap sm:bg-white overflow-hidden sm:shadow-lg ">
                                <thead className="text-white">
                                    <tr className="bg-purple-700 flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 text-xs rounded-l-md">
                                        {trTbl2.map((tr, index) => (
                                            <th key={index} className="p-3 text-left">{tr.title}</th>
                                        ))}
                                        <th className="p-3 text-left h-[63px]" width="110px">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="flex-1 sm:flex-none">
                                    <tr key={index} className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 text-xs">
                                        <td className="border-grey-light border hover:bg-gray-100 p-3">{index + 1}</td>
                                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate capitalize">{row?.nama}</td>
                                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate capitalize">{row?.nis}</td>
                                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate capitalize">{row?.kelas?.nama_kelas}</td>
                                        {month.map((mon, i) => {

                                            let match = false;
                                            for (const bulan of row?.pembayaran) {
                                                if (bulan.bulan_bayar.toLowerCase() === mon.toLowerCase()) {
                                                    match = true;
                                                    break;
                                                }
                                            }

                                            return (
                                                <td key={i} className="border-grey-light border hover:bg-gray-100 p-3 truncate capitalize">{match ?
                                                    'Lunas' : 'B.Lunas'
                                                }</td>
                                            )
                                        })}
                                        <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
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
                    <Paginate meta={siswa} short={short} />
                </>
            ) : (
                <div className='flex justify-end'>
                    <h1 className='text-md md:bg-amber-500 text-black md:text-white w-32 md:pl-3 rounded-md md:py-1 box-border my-5 text-center'>Memuat data...</h1>
                </div>
            )}


        </Sidebar>
    )
}

export default Transaksi
