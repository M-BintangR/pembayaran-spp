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
                    <InputLabel forInput="nominal" value="Nominal Spp" />
                    <TextInput
                        id="nominal"
                        type="text"
                        name="nominal"
                        value={data.nominal}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                        placeholder={'200000'}
                    />
                    <InputError message={errors.nominal} className="mt-2" />
                </div>
                <div className='my-2'>
                    <InputLabel forInput="tahun" value="Tahun" />
                    <TextInput
                        id="tahun"
                        type="text"
                        name="tahun"
                        value={data.tahun}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                        placeholder={'2023'}
                    />
                    <InputError message={errors.tahun} className="mt-2" />
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
                    <InputLabel forInput="nominal" value="Nominal Spp" />
                    <TextInput
                        id="nominal"
                        type="text"
                        name="nominal"
                        value={data.nominal}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                        placeholder={'Nominal Spp'}
                    />
                    <InputError message={errors.nominal} className="mt-2" />
                </div>
                <div className='my-2'>
                    <InputLabel forInput="tahun" value="Tahun" />
                    <TextInput
                        id="tahun"
                        type="text"
                        name="tahun"
                        value={data.tahun}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        handleChange={onHandleChange}
                        placeholder={'Tahun'}
                    />
                    <InputError message={errors.tahun} className="mt-2" />
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

