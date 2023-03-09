import React from 'react'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import PrimaryButton from '@/Components/PrimaryButton'


export const DataCreate = ({ onHandleSubmit, data, errors, onHandleChange, processing, onHandleModal }) => {
    return (
        <div>
            <form onSubmit={onHandleSubmit}>
                <div className='md:my-2'>
                    <InputLabel forInput="username" value="Username" />
                    <TextInput
                        id="username"
                        type="text"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                        placeholder={'Username'}
                    />
                    <InputError message={errors.username} className="mt-2" />
                </div>
                <div className='my-2'>
                    <InputLabel forInput="nama_pengguna" value="Nama Pengguna" />
                    <TextInput
                        id="nama_pengguna"
                        type="text"
                        name="nama_pengguna"
                        value={data.nama_pengguna}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={false}
                        handleChange={onHandleChange}
                        placeholder={'Nama Pengguna'}
                    />
                    <InputError message={errors.nama_pengguna} className="mt-2" />
                </div>
                <div className='md:my-2'>
                    <InputLabel forInput="level" value="Peran/Role" />
                    <select
                        onChange={onHandleChange}
                        defaultValue={data.level}
                        className='border-gray-300 focus:border-purple-700 focus:ring-purple-700 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                        name="level"
                        id="level"
                    >
                        <option>-- Pilih Peran --</option>
                        <option value='admin'>Admin</option>
                        <option value='petugas'>Petugas</option>
                    </select>
                    <InputError message={errors.level} className="mt-2" />
                </div>
                <div className='my-2'>
                    <InputLabel forInput="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={false}
                        handleChange={onHandleChange}
                        placeholder={'Password Petugas'}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="md:mt-5 mt-10">
                    <PrimaryButton processing={processing}>Rekam</PrimaryButton>
                    <button
                        onClick={onHandleModal}
                        className='duration-300 bg-gray-200 border border-gray-400 hover:border-purple-700 hover:bg-purple-700 hover:text-white py-2 rounded-md px-3' href={route('kelas.index')}
                    >
                        Batal
                    </button>
                </div>
            </form>
        </div>
    )
}

export const DataEdit = ({ onHandleSubmit, data, errors, onHandleChange, processing, onHandleModal }) => {
    return (
        <div>
            <form onSubmit={onHandleSubmit}>
                <div className='md:my-2'>
                    <InputLabel forInput="username" value="Username" />
                    <TextInput
                        id="username"
                        type="text"
                        name="username"
                        value={data.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                        placeholder={'Username'}
                    />
                    <InputError message={errors.username} className="mt-2" />
                </div>
                <div className='my-2'>
                    <InputLabel forInput="nama_pengguna" value="Nama Pengguna" />
                    <TextInput
                        id="nama_pengguna"
                        type="text"
                        name="nama_pengguna"
                        value={data.nama_pengguna}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={false}
                        handleChange={onHandleChange}
                        placeholder={'Nama Pengguna'}
                    />
                    <InputError message={errors.nama_pengguna} className="mt-2" />
                </div>
                <div className='md:my-2'>
                    <InputLabel forInput="level" value="Peran/Role" />
                    <select
                        onChange={onHandleChange}
                        defaultValue={data.level}
                        className='border-gray-300 focus:border-purple-700 focus:ring-purple-700 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                        name="level"
                        id="level"
                    >
                        <option value='admin'>Admin</option>
                        <option value='petugas'>Petugas</option>
                    </select>
                    <InputError message={errors.level} className="mt-2" />
                </div>
                <div className="md:mt-5 mt-10">
                    <PrimaryButton processing={processing}>Rekam</PrimaryButton>
                    <button
                        onClick={onHandleModal}
                        className='duration-300 bg-gray-200 border border-gray-400 hover:border-purple-700 hover:bg-purple-700 hover:text-white py-2 rounded-md px-3' href={route('kelas.index')}
                    >
                        Batal
                    </button>
                </div>
            </form>
        </div>
    )
}

