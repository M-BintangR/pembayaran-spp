import React, { useCallback, useState } from 'react'
import Navbar from './Navbar'
import { BsChevronDown } from 'react-icons/bs';

const Sidebar = ({ children, active }) => {
    const [open, setOpen] = useState(false);
    const [submenuOpen, setSubmenuOpen] = useState(false);

    const adminMenu = [
        {
            title: 'Dashboard',
            submenu: true,
            submenuItems: [
                { title: 'Home', link: '' },
                { title: 'Profil', link: '' },
                { title: 'Data User', link: '' },
            ],
        },
        { title: 'Data Mapel', link: '', spacing: true },
        { title: 'Data Guru', link: '' },
        { title: 'Data Siswa', link: '' },
        { title: 'Data Walas', link: '' },
        { title: 'Data Jurusan', link: '' },
        { title: 'Data Tapel', link: '' },
        { title: 'Data Kelas', link: '' },
    ];

    return (
        <div>
            <Navbar setOpen={setOpen} open={open} />
            <div className='pt-10'>
                <div className="flex flex-row flex-auto">
                    <div className={` bg-gray-200 h-full relative  ${open ? 'md:relative absolute md:w-1/4 w-1/2 duration-300' : 'w-1/8 duration-300'}`}>
                        {adminMenu.map((menu, index) => (
                            <div key={index} className={`bg-gray-200`}>
                                {menu.spacing && (
                                    <h2 className={`${menu.spacing && 'mt-5 mb-3'} font-medium text-xl gap-x-2 text-gray-200 duration-300 ${!open && 'scale-0'}`}>Kelola Data
                                    </h2>
                                )}
                                <button
                                    onClick={() => setOpen(prev => prev = true)}
                                >
                                    <li
                                        className={`text-gray-300 text-sm flex items-center ${active === menu.title && 'bg-light-with'} gap-x-4 cursor-pointer p-2 hover:bg-light-with rounded-md mt-2`}
                                        onClick={() => setSubmenuOpen(!submenuOpen)}
                                    >
                                        <span className='text-2xl block float-left'>
                                            <>
                                            </>
                                        </span>
                                        <span className={`text-base font-medium flex-1 duration-200 ${!open && 'hidden'}`}>{menu.title}
                                        </span>
                                        {menu.submenu && open && (
                                            <BsChevronDown className={`duration-300 ${!submenuOpen && 'rotate-180'}`} />
                                        )}
                                    </li>
                                </button>

                                {menu.submenu && submenuOpen && open && (
                                    <ul className='my-2 space-y-1 flex flex-col'>
                                        {menu.submenuItems.map((submenu, index) => (
                                            <button key={index}>
                                                <li className={`text-gray-300 text-sm flex ${active === submenu.title && 'bg-light-with'} items-center gap-x-4 cursor-pointer p-2 hover:bg-light-with rounded-md mx-5 duration-300`}
                                                    onClick={() => setOpen(prev => prev = true)}
                                                >
                                                    {submenu.title}
                                                </li>
                                            </button>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))

                        }
                        {/* <div className='mt-8 flex flex-col'>
                            <div className='w-full hover:bg-gray-300'>
                                <RxDashboard />
                                <h2 className='px-4 py-3 font-semibold hover:text-purple-700 md:block hidden'>Menu Utama</h2>
                            </div>
                            <div className='w-full hover:bg-gray-300'>
                                <h2 className='px-4 py-3 font-semibold hover:text-purple-700'>Menu Utama</h2>
                            </div>
                            <div className='w-full hover:bg-gray-300'>
                                <h2 className='px-4 py-3 font-semibold hover:text-purple-700'>Menu Utama</h2>
                            </div>
                            <div className='w-full hover:bg-gray-300'>
                                <h2 className='px-4 py-3 font-semibold hover:text-purple-700'>Menu Utama</h2>
                            </div>
                        </div> */}
                    </div>
                    <div className={`duration-300 ${open ? 'w-full' : ''}`}>
                        <div className='md:p-6 md:mt-3 p-3 md:text-base text-xs'>
                            <main className=''>
                                {children}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
