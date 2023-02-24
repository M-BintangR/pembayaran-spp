import Sidebar from '@/Layouts/Sidebar'
import React, { useState } from 'react'
import HardTitle from '@/Components/HardTitle'
import { Link, useForm } from '@inertiajs/react';
import swal from 'sweetalert'
import { month } from '@/Components/url/url';
import { MultiSelect } from "react-multi-select-component";
import InputError from '@/Components/InputError';
import { AiOutlineInfoCircle, AiOutlineWarning } from 'react-icons/ai';

const Create = ({ spp, user, siswa, kelas, bulan_bayar }) => {
    const [selected, setSelected] = useState([]);
    const [onAlert, setOnAlert] = useState(false);
    const [hideAlert, setHideAlert] = useState(true);

    const options = [
        { label: "Januari", value: "januari" },
        { label: "Februari", value: "februari" },
        { label: "Maret", value: "maret" },
        { label: "April", value: "april" },
        { label: "Mei", value: "mei" },
        { label: "Juni", value: "juni" },
        { label: "Juli", value: "juli" },
        { label: "Agustus", value: "agustus" },
        { label: "September", value: "september" },
        { label: "Oktober", value: "oktober" },
        { label: "November", value: "november" },
        { label: "Desember", value: "desember" },
    ];

    const { setData, post, errors } = useForm({
        id_petugas: '',
        id_spp: '',
        nisn: '',
        tgl_bayar: '',
        bulan_bayar: '',
        tahun_bayar: '',
        jumlah_bayar: '',
    });

    const onHandleTransaksi = (bulan) => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        setData({
            id_petugas: user?.id,
            id_spp: siswa?.id_spp,
            nisn: siswa?.nisn,
            tgl_bayar: yyyy + '-' + mm + '-' + dd,
            bulan_bayar: bulan,
            tahun_bayar: yyyy,
            jumlah_bayar: spp.toString(),
        });
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        swal({
            title: "Apakah Anda Yakin!",
            text: "Transaksi akan di lakukan!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((will) => {
            if (will) {
                post(route('pembayaran.store'), {
                    onSuccess: () => {
                        setOnAlert(true);
                        setHideAlert(true);
                        swal({
                            title: "Transaksi Telah Di Lakukan!",
                            icon: "success",
                        });
                    },
                    onError: (e) => {
                        console.log(e);
                        swal({
                            title: "Transaksi Gagal",
                            icon: "error",
                        });
                    },
                });
            } else {
                swal("Transaksi Batal!", "Transaksi tidak dilakukan");
            }
        });
    }

    return (
        <Sidebar active={'pembayaran'} user={user}>
            <HardTitle title={'Entri Pembayaran'} subTitle={'Entri Transaksi Pembayaran'} />
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-7 gap-5 md:mt-0 mt-5">
                <div className='flex gap-y-3 flex-col'>
                    {!onAlert && hideAlert ? (
                        <div className='bg-blue-200 mb-3 p-3 rounded-md'>
                            <div className='font-semibold mb-1 text-sm text-blue-700 relative'>
                                <AiOutlineInfoCircle className='inline-block mr-1' />
                                Info!
                                <button onClick={() => setHideAlert(false)} className='absolute right-0 -top-1 text-lg'>x</button>
                            </div>
                            <div className='text-blue-700 text-sm'>
                                Apabila data bulanan telah di bayar maka bulan tidak bisa lagi di bayar. Dan data tidak akan terkirim!
                            </div>
                        </div>
                    ) : onAlert && hideAlert ? (
                        <div className='bg-amber-200 mb-3 p-3 rounded-md'>
                            <div className='font-semibold mb-1 text-sm relative text-amber-700'>
                                <AiOutlineWarning className='inline-block mr-1' />
                                Warning!
                                <button onClick={() => setHideAlert(false)} className='float-right absolute right-0 -top-1 text-lg'>x</button>
                            </div>
                            <div className='text-amber-700 text-sm'>
                                Bulan telah di bayar! cek kembali bulanan bayar, yang anda kirim
                            </div>
                        </div>
                    ) : null}
                    <h1 className='md:text-lg text-sm font-semibold'>Data Siswa
                        <p className='md:text-sm text-xs font-normal'>Data siswa yang ingin membayar</p>
                    </h1>
                    <div>
                        <small>Nama</small>
                        <input
                            className='border-gray-200 bg-gray-100 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                            type="text"
                            name='nisn'
                            value={siswa?.nama}
                            disabled={true}
                        />
                    </div>
                    <div>
                        <small>NISN</small>
                        <input
                            className='border-gray-200 bg-gray-100 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                            type="text"
                            name='nisn'
                            value={siswa?.nisn}
                            disabled={true}
                        />
                    </div>
                    <div>
                        <small>Kelas</small>
                        <input
                            className='border-gray-200 bg-gray-100 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                            type="text"
                            name='nisn'
                            value={kelas}
                            disabled={true}
                        />
                    </div>
                    <div className='z-auto'>
                        <h1>Pilih Bulanan</h1>
                        <form onSubmit={onHandleSubmit}>
                            <MultiSelect
                                options={options}
                                value={selected}
                                onChange={setSelected}
                                labelledBy="Select"
                            />
                            <InputError message={errors?.bulan_bayar} className="mt-2" />
                            <div className='my-5'>
                                <button type='submit' onClick={() => onHandleTransaksi(selected)} className='duration-300 bg-purple-700 hover:bg-purple-500 text-white py-2 rounded-md mr-2 px-3'>Rekam</button>
                                <Link href={route('transaksi')} className='duration-300 bg-gray-200 border border-gray-400 hover:border-purple-700 hover:bg-purple-700 hover:text-white py-2 rounded-md px-3'>Kembali</Link>
                            </div>
                        </form>
                    </div>
                </div>
                <div className=''>
                    <p className='text-slate-500'>*catatan : jumlah pembayaran spp sebesar</p>
                    <h1 className='text-2xl font-bold'>Rp {spp ? spp.toLocaleString() : '0'}</h1>
                    <div>
                        <h3 className='mb-2 mt-5 text-gray-600'>*Pembayaran tiap bulan</h3>
                        <table className='w-full border-2 border-spacing-1'>
                            <thead>
                                <tr className='border-2 border-gray-300'>
                                    <td className='pl-3 py-3'>Pembayaran Bulanan</td>
                                    <td>Keteragan</td>
                                </tr>
                            </thead>
                            <tbody>
                                {month.map((mon, index) => {
                                    let match = false;
                                    for (const bulan of bulan_bayar) {
                                        if (bulan.toLowerCase() === mon.toLowerCase()) {
                                            match = true;
                                            break;
                                        }
                                    }
                                    return (
                                        <tr key={index} className='border-2 border-gray-300'>
                                            <td className='pl-3'>{mon}</td>
                                            <td>
                                                <button disabled={true} className={` py-1 px-2 rounded-md my-3 duration-300 ${match ? "bg-green-600 text-white border-2 border-green-700" : "bg-gray-200 text-gray-700 border-2 border-gray-400"}`}>
                                                    {match ? 's.bayar' : 'b.bayar'}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Sidebar >
    )
}

export default Create
