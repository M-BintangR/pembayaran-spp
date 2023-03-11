import React, { useEffect, useState } from 'react'
import { BsCurrencyDollar } from 'react-icons/bs';
import { MdOutlineDashboardCustomize, MdOutlineSchool } from 'react-icons/md';
import { FaSchool, FaRegMoneyBillAlt } from 'react-icons/fa';
import { RiUserSettingsLine } from 'react-icons/ri';


export const CardAdmin = ({ dataCards, items }) => {
    const [kelas, setKelas] = useState(0);
    const [siswa, setSiswa] = useState(0);
    const [spp, setSpp] = useState(0);
    const [pembayaran, setPembayaran] = useState(0);
    const [petugas, setPetugas] = useState(0);

    const zeroToValue = (callback, target, intervalId) => {
        callback(prev => {
            if (prev >= target) {
                clearInterval(intervalId);
                return prev;
            }
            return prev + 1;
        });
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            zeroToValue(setPembayaran, items.pembayaran, intervalId);
        }, 10);
        return () => clearInterval(intervalId);
    }, [items]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            zeroToValue(setKelas, items.kelas, intervalId);
        }, 10);
    }, [items]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            zeroToValue(setPetugas, items.petugas, intervalId);
        }, 10);
    }, [items]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            zeroToValue(setSpp, items.spp, intervalId);
        }, 10);
    }, [items]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            zeroToValue(setSiswa, items.siswa, intervalId);
        }, 10);
    }, [items]);



    return (
        <div className="grid mb-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {dataCards.map((card, index) => (
                <div key={index} className="bg-slate-100 p-3 flex justify-start rounded-md">
                    <div className="flex justify-center">
                        <div className={`${card.bgColor} jutify-self-start self-center text-white md:p-2 p-2 rounded-md mr-4`}>
                            {
                                card?.title === 'Dashboard' ? (
                                    <MdOutlineDashboardCustomize className='md:text-4xl text-base' />
                                ) : card?.title === 'Data Pembayaran' ? (
                                    <BsCurrencyDollar className='md:text-4xl text-base' />
                                ) : card?.title === 'Data Siswa' ? (
                                    <MdOutlineSchool className='md:text-4xl text-base' />
                                ) : card?.title === 'Data Kelas' ? (
                                    <FaSchool className='md:text-4xl text-base' />
                                ) : card?.title === 'Data Spp' ? (
                                    <FaRegMoneyBillAlt className='md:text-4xl text-base' />
                                ) : card?.title === 'Data Petugas' ? (
                                    <RiUserSettingsLine className='md:text-4xl text-base' />
                                ) : null
                            }
                        </div>
                        <div className="flex flex-col flex-wrap">
                            <div className='font-semibold md:text-base text-sm text-slate-800'>{card?.title}</div>
                            {
                                card?.data === 'kelas' ? (
                                    <div className={`md:text-lg text-xs font-bold ${card.textColor}`}>{kelas}</div>
                                ) : card?.data === 'siswa' ? (
                                    <div className={`md:text-lg text-xs font-bold ${card.textColor}`}>{siswa}</div>
                                ) : card?.data === 'petugas' ? (
                                    <div className={`md:text-lg text-xs font-bold ${card.textColor}`}>{petugas}</div>
                                ) : card?.data === 'pembayaran' ? (
                                    <div className={`md:text-lg text-xs font-bold ${card.textColor}`}>{pembayaran}</div>
                                ) : card?.data === 'spp' ? (
                                    <div div className={`md:text-lg text-xs font-bold ${card.textColor}`}>{spp}</div>
                                ) : null
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div >
    )
}

export const CardPetugas = ({ dataSpp }) => {
    return (
        <div className='flex flex-col md:flex-row gap-x-4 gap-y-3'>
            {dataSpp.map((spp, index) => {
                let totalPembayaran = 0;
                let totalTunggakan = spp.nominal * spp.siswa.length * 12;
                for (const pembayaran of spp.pembayaran) {
                    totalPembayaran += pembayaran.jumlah_bayar;
                    totalTunggakan -= pembayaran.jumlah_bayar;
                    if (totalTunggakan <= 0) {
                        totalTunggakan = 0;
                    }
                }

                return (
                    <div key={index} className='bg-slate-100 rounded-md'>
                        <div className='py-3 px-5 text-[15px] md:text-2xl font-semibold capitalize'>Kelas {spp?.level}
                            <div className='float-right ml-20'>Rp {spp?.nominal.toLocaleString()},-</div>
                        </div>
                        <div className='py-3 px-5 border-t-[3px] border-slate-500'>
                            <div className='bg-slate'>
                                <div className='text-md'>
                                    <div>Jumlah Pembayaran Kelas</div>
                                    <div className='font-bold md:text-xl text-md my-2 inline-block bg-amber-400 '>Rp {totalPembayaran.toLocaleString()},-</div>
                                </div>
                            </div>
                        </div>
                        <div className='py-3 px-5 border-t-[3px] border-slate-500'>
                            <div className='bg-slate'>
                                <div className='text-md'>
                                    <div>Tunggakan Pembayaran Kelas</div>
                                    <div className='font-bold md:text-xl text-md my-2 inline-block bg-amber-400 '>Rp{totalTunggakan.toLocaleString()},-</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

