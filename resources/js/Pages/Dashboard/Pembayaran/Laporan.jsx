import Sidebar from '@/Layouts/Sidebar'
import HardTitle from '@/Components/HardTitle'
import { Link, router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { BiPrinter } from 'react-icons/bi';
import Loading from '@/Components/Loading';
import Paginate from '@/Components/Paginate';
import ShortData from '@/Components/ShortData';
import { tableLaporan as trTbl } from '@/Components/url/url';

const Laporan = ({ items, short, shortKelas, relasi }) => {
    const { auth } = usePage().props;
    const [record, setRecord] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setRecord(items?.data);
    }, []);

    const handleShortData = (shorting) => {
        setLoading(true);
        router.get(route('laporan'), { short: shorting }, {
            onSuccess: () => {
                setLoading(false);
            }
        });
    }

    const handleShortKelas = (shortKelas) => {
        setLoading(true);
        if (!shortKelas.toLowerCase().includes('semua')) {
            router.get(route('laporan'), { short_kelas: shortKelas }, {
                onSuccess: () => {
                    setLoading(false);
                }
            });
        } else {
            router.get(route('laporan'));
        }
    }

    return (
        <Sidebar active={'laporan'} user={auth.user}>
            <HardTitle title={'Laporan Pembayaran Kelas'} subTitle={'Laporan pembayaran per kelas'} />
            <Loading loading={loading} />
            <div className='text-base font-semibold md:mb-5'>
                <ShortData handleShortData={handleShortData} short={short} />
                <select
                    value={shortKelas}
                    onChange={(e) => handleShortKelas(e.target.value)}
                    name="short" id="short" className='md:px-7 md:py-1 md:text-sm text-xs px-6 py-0 rounded-sm border-gray-300 focus:outline-none bg-slate-100 focus:bg-white focus:ring-1 focus:ring-purple-700 mr-2'>
                    <option value={'semua'}>Semua Kelas</option>
                    {relasi?.map((row, i) => (
                        <option key={i} value={row?.id}>{row?.nama_kelas}</option>
                    ))}
                </select>
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
                        {record?.map((row, index) => {
                            let paymentTotal = 0;
                            for (const siswa of row.siswa) {
                                for (const pembayaran of siswa.pembayaran) {
                                    paymentTotal += pembayaran.jumlah_bayar;
                                }
                            }
                            return (
                                < tr
                                    key={index}
                                    className={` border-x-2 border-gray-300 odd:bg-gray-200`} >
                                    <>
                                        <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>{index + 1}</td>
                                        <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 capitalize'>{row?.nama_kelas}</td>
                                        <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 capitalize'>Rp {paymentTotal.toLocaleString()},-</td>
                                        <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>
                                            <a
                                                target={'_blank'}
                                                href={route('laporan.rekap', row?.id)}
                                                className='duration-300 bg-gray-100 border-2 border-gray-300 text-gray-500 rounded-md py-2 px-3 hover:bg-green-600 hover:text-white font-semibold hover:border-green-700 box-border'
                                            >
                                                <BiPrinter className='text-md inline-block mr-1' />
                                                Cetak Rekap Kelas
                                            </a>
                                        </td>
                                    </>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* table sm */}

            <div className='duration-300 mt-3 mb-10 sm:hidden'>
                {record?.map((row, index) => {
                    let paymentTotal = 0;
                    for (const siswa of row.siswa) {
                        for (const pembayaran of siswa.pembayaran) {
                            paymentTotal += pembayaran.jumlah_bayar;
                        }
                    }
                    return (
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
                                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate capitalize">{row?.nama_kelas}</td>
                                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate capitalize">Rp {paymentTotal.toLocaleString()},-</td>
                                    <td className="border-grey-light border hover:bg-gray-100 px-3 truncate capitalize py-5 box-border">
                                        <a
                                            target={'_blank'}
                                            href={route('laporan.rekap', row?.id)}
                                            className='duration-300 text-black hover:text-green-600 text-lg'
                                        >
                                            <BiPrinter />
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )
                })}
            </div>
            <Paginate meta={items} short={short} />
        </Sidebar>
    )
}

export default Laporan
