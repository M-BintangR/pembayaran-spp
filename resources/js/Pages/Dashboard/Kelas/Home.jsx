import Sidebar from '@/Layouts/Sidebar'
import HardTitle from '@/Components/HardTitle'
import { Inertia } from '@inertiajs/inertia';
import React, { useEffect, useState } from 'react'
import { BiEdit, BiTrash } from 'react-icons/bi';
import swal from 'sweetalert';
import { router, useForm } from '@inertiajs/react';
import { CrudModal } from '@/Components/CrudModal';
import axios from 'axios';
import { DataCreate, DataEdit } from './DataInput';
import Loading from '@/Components/Loading';
import Paginate from '@/Components/Paginate';
import ShortData from '@/Components/ShortData';
import SearchData from '@/Components/SearchData';
import { tableKelas as trTbl } from '@/Components/url/url';

const Home = ({ items, user, short }) => {
    const [record, setRecord] = useState([]);
    const [loading, setLoading] = useState(false);

    //! KEPERLUAN MODAL!
    const [onCreteModal, setOnCreateModal] = useState(false);
    const [onEditModal, setOnEditModal] = useState(false);
    const [idKelas, setIdKelas] = useState();

    useEffect(() => {
        setRecord(items.data);
    }, [items]);

    const handleShortData = (shorting) => {
        setLoading(true);
        router.get(route('kelas.index'), { short: shorting }, {
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
                const url = search ? `/dashboard/kelas/search?search=${search}` : "/dashboard/kelas";
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
                    Inertia.delete(`/dashboard/kelas/${id}`, {
                        onFinish: () => {
                            setRecord(record.filter(record => record.id !== id));
                            swal("Berhasil!", "Data telah di hapus", {
                                icon: "success",
                            });
                        }
                    });
                } else {
                    swal("Batal Di Hapus!", "Data tetap tersimpan");
                }
            });
    }

    //! KEPERLUAN MODAL!
    const { data, setData, post, processing, errors, put } = useForm({
        nama_kelas: '',
        kompetensi_keahlian: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    const clearData = () => {
        setData({ nama_kelas: '', kompetensi_keahlian: '' });
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(route('kelas.store'), {
            onFinish: () => {
                setRecord(items?.data);
                setOnCreateModal(false);
                clearData();
                swal({
                    title: "Berhasil!",
                    text: "Data telah di tambahkan",
                    icon: "success",
                    button: "Ok",
                });
            }
        });
    }

    const onHandleSubmitEdit = (e) => {
        e.preventDefault();
        put(route('kelas.update', idKelas), {
            onFinish: () => {
                setRecord(items?.data);
                setOnEditModal(false);
                clearData();
                swal({
                    title: "Berhasil!",
                    text: "Data telah di ubah",
                    icon: "success",
                    button: "Ok",
                });
            }
        });
    }

    const onHandleModal = () => {
        setOnCreateModal(false);
        setOnEditModal(false);
        clearData();
    }

    const onHandleEdit = (id) => {
        try {
            axios.get(route('kelas.edit', id))
                .then(res => res?.data?.item)
                .then(res => {
                    try {
                        setData({ nama_kelas: res.nama_kelas, kompetensi_keahlian: res.kompetensi_keahlian });
                        setIdKelas(id);
                        setOnEditModal(true);
                        setPetugas(res?.id);
                    } catch (e) {
                        console.log(e);
                    }
                });
        } catch (e) {
            console.error(e)
        }

    }

    return (
        <Sidebar active={'kelas'} user={user}>
            <HardTitle title={'Data Kelas'} subTitle={'Kelola Data Kelas'} />
            <Loading loading={loading} />
            <div className='text-base font-semibold md:mb-5'>
                <ShortData handleShortData={handleShortData} short={short} />
                <SearchData handleSearchData={handleSearchData} />

                <button onClick={() => setOnCreateModal(true)} className='bg-purple-700 md:rounded-md md:text-base text-xs px-2 py-[3px] md:px-3 md:py-1 text-white inline float-right md:relative fixed bottom-0 md:m-0 m-5 rounded-xl shadow-2xl right-0'>Tambah Data +</button>
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
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 uppercase'>{row?.nama_kelas}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300 capitalize'>{row?.kompetensi_keahlian}</td>
                                    <td className='p-3 whitespace-nowrap text-gray-700 text-sm border-2 border-gray-300'>
                                        <button
                                            onClick={() => onHandleEdit(row?.id)}
                                            className='duration-100 text-sm md:text-xl text-black mr-1 font-medium md:font-semibold py-1 px-3 hover:text-amber-400 '
                                        >
                                            <BiEdit className='inline' />
                                        </button>
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
                                    <th key={index} className="p-3 text-left">{tr?.title}</th>
                                ))}
                                <th className="p-3 text-left h-[52px]" width="110px">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="flex-1 sm:flex-none">
                            <tr key={index} className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0 text-xs">
                                <td className="border-grey-light border hover:bg-gray-100 p-3">{index + 1}</td>
                                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate uppercase">{row?.nama_kelas}</td>
                                <td className="border-grey-light border hover:bg-gray-100 p-3 truncate capitalize">{row?.kompetensi_keahlian}</td>
                                <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                                    <button
                                        onClick={() => onHandleEdit(row?.id)}
                                        className='duration-100 text-sm md:text-xl text-black mr-1 font-medium md:font-semibold hover:text-amber-400'
                                    >
                                        <BiEdit className='inline' />
                                    </button>
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

            <Paginate meta={items} short={short} />

            <CrudModal
                isVisible={onCreteModal}
                onClose={() => setOnCreateModal(false)}
                title={'Tambah Data'}
            >
                <DataCreate
                    onHandleChange={onHandleChange}
                    errors={errors}
                    data={data}
                    onHandleSubmit={onHandleSubmit}
                    processing={processing}
                    onHandleModal={onHandleModal}
                />
            </CrudModal>

            <CrudModal
                isVisible={onEditModal}
                onClose={() => setOnEditModal(false)}
                title={'Edit Data'}
            >
                <DataEdit
                    onHandleChange={onHandleChange}
                    errors={errors}
                    data={data}
                    onHandleSubmit={onHandleSubmitEdit}
                    processing={processing}
                    onHandleModal={onHandleModal}
                />
            </CrudModal>
        </Sidebar>
    )
}

export default Home
