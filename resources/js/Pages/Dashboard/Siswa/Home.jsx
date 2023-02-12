import HardTitle from '@/Components/HardTitle'
import Sidebar from '@/Layouts/Sidebar'
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi';
import swal from 'sweetalert';
import Loading from '@/Components/Loading';
import Paginate from '@/Components/Paginate';
import ShortData from '@/Components/ShortData';
import SearchData from '@/Components/SearchData';


const Home = ({ items, user }) => {
    const [record, setRecord] = useState();
    const [loading, setLoading] = useState(false);
    const trTbl = [
        { title: 'No' },
        { title: 'Nama' },
        { title: 'Jenis Kelamin' },
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
        <Sidebar active={'siswa'} user={user}>
            <HardTitle title={'Data Siswa'} subTitle={'Kelola Data Siswa'} />
            <Loading loading={loading} />
            <div className='text-base font-semibold md:mb-5'>
                <ShortData setRecord={setRecord} setLoading={setLoading} items={items} />
                <SearchData handleSearchData={handleSearchData} />
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
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 capitalize'>{row?.jk === 'l' ? 'Laki-laki' : 'Prempuan'}</td>
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
                    <table key={index} className="w-full flex flex-row flex-no-wrap sm:bg-white overflow-hidden sm:shadow-lg ">
                        <thead className="text-white">
                            <tr className="bg-purple-700 flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 text-xs rounded-l-md">
                                {trTbl.map((tr, index) => (
                                    <th key={index} className="p-3 text-left">{tr.title}</th>
                                ))}
                                <th className="p-3 text-left h-[62px]" width="110px">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="flex-1 sm:flex-none">
                            <tr key={index} className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 text-xs">
                                <td className="border-grey-light border hover:bg-gray-100 p-3">{index + 1}</td>
                                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate capitalize">{row?.nama}</td>
                                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate uppercase">{row?.nisn}</td>
                                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate uppercase">{row?.nis}</td>
                                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate uppercase">{row?.kelas?.nama_kelas}</td>
                                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate uppercase">{row?.alamat}</td>
                                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate uppercase">{row?.no_telp}</td>
                                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate uppercase">{row?.spp?.nominal}</td>
                                <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
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
            <Paginate meta={items} />
        </Sidebar>
    )
}

export default Home
