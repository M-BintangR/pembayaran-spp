import HardTitle from '@/Components/HardTitle'
import Sidebar from '@/Layouts/Sidebar'
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi';
import swal from 'sweetalert';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import Loading from '@/Components/Loading';


const Home = ({ items }) => {
    const [record, setRecord] = useState();
    const [loading, setLoading] = useState(false);
    const trTbl = [
        { title: 'No' },
        { title: 'Nama' },
        { title: 'NISN' },
        { title: 'NIS' },
        { title: 'Nama Kelas' },
        { title: 'Alamat' },
        { title: 'No Telp' },
        { title: 'Nominal Pembayaran Spp' },
    ];
    useEffect(() => {
        setRecord(items.data);
    }, []);

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
                return item.nisn.toString().toLowerCase().includes(target.toLowerCase()) ||
                    item.nama.toString().toLowerCase().includes(target.toLowerCase()) ||
                    item.alamat.toString().toLowerCase().includes(target.toLowerCase()) ||
                    item.kelas.nama_kelas.toString().toLowerCase().includes(target.toLowerCase()) ||
                    item.alamat.toString().toLowerCase().includes(target.toLowerCase()) ||
                    item.no_telp.toString().toLowerCase().includes(target.toLowerCase()) ||
                    item.nis.toString().toLowerCase().includes(target.toLowerCase()) ||
                    item.spp.nominal.toString().toLowerCase().includes(target.toLowerCase());
            }));
        } else {
            setRecord(items.data);
        }
    }

    const handleDelete = async (id) => {
        await swal({
            title: "Apakah Anda Yakin?",
            text: "Jika data di hapus, maka data tidak akan bisa di kembalikan!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    Inertia.delete(`/dashboard/siswa/${id}`);
                    setRecord(record.filter(record => record.id !== id));
                    swal("Data berhasil di hapus!", {
                        icon: "success",
                    });
                } else {
                    swal("Data batal di hapus");
                }
            });

    }
    return (
        <Sidebar active={'siswa'}>
            <HardTitle title={'Data Siswa'} subTitle={'Kelola Data Siswa'} />
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

                <Link href={route('siswa.create')} className='bg-purple-700 md:rounded-md md:text-base text-xs px-2 py-[3px] md:px-3 md:py-1 text-white inline float-right md:relative fixed bottom-0 md:m-0 m-5 rounded-xl shadow-2xl right-0'>Tambah Data +</Link>
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
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 uppercase'>{row?.nisn}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 uppercase'>{row?.nis}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 capitalize'>{row?.kelas?.nama_kelas}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 uppercase'>{row?.alamat}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 uppercase'>{row?.no_telp}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 capitalize'>Rp {row?.spp?.nominal}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>
                                        <Link
                                            href={route('siswa.edit', row?.id)}
                                            className='duration-100 text-sm md:text-xl text-black mr-1 font-medium md:font-semibold py-1 px-3 hover:text-amber-400'
                                        >
                                            <BiEdit className='inline' />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(row?.id)}
                                            className='duration-100 text-sm md:text-xl text-black mr-1 font-medium md:font-semibold py-1 px-3 hover:text-red-400'
                                        >
                                            <BiTrash className='inline' />
                                        </button>
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
                    <table class="w-full flex flex-row flex-no-wrap sm:bg-white overflow-hidden sm:shadow-lg ">
                        <thead class="text-white">
                            <tr class="bg-purple-700 flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 text-xs rounded-l-md">
                                {trTbl.map((tr, index) => (
                                    <th key={index} class="p-3 text-left">{tr.title}</th>
                                ))}
                                <th class="p-3 text-left h-[62px]" width="110px">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="flex-1 sm:flex-none">
                            <tr key={index} class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 text-xs">
                                <td class="border-grey-light border hover:bg-gray-100 p-3">{index + 1}</td>
                                <td class="border-grey-light border hover:bg-gray-100 p-3 truncate capitalize">{row?.nama}</td>
                                <td class="border-grey-light border hover:bg-gray-100 p-3 truncate uppercase">{row?.nisn}</td>
                                <td class="border-grey-light border hover:bg-gray-100 p-3 truncate uppercase">{row?.nis}</td>
                                <td class="border-grey-light border hover:bg-gray-100 p-3 truncate uppercase">{row?.kelas?.nama_kelas}</td>
                                <td class="border-grey-light border hover:bg-gray-100 p-3 truncate uppercase">{row?.alamat}</td>
                                <td class="border-grey-light border hover:bg-gray-100 p-3 truncate uppercase">{row?.no_telp}</td>
                                <td class="border-grey-light border hover:bg-gray-100 p-3 truncate uppercase">{row?.spp?.nominal}</td>
                                <td class="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                                    <Link
                                        href={route('siswa.edit', row?.id)}
                                        className='duration-100 text-sm md:text-xl text-black mr-1 font-medium md:font-semibold hover:text-amber-400'
                                    >
                                        <BiEdit className='inline' />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(row?.id)}
                                        className='duration-100 text-sm md:text-xl text-black mr-1 font-medium md:font-semibold hover:text-red-400'
                                    >
                                        <BiTrash className='inline' />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </div>

            <div className='flex justify-end text-purple-700 font-bold md:my-10 mb-12 '>
                <div className="flex bg-white rounded-lg">
                    <button className='border-2 border-gray-400 duration-300 hover:border-purple-400 hover:bg-purple-700 hover:text-white py-1 px-2 rounded-l-md'>
                        <MdKeyboardArrowLeft />
                    </button>
                    <button className='border-2 mx-1 py-1 px-3 border-gray-400 duration-300 hover:border-purple-400 rounded-sm hover:bg-purple-700 hover:text-white'>21</button>
                    <button className='border-2 border-gray-400 duration-300 hover:border-purple-400 py-1 px-2 rounded-r-md hover:bg-purple-700 hover:text-white'>
                        <MdKeyboardArrowRight />
                    </button>
                </div>
            </div>

        </Sidebar>
    )
}

export default Home
