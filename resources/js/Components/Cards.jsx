import React from 'react'
import { BsCurrencyDollar } from 'react-icons/bs';
import { MdOutlineDashboardCustomize, MdOutlineSchool } from 'react-icons/md';
import { FaSchool, FaRegMoneyBillAlt } from 'react-icons/fa';
import { RiUserSettingsLine } from 'react-icons/ri';

export const CardAdmin = ({ dataCards }) => {
    return (
        <div className="grid mb-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {dataCards.map((card, index) => (
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
                            <div className={`md:text-lg text-xs font-bold ${card?.textColor}`}>{card?.jumlah}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

