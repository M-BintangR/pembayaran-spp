import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import Sidebar from '@/Layouts/Sidebar'
import React, { useEffect } from 'react'
import HardTitle from '@/Components/HardTitle'
import { Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton'
import swal from 'sweetalert'

const Edit = ({ item, kelas, spp }) => {
    const { data, setData, processing, errors, put } = useForm({
        nisn: '',
        nis: '',
        nama: '',
        id_kelas: '',
        id_spp: '',
        alamat: '',
        no_telp: '',
    });

    useEffect(() => {
        setData({ nama: item?.nama, nisn: item?.nisn, nis: item?.nis, id_kelas: item?.id_kelas, id_spp: item?.id_spp, alamat: item?.alamat, no_telp: item?.no_telp });
    }, [item]);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        put(route('siswa.update', item?.id), {
            onSuccess: () => {
                swal({
                    title: "Data Siswa Berhasil Di Edit",
                    icon: "success",
                });
            }
        });
    }


    return (
        <Sidebar active={'siswa'}>
            <HardTitle title={'Edit Siswa'} subTitle={'Edit data siswa'} />
            <form onSubmit={onHandleSubmit}>
                <div className='grid md:grid-cols-2 gap-x-3'>
                    <div className=''>
                        <div className='my-2'>
                            <InputLabel forInput="id_kelas" value="Pilih Kelas" />
                            <select
                                onChange={onHandleChange}
                                defaultValue={data.id_kelas}
                                className='border-gray-300 focus:border-purple-700 focus:ring-purple-700 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                                name="id_kelas"
                                id="id_kelas"
                            >
                                {kelas?.map((data, index) => {
                                    data.id === item?.id_kelas ? (
                                        <option selected key={index} value={data?.id}>{data?.nama_kelas}</option>
                                    ) : null
                                })}
                                {kelas?.map((data, index) => (
                                    <option key={index} value={data?.id}>{data?.nama_kelas}</option>
                                ))}
                            </select>
                            <InputError message={errors.id_kelas} className="mt-2" />
                        </div>
                        <div className='my-2'>
                            <InputLabel forInput="id_spp" value="Nominal SPP" />
                            <select
                                onChange={onHandleChange}
                                defaultValue={data.id_spp}
                                className='border-gray-300 focus:border-purple-700 focus:ring-purple-700 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                                name="id_spp"
                                id="id_spp"
                            >
                                {spp?.map((data, index) => {
                                    data.id === item?.id_spp ? (
                                        <option selected key={index} value={data?.id}>Rp {data?.nominal}</option>
                                    ) : null
                                })}
                                {spp?.map((data, index) => (
                                    <option key={index} value={data?.id}>Rp {data?.nominal}</option>
                                ))}
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
                        <div className='my-2'>
                            <InputLabel forInput="nis" value="NIS" />
                            <TextInput
                                id="nis"
                                type="text"
                                name="nis"
                                value={data.nis}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                handleChange={onHandleChange}
                                placeholder={'NIS'}
                            />
                            <InputError message={errors.nis} className="mt-2" />
                        </div>
                    </div>
                    <div>
                        <div className='my-2'>
                            <InputLabel forInput="nama" value="Nama Siswa" />
                            <TextInput
                                id="nama"
                                type="text"
                                name="nama"
                                value={data.nama}
                                className="block w-full"
                                autoComplete="username"
                                isFocused={true}
                                handleChange={onHandleChange}
                                placeholder={'Nama Siswa'}
                            />
                            <InputError message={errors.nama} className="mt-2" />
                        </div>
                        <div className='my-2'>
                            <InputLabel forInput="alamat" value="Alamat Siswa" />
                            <TextInput
                                id="alamat"
                                type="text"
                                name="alamat"
                                value={data.alamat}
                                className=" w-full"
                                autoComplete="username"
                                isFocused={true}
                                handleChange={onHandleChange}
                                placeholder={'Alamat Siswa'}
                            />
                            <InputError message={errors.alamat} className="mt-2" />
                        </div>
                        <div className='my-2'>
                            <InputLabel forInput="no_telp" value="No Telp" />
                            <TextInput
                                id="no_telp"
                                type="number"
                                name="no_telp"
                                value={data.no_telp}
                                className=" w-full"
                                autoComplete="username"
                                isFocused={true}
                                handleChange={onHandleChange}
                                placeholder={'No Telp'}
                            />
                            <InputError message={errors.no_telp} className="mt-2" />
                        </div>

                    </div>

                </div>
                <div className="md:mt-5 mt-3 mb-5">
                    <PrimaryButton processing={processing}>Rekam</PrimaryButton>
                    <Link className='duration-300 bg-gray-200 border border-gray-400 hover:border-purple-700 hover:bg-purple-700 hover:text-white py-2 rounded-md px-3' href={route('siswa.index')}>Kembali</Link>
                </div>
            </form>
        </Sidebar>
    )
}

export default Edit
