import Sidebar from '@/Layouts/Sidebar'
import React from 'react'
import HardTitle from '@/Components/HardTitle'
import { useForm } from '@inertiajs/react';
import swal from 'sweetalert'
import { month } from '@/Components/url/url';

const Create = ({ spp, user, siswa, kelas, bulan_bayar }) => {
    const { setData, post } = useForm({
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
        await swal({
            title: "Apakah Anda Yakin!",
            text: "Transaksi akan di lakukan!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((will) => {
            if (will) {
                post(route('pembayaran.store'), {
                    onSuccess: () => {
                        swal({
                            title: "Transaksi Berhasil",
                            icon: "success",
                        });
                    },
                    onError: () => {
                        swal({
                            title: "Transaksi Gagal",
                            icon: "error",
                        });
                    }
                });
            } else {
                swal("Transaksi batal");
            }
        });
    }

    return (
        <Sidebar active={'pembayaran'} user={user}>
            <HardTitle title={'Entri Pembayaran'} subTitle={'Entri Transaksi Pembayaran'} />
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-7 gap-5 md:mt-0 mt-5">
                <div className='flex gap-y-3 flex-col'>
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
                </div>
                <div className=''>
                    <p className='text-slate-500'>*catatan : jumlah pembayaran spp sebesar</p>
                    <h1 className='text-2xl font-bold'>Rp {spp ? spp.toLocaleString() : '0'}</h1>
                    <div>
                        <h3 className='mb-2 mt-5 text-gray-600'>*Pilih Bulan Yang Belum Di Bayar</h3>
                        <form onSubmit={onHandleSubmit}>
                            <table className='w-full border-2 border-spacing-1'>
                                <tr className='border-2 border-gray-300'>
                                    <td className='pl-3 py-3'>Bulan Pembayaran</td>
                                    <td>Transaksi Siswa</td>
                                </tr>
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
                                                <button disabled={match} type='submit' onClick={() => onHandleTransaksi(mon)} className={` text-white py-1 px-2 rounded-md my-3 ${match ? "bg-green-600" : "bg-red-600"}`}>
                                                    {match ? 's.bayar' : 'b.bayar'}
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </Sidebar >
    )
}

export default Create
