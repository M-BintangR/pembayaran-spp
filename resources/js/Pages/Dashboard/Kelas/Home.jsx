import HardTitle from '@/Components/HardTitle'
import Sidebar from '@/Layouts/Sidebar'
import { Inertia } from '@inertiajs/inertia';
import { Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi';
import swal from 'sweetalert';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';


const Home = ({ items }) => {
    const [record, setRecord] = useState();
    const [loading, setLoading] = useState(false);
    const trTbl = [
        { title: 'No' },
        { title: 'Nama Kelas' },
        { title: 'Kompetensi Keahlian' },
        { title: 'Action' },
    ];
    useEffect(() => {
        setRecord(items);
    }, []);

    const handleShortData = (e) => {
        setLoading(true);
        setTimeout(() => {
            setRecord(items);
            setRecord(prev => prev.slice(0, e));
            setLoading(false);
        }, 2000);
    }

    const handleSearchData = (target) => {
        if (target !== "") {
            setRecord(record.filter(item => {
                return item.nama_kelas.toLowerCase().includes(target.toLowerCase()) ||
                    item.kompetensi_keahlian.toLowerCase().includes(target.toLowerCase());
            }));
        } else {
            setRecord(items);
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
                    Inertia.delete(`/dashboard/kelas/${id}`);
                    setRecord(record.filter(record => record.id !== id));
                    swal("Data berhasil di hapus!", {
                        icon: "success",
                        confirmButtonColor: '#7E22CE',
                    });
                } else {
                    swal("Data batal di hapus", {
                        confirmButtonColor: '#7E22CE',
                    });
                }
            });

    }
    return (
        <Sidebar active={'kelas'}>
            <div className={`absolute bg-yellow-500 text-white duration-1000 left-[47%] right-[46%] ${loading ? 'opacity-100 top-28' : 'opacity-0 top-0'} py-2 px-3 rounded-md shadow-xl`}>
                Memuat...
            </div>
            <HardTitle title={'Data Kelas'} subTitle={'Kelola Data Kelas'} />
            <div className='text-base font-semibold'>
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
                        {record?.map((row, index) => (
                            < tr
                                key={index}
                                className={` border-x-2 border-gray-300 odd:bg-gray-200`} >
                                <>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>{index + 1}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>{row?.nama_kelas}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>{row?.kompetensi_keahlian}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>
                                        <Link
                                            href={`/dashboard/kelas/${row?.id}/edit`}
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
                <div className='flex justify-end text-purple-700 font-bold mt-3'>
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
            </div>

            {/* table sm */}

            <div className='sm:hidden flex-col gap-y-3 my-3'>
                {record?.map((row, index) => (
                    <div key={index} className='flex flex-row odd:bg-gray-100 p-2 rounded-md'>
                        <ul className='inline-block mr-auto float-left'>
                            {trTbl.map((head, index) => (
                                <li
                                    key={index}
                                    className='mb-1 border-b-2 '>{head?.title}
                                </li>
                            ))}
                        </ul>
                        <ul className='inline-block '>
                            <li className='mb-1 border-b-2'>{index + 1}</li>
                            <li className='mb-1 border-b-2'>{row?.nama_kelas}</li>
                            <li className='mb-1 border-b-2'>{row?.kompetensi_keahlian}</li>
                            <li className='my-2'>
                                <button
                                    onClick={() => handleDelete(row?.id)}
                                    className='mr-2 font-semibold text-white bg-red-600 px-1 py-[2px] rounded-sm'>Hapus</button>
                                <Link
                                    href={`/dashboard/kelas/${row?.id}/edit`}
                                    className='font-semibold text-white bg-amber-600 px-1 py-[2px] rounded-sm'>Edit
                                </Link>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
        </Sidebar>
    )
}

export default Home
