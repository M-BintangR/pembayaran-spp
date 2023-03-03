import React, { useEffect, useState } from 'react'
import { BsCurrencyDollar } from 'react-icons/bs';
import { MdOutlineDashboardCustomize, MdOutlineSchool } from 'react-icons/md';
import { FaSchool, FaRegMoneyBillAlt } from 'react-icons/fa';
import { RiUserSettingsLine } from 'react-icons/ri';
import { forEach, sum } from 'lodash';


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
        }, 80);
        return () => clearInterval(intervalId);
    }, [items]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            zeroToValue(setKelas, items.kelas, intervalId);
        }, 80);
    }, [items]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            zeroToValue(setPetugas, items.petugas, intervalId);
        }, 80);
    }, [items]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            zeroToValue(setSpp, items.spp, intervalId);
        }, 80);
    }, [items]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            zeroToValue(setSiswa, items.siswa, intervalId);
        }, 80);
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

export const CardPetugas = ({ dataCardsPetugas, kelasX, kelasXI, kelasXII }) => {
    return (
        <div></div>
        // <div className="grid mb-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        //     {dataCardsPetugas.map((card, index) => (
        //         <div key={index} className="bg-slate-100 p-3 flex justify-start rounded-md">
        //             <div className="flex justify-center">
        //                 <div className={`${card.bgColor} jutify-self-start self-center text-white md:p-2 p-2 rounded-md mr-4`}>
        //                     {
        //                         card?.title === 'X' ? (
        //                             <div className='text-xl font-bold px-3 py-2 box-border'>X</div>
        //                         ) : card?.title === 'XI' ? (
        //                             <div className='text-xl font-bold px-3 py-2 box-border'>XI</div>
        //                         ) : card?.title === 'XII' ? (
        //                             <div className='text-xl font-bold px-3 py-2 box-border'>XII</div>
        //                         ) : null
        //                     }
        //                 </div>
        //                 <div className="flex flex-col flex-wrap">
        //                     <div className='font-semibold md:text-base text-sm text-slate-800'>Kelas {card?.title}</div>
        //                     {
        //                         card?.data === 'X' ? (
        //                             <div className={`md:text-lg text-xs font-bold ${card.textColor}`}>Kelas</div>
        //                         ) : card?.data === 'XI' ? (
        //                             <div className={`md:text-lg text-xs font-bold ${card.textColor}`}>Kelas</div>
        //                         ) : card?.data === 'XII' ? (
        //                             <div className={`md:text-lg text-xs font-bold ${card.textColor}`}>Kelas</div>
        //                         ) : null
        //                     }
        //                 </div>
        //             </div>
        //         </div>
        //     ))}
        // </div >
    )
}

