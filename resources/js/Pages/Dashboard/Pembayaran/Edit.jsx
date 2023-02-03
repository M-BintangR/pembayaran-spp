import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import Sidebar from '@/Layouts/Sidebar'
import React, { useEffect } from 'react'
import HardTitle from '@/Components/HardTitle'
import { Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton'

const Edit = ({ item, petugas, spp }) => {
    const { data, setData, processing, errors, put } = useForm({
        id_petugas: '',
        id_spp: '',
        nisn: '',
        tgl_bayar: '',
        bulan_bayar: '',
        tahun_bayar: '',
        jumlah_bayar: '',
    });

    useEffect(() => {
        setData({ id_petugas: item?.id_petugas, id_spp: item?.id_spp, nisn: item.nisn, tgl_bayar: item?.tgl_bayar, bulan_bayar: item.bulan_bayar, tahun_bayar: item.tahun_bayar, jumlah_bayar: item.jumlah_bayar });
    }, [item])

    const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        put(route('pembayaran.update', item?.id));
    }



    return (
        <Sidebar active={'pembayaran'}>
            <HardTitle title={'Tambah Pembayaran'} subTitle={'Tambah data pembayaran'} />
            <form onSubmit={onHandleSubmit}>
                <div className='grid md:grid-cols-2 gap-x-3'>
                    <div className=''>
                        <div className='md:my-2'>
                            <InputLabel forInput="id_petugas" value="Petugas" />
                            <select
                                onChange={onHandleChange}
                                defaultValue={data.id_petugas}
                                className='border-gray-300 focus:border-purple-700 focus:ring-purple-700 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                                name="id_petugas"
                                id="id_petugas"
                            >
                                {petugas?.map((data, index) => {
                                    data.id === item?.id_petugas && (
                                        <option key={index} value={data?.id}>Rp {data?.nama_pengguna}</option>
                                    )
                                })}
                                {petugas?.map((data, index) => (
                                    <option key={index} value={data?.id}>{data?.nama_pengguna}</option>
                                ))}
                            </select>
                            <InputError message={errors.id_petugas} className="mt-2" />
                        </div>
                        <div className='md:my-2'>
                            <InputLabel forInput="id_spp" value="Nominal SPP" />
                            <select
                                onChange={onHandleChange}
                                defaultValue={data.id_spp}
                                className='border-gray-300 focus:border-purple-700 focus:ring-purple-700 rounded-md shadow-sm md:text-base text-xs block w-full'
                                name="id_spp"
                                id="id_spp"
                            >
                                {spp?.map((data, index) => {
                                    data.id === item?.id_spp && (
                                        <option key={index} value={data?.id}>Rp {data?.nominal}</option>
                                    )
                                })}
                                {spp?.map((data, index) => (
                                    <option key={index} value={data?.id}>Rp {data?.nominal}</option>
                                ))}
                            </select>
                            <InputError message={errors.id_spp} className="mt-2" />
                        </div>
                        <div className='md:my-2'>
                            <InputLabel forInput="nisn" value="NISN" />
                            <TextInput
                                id="nisn"
                                type="text"
                                name="nisn"
                                value={data.nisn}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                handleChange={onHandleChange}
                                placeholder={'NISN'}
                            />
                            <InputError message={errors.nisn} className="mt-2" />
                        </div>
                        <div className='md:my-2'>
                            <InputLabel forInput="jumlah_bayar" value="Jumlah Bayar" />
                            <TextInput
                                id="jumlah_bayar"
                                type="text"
                                name="jumlah_bayar"
                                value={data.jumlah_bayar}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                handleChange={onHandleChange}
                                placeholder={'Jumlah Bayar'}
                            />
                            <InputError message={errors.jumlah_bayar} className="mt-2" />
                        </div>
                    </div>
                    <div>
                        <div className='md:my-2'>
                            <InputLabel forInput="tgl_bayar" value="Tanggal Bayar" />
                            <TextInput
                                id="tgl_bayar"
                                type="date"
                                name="tgl_bayar"
                                value={data.tgl_bayar}
                                className="block w-full"
                                autoComplete="username"
                                isFocused={true}
                                handleChange={onHandleChange}
                                placeholder={'tgl_bayar'}
                            />
                            <InputError message={errors.tgl_bayar} className="mt-2" />
                        </div>
                        <div className='md:my-1'>
                            <InputLabel forInput="tahun_bayar" value="Tahun Bayar" />
                            <TextInput
                                id="tahun_bayar"
                                type="number"
                                name="tahun_bayar"
                                value={data.tahun_bayar}
                                className=" w-full"
                                autoComplete="username"
                                isFocused={true}
                                handleChange={onHandleChange}
                                placeholder={'Tahun Bayar'}
                            />
                            <InputError message={errors.tahun_bayar} className="mt-2" />
                        </div>
                        <div className='md:my-2'>
                            <InputLabel forInput="bulan_bayar" value="Bulan Bayar" />
                            <select
                                onChange={onHandleChange}
                                defaultValue={data.bulan_bayar}
                                className='border-gray-300 focus:border-purple-700 focus:ring-purple-700 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                                name="bulan_bayar"
                                id="bulan_bayar"
                            >
                                <option selected value={item?.bulan_bayar}>{item?.bulan_bayar}</option>
                                {month.map((item, i) => (
                                    <option key={i} value={item}>{item}</option>
                                ))}
                            </select>
                            <InputError message={errors.bulan_bayar} className="mt-2" />
                        </div>
                    </div>

                </div>
                <div className="mt-5">
                    <PrimaryButton processing={processing}>Rekam</PrimaryButton>
                    <Link className='duration-300 bg-gray-200 border border-gray-400 hover:border-purple-700 hover:bg-purple-700 hover:text-white md:py-2 md:rounded-md md:px-3' href={route('pembayaran.index')}>Kembali</Link>
                </div>
            </form>
        </Sidebar>
    )
}

export default Edit
