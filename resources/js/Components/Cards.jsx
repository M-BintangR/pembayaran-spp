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
        }, 200);
        return () => clearInterval(intervalId);
    }, [items]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            zeroToValue(setKelas, items.kelas, intervalId);
        }, 200);
    }, [items]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            zeroToValue(setPetugas, items.petugas, intervalId);
        }, 200);
    }, [items]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            zeroToValue(setSpp, items.spp, intervalId);
        }, 200);
    }, [items]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            zeroToValue(setSiswa, items.siswa, intervalId);
        }, 200);
    }, [items]);



    return (
        <div className="grid mb-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {dataCards.map((card, index) => {
                return (
                    <div key={index} className="bg-slate-100 p-3 flex justify-start rounded-md">
                        <div className="flex justify-center">
                            <div className={`${card?.bgColor} jutify-self-start self-center text-white md:p-2 p-2 rounded-md mr-4`}>
                                {card?.title === "Dashboard" ? (
                                    <MdOutlineDashboardCustomize className='md:text-4xl text-base' />
                                ) : null}

                                {card?.title === "Data Pembayaran" ? (
                                    <BsCurrencyDollar className='md:text-4xl text-base' />
                                ) : null}

                                {card?.title === "Data Siswa" ? (
                                    <MdOutlineSchool className='md:text-4xl text-base' />
                                ) : null}

                                {card?.title === "Data Kelas" ? (
                                    <FaSchool className='md:text-4xl text-base' />
                                ) : null}

                                {card?.title === "Data Spp" ? (
                                    <FaRegMoneyBillAlt className='md:text-4xl text-base' />
                                ) : null}

                                {card?.title === "Data Petugas" ? (
                                    <RiUserSettingsLine className='md:text-4xl text-base' />
                                ) : null}

                            </div>
                            <div className="flex flex-col flex-wrap">
                                <div className='font-semibold md:text-base text-sm text-slate-800'>{card?.title}</div>
                                {card?.data === 'kelas' ? (
                                    <div className={`md:text-lg text-xs font-bold ${card?.textColor}`}>{kelas}</div>
                                ) : null}
                                {card?.data === 'siswa' ? (
                                    <div className={`md:text-lg text-xs font-bold ${card?.textColor}`}>{siswa}</div>
                                ) : null}
                                {card?.data === 'petugas' ? (
                                    <div className={`md:text-lg text-xs font-bold ${card?.textColor}`}>{petugas}</div>
                                ) : null}
                                {card?.data === 'pembayaran' ? (
                                    <div className={`md:text-lg text-xs font-bold ${card?.textColor}`}>{pembayaran}</div>
                                ) : null}
                                {card?.data === 'spp' ? (
                                    <div div className={`md:text-lg text-xs font-bold ${card?.textColor}`}>{spp}</div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div >
    )
}

