import React, { useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { BsChevronDown, BsCurrencyDollar } from 'react-icons/bs';
import { MdOutlineDashboardCustomize, MdOutlineSchool } from 'react-icons/md';
import { FaSchool, FaRegMoneyBillAlt, FaUserAlt } from 'react-icons/fa';
import { RiUserSettingsLine } from 'react-icons/ri';
import { Link } from '@inertiajs/react';
import Footer from './Footer';
import { menuSidebar } from '@/Components/url/url';

const Sidebar = ({ children, active, user }) => {
    const [open, setOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [targetActive, setTargetActive] = useState(false);
    const sidebarRef = useRef();

    useEffect(() => {
        setTargetActive(active);
    }, [active]);

    const filterMenu = menuSidebar.filter(menu => {
        if (Array.isArray(menu.role)) {
            return menu.role.includes(user?.level)
        }
        return menu.role.includes(user?.level);
    });


    return (
        <div>
            <Navbar setOpen={setOpen} open={open} sidebarRef={sidebarRef} user={user} />
            <div className='pt-10'>
                <div className="flex flex-row ">
                    <div ref={sidebarRef} className={` drop-shadow-md md:pt-24 pt-14 bg-gray-200 md:h-screen bottom-0 top-0 left-0 fixed duration-500  ${open ? 'md:fixed md:w-1/5 w-1/2 bottom-0 md:z-0 z-30' : 'w-12 fixed h-screen'}`}>
                        <div className="ml-2 mb-5">
                            <span className={`duration-500 ${open && 'rotate-[360deg]'} md:text-2xl text-base block float-left bg-amber-500 p-1 rounded-md text-white text-center mr-3`}>
                                <FaUserAlt />
                            </span>
                            <h1 className={`text-black origin-left font-semibold md:text-xl text-sm duration-300 ${!open && 'scale-0'}`}>{user?.nama_pengguna}</h1>
                            <p className={`${!open && 'scale-0'} md:text-base text-xs`}>{user?.level}</p>
                        </div>
                        {filterMenu.map((menu, index) => (
                            <div key={index}>
                                {menu?.spacing && user?.level === 'admin' && (
                                    <h2 className={`${menu?.spacing && 'mt-5 mb-3'} font-semibold md:text-xl text-md mx-3 text-slate-900 duration-300 ${!open && 'scale-0 scale-x-0 mx-0 mt-0 mb-0'}`}>Kelola Data
                                    </h2>
                                )}
                                <div className={`text-gray-900`}>
                                    <Link
                                        onClick={() => setOpen(prev => prev = true)}
                                        href={menu?.link}
                                    >
                                        <li
                                            className={`duration-200 text-sm flex items-center ${targetActive === menu.active && 'bg-gray-300 text-purple-700'} gap-x-4 cursor-pointer p-2 hover:bg-gray-300 rounded-md py-3`}
                                            onClick={(e) => { menu.submenu ? e.preventDefault() : ''; menu.submenu ? setSubmenuOpen(!submenuOpen) : ''; }}
                                        >
                                            <span className='md:text-2xl text-base block float-left bg-purple-700 p-1 rounded-md text-white text-center'>
                                                <>
                                                    {menu?.title === "Dashboard" ? (
                                                        <MdOutlineDashboardCustomize />
                                                    ) : null}

                                                    {menu?.title === "Transaksi Pembayaran" ? (
                                                        <BsCurrencyDollar />
                                                    ) : null}

                                                    {menu?.title === "Data Siswa" ? (
                                                        <MdOutlineSchool />
                                                    ) : null}

                                                    {menu?.title === "Data Kelas" ? (
                                                        <FaSchool />
                                                    ) : null}

                                                    {menu?.title === "Data Spp" ? (
                                                        <FaRegMoneyBillAlt />
                                                    ) : null}

                                                    {menu?.title === "Data Petugas" ? (
                                                        <RiUserSettingsLine />
                                                    ) : null}

                                                </>
                                            </span>
                                            <span className={`md:text-base text-xs md:font-semibold font-medium flex-1 duration-200 ${!open && 'hidden'}`}>{menu?.title}
                                            </span>
                                            {menu?.submenu && open && (
                                                <BsChevronDown className={`duration-300 ${!submenuOpen && 'rotate-180'}`} />
                                            )}
                                        </li>
                                    </Link>

                                    {menu.submenu && submenuOpen && open && (
                                        <ul className='my-2 space-y-1 flex flex-col'>
                                            {menu.submenuItems.map((submenu, index) => (
                                                <Link href={submenu?.link} key={index} className=''>
                                                    <li className={`hover:text-purple-700 text-sm flex ${targetActive === submenu.active && 'bg-gray-300'} items-center  cursor-pointer p-2 active:text-purple-700 rounded-md md:mx-14 mx-3 duration-300 md:text-base text-xs`}
                                                        onClick={() => setOpen(prev => prev = true)}
                                                    >
                                                        {submenu.title}
                                                    </li>
                                                </Link>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={`duration-300 w-full`}>
                        <div className={` md:p-6 md:mt-3 md:pl-[72px] pl-16 p-3 md:text-base text-xs ${open && 'md:pl-6'}`}>
                            <div className={`${open && 'md:relative fixed inset-0 bg-black md:bg-opacity-100 md:bg-none md:block bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-20'}`}></div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Sidebar
