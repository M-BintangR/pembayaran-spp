import React from 'react'
import { month } from '@/Components/url/url'

const Kwitansi = ({ kelas, siswa }) => {
    setTimeout(() => {
        window.print();
    }, 500);


    return (
        <div className='bg-white my-5'>
            <h1 className='text-center text-2xl uppercase font-bold'>Laporan Pembayaran Spp Kelas {kelas?.nama_kelas}</h1>
            <p className='text-center text-sm uppercase'>SMK MUTIARA ILMU</p>
            <div className="border border-x-0 border-t-0 text-center mt-2 border-b-2 border-b-black text-sm">
                Jl. Goa Ria/Pa’bongkayya Laikang | Sudiang | Kel. Laikang | Kec. Biringkanaya | admin@mutiarailmu.sch.id
            </div>
            <div className='my-3 clear-both'>
                <table className="border border-black w-full">
                    <thead>
                        <tr>
                            <th className='border border-black text-sm px-1' rowSpan={2}>NO</th>
                            <th className='border border-black text-sm px-1' rowSpan={2}>Nama</th>
                            <th className='border border-black text-sm px-1' rowSpan={2}>NIS</th>
                            <th className='border border-black text-sm px-1 py-2' colSpan={12}>Pembayaran Bulanan</th>
                            <th className='border border-black text-sm px-1' rowSpan={2}>Total</th>
                        </tr>
                        <tr>
                            {month.map((mon, i) => (
                                <th className='border border-black text-sm py-2' key={i}>{mon.substring(0, 3)}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {siswa.map((item, i) => {
                            let paymentTotal = 0;
                            return (
                                <tr key={i} className='border border-black'>
                                    <td className='border border-black py-5 text-center text-xs'>{i + 1}</td>
                                    <td className='border border-black py-5 text-xs'>{item?.nama}</td>
                                    <td className='border border-black py-5 text-xs px-3'>{item?.nis}</td>
                                    {month.map((mon, j) => {
                                        let jumlah_bayar = 0;
                                        let match = false;
                                        for (const bulan of item?.pembayaran) {
                                            if (bulan.bulan_bayar.toLowerCase() === mon.toLowerCase()) {
                                                match = true;
                                                jumlah_bayar = bulan?.jumlah_bayar;
                                                paymentTotal += bulan?.jumlah_bayar;
                                                break;
                                            }
                                        }
                                        return (
                                            <td key={j} className="border border-black hover:bg-gray-100 px-2 truncate capitalize text-xs">{match ?
                                                `Rp ${jumlah_bayar.toLocaleString()},-` : 'Rp 0,-'
                                            }</td>
                                        )
                                    })}
                                    <td className="norder border-black hover:bg-gray-100 px-2 truncate capitalize text-xs" > {
                                        `Rp ${paymentTotal.toLocaleString()},-`
                                    }</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <table className='my-10 float-right clear-both'>
                    <tr>
                        <td className="text-center">
                            <p>Bendahara Sekolah,</p>
                        </td>
                    </tr>
                    <tr className='h-20'>
                    </tr>
                    <tr>
                        <td className='text-center font-bold'>Hasmawati S.pd</td>
                    </tr>
                </table>
            </div>
        </div >
    )
}

export default Kwitansi
