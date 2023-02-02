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
        nama_kelas: '',
        kompetensi_keahlian: '',
        contoh: ''
    });

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(route('kelas.store'));
    }

    return (
        <Sidebar active={'kelas'}>
            <HardTitle title={'Tambah Kelas'} subTitle={'Tambah data kelas'} />
            <form onSubmit={onHandleSubmit}>
                <div className='md:w-1/2 w-full float-left'>
                    <div className='md:my-2'>
                        <InputLabel forInput="nama_kelas" value="Nama Kelas" />
                        <TextInput
                            id="nama_kelas"
                            type="text"
                            name="nama_kelas"
                            value={data.nama_kelas}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            handleChange={onHandleChange}
                            placeholder={'Nama Kelas'}
                        />
                        <InputError message={errors.nama_kelas} className="mt-2" />
                    </div>
                    <div className='my-2'>
                        <InputLabel forInput="kompetensi_keahlian" value="Kompetensi Keahlian" />
                        <TextInput
                            id="kompetensi_keahlian"
                            type="text"
                            name="kompetensi_keahlian"
                            value={data.kompetensi_keahlian}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            handleChange={onHandleChange}
                            placeholder={'Kompetensi Keahlian'}
                        />
                        <InputError message={errors.kompetensi_keahlian} className="mt-2" />
                    </div>
                    <div className="mt-5">
                        <PrimaryButton processing={processing}>Rekam</PrimaryButton>
                        <Link className='duration-300 bg-gray-200 border border-gray-400 hover:border-purple-700 hover:bg-purple-700 hover:text-white md:py-2 md:rounded-md md:px-3' href={route('kelas.index')}>Kembali</Link>
                    </div>
                </div>
            </form>
        </Sidebar>
    )
}

export default Create
