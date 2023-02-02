import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import Sidebar from '@/Layouts/Sidebar'
import React from 'react'
import HardTitle from '@/Components/HardTitle'
import { Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton'

const Create = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        id_petugas: '',
        id_spp: '',
        nisn: '',
        tgl_bayar: '',
        bulan_bayar: '',
        tahun_bayar: '',
        jumlah_bayar: '',
    });

    const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(route('pembayaran.store'));
    }
    return (
        <Sidebar active={'pembayaran'}>
            <HardTitle title={'Tambah Pembayaran'} subTitle={'Tambah data pembayaran'} />
            <form onSubmit={onHandleSubmit}>
                <div className='grid-cols-2 grid-flow-col'>
                    <div>
                        <div className='md:my-2'>
                            <InputLabel forInput="id_petugas" value="Petugas" />
                            <select
                                value={data.id_petugas}
                                className='border-gray-300 focus:border-purple-700 focus:ring-purple-700 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                                name="id_petugas" id="id_petugas"
                            >
                                <option ></option>
                            </select>
                            <InputError message={errors.id_petugas} className="mt-2" />
                        </div>
                        <div className='md:my-2'>
                            <InputLabel forInput="id_spp" value="Nominal SPP" />
                            <select
                                value={data.id_spp}
                                className='border-gray-300 focus:border-purple-700 focus:ring-purple-700 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                                name="id_spp" id="id_spp"
                            >
                                <option ></option>
                            </select>
                            <InputError message={errors.id_spp} className="mt-2" />
                        </div>
                        <div className='my-2'>
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
                    </div>
                    <div>
                        <div className='my-2'>
                            <InputLabel forInput="tgl_bayar" value="Tanggal Bayar" />
                            <TextInput
                                id="tgl_bayar"
                                type="date"
                                name="tgl_bayar"
                                value={data.tgl_bayar}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                handleChange={onHandleChange}
                                placeholder={'tgl_bayar'}
                            />
                            <InputError message={errors.tgl_bayar} className="mt-2" />
                        </div>
                        <div className='my-2'>
                            <InputLabel forInput="tahun_bayar" value="Tahun Bayar" />
                            <TextInput
                                id="tahun_bayar"
                                type="number"
                                name="tahun_bayar"
                                value={data.tahun_bayar}
                                className="mt-1 block w-full"
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
                                value={data.bulan_bayar}
                                className='border-gray-300 focus:border-purple-700 focus:ring-purple-700 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                                name="bulan_bayar" id="bulan_bayar"
                            >
                                {month.map((item, i) => (
                                    <option key={i}>{item}</option>
                                ))}
                            </select>
                            <InputError message={errors.bulan_bayar} className="mt-2" />
                        </div>
                    </div>

                </div>
                <div className="mt-5">
                    <PrimaryButton processing={processing}>Rekam</PrimaryButton>
                    <Link className='duration-300 bg-gray-200 border border-gray-400 hover:border-purple-700 hover:bg-purple-700 hover:text-white md:py-2 md:rounded-md md:px-3' href={route('kelas.index')}>Kembali</Link>
                </div>
            </form>
        </Sidebar>
    )
}

export default Create
