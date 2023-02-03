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
                    <InputLabel forInput="nama_kelas" value="Nama Kelas" />
                    <TextInput
                        id="nama_kelas"
                        type="text"
                        name="nama_kelas"
                        value={data.nama_kelas}
                        className="mt-1 block w-full"
                        autoComplete="nama_kelas"
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
                    <InputLabel forInput="nama_kelas" value="Nama Kelas" />
                    <TextInput
                        id="nama_kelas"
                        type="text"
                        name="nama_kelas"
                        value={data.nama_kelas}
                        className="mt-1 block w-full"
                        autoComplete="nama_kelas"
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

