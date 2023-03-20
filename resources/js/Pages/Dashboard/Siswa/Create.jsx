import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import Sidebar from '@/Layouts/Sidebar'
import React from 'react'
import HardTitle from '@/Components/HardTitle'
import { Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton'
import swal from 'sweetalert'

const Create = ({ kelas, user }) => {
    const { data, setData, post, processing, errors } = useForm({
        nisn: '',
        nis: '',
        nama: '',
        jk: '',
        id_kelas: '',
        alamat: '',
        no_telp: '',
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(route('siswa.store'), {
            onSuccess: () => {
                swal({
                    title: "Data Siswa Berhasil Di Tambah",
                    icon: "success",
                });
            }
        });
    }

    return (
        <Sidebar active={'siswa'} user={user}>
            <HardTitle title={'Tambah Siswa'} subTitle={'Tambah data siswa'} />
            <form onSubmit={onHandleSubmit}>
                <div className='grid md:grid-cols-2 gap-x-3'>
                    <div className=''>
                        <div className='my-2'>
                            <InputLabel forInput="nama" value="Nama Siswa" />
                            <TextInput
                                id="nama"
                                type="text"
                                name="nama"
                                value={data.nama}
                                className="block w-full"
                                autoComplete="username"
                                isFocused={false}
                                handleChange={onHandleChange}
                                placeholder={'Masukkan Nama Siswa'}
                            />
                            <InputError message={errors.nama} className="mt-2" />
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
                                isFocused={false}
                                handleChange={onHandleChange}
                                placeholder={'Masukkan NISN'}
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
                                isFocused={false}
                                handleChange={onHandleChange}
                                placeholder={'Masukkan NIS'}
                            />
                            <InputError message={errors.nis} className="mt-2" />
                        </div>
                        <div className='my-2'>
                            <InputLabel forInput="alamat" value="Alamat Siswa" />
                            <textarea
                                onChange={onHandleChange}
                                value={data?.alamat}
                                style={{ resize: 'none' }}
                                className='border-gray-300 focus:border-purple-700 focus:ring-purple-700 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                                name="alamat"
                                id="alamat"
                            >
                            </textarea>
                            <InputError message={errors.alamat} className="mt-2" />
                        </div>
                    </div>
                    <div>
                        <div className='my-2'>
                            <InputLabel forInput="id_kelas" value="Pilih Kelas" />
                            <select
                                onChange={onHandleChange}
                                value={data?.id_kelas}
                                autoFocus
                                className='border-gray-300 focus:border-purple-700 focus:ring-purple-700 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                                name="id_kelas"
                                id="id_kelas"
                            >
                                <option>-- Pilih Kelas --</option>
                                {kelas?.map((data, index) => (
                                    <option key={index} value={data?.id}>{data?.nama_kelas}</option>
                                ))}
                            </select>
                            <InputError message={errors.id_kelas} className="mt-2" />
                        </div>
                        <div className='my-2'>
                            <InputLabel forInput="jk" value="Jenis Kelamin" />
                            <select
                                onChange={onHandleChange}
                                value={data?.jk}
                                className='border-gray-300 focus:border-purple-700 focus:ring-purple-700 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                                name="jk"
                                id="jk"
                            >
                                <option>-- Jenis Kelamin --</option>
                                <option value={'p'}>Perempuan</option>
                                <option value={'l'}>Laki-laki</option>
                            </select>
                            <InputError message={errors.jk} className="mt-2" />
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
                                isFocused={false}
                                handleChange={onHandleChange}
                                placeholder={'Masukkan No Telp Siswa'}
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

export default Create
