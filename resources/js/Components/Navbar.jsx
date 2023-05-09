import React, { useCallback, useEffect, useState, useRef } from 'react'
import { AiOutlineMenu, AiOutlineProfile } from 'react-icons/ai';
import { IoMdArrowDropdown } from 'react-icons/io';
import { CgLogOut, CgProfile } from 'react-icons/cg';
import { Link } from '@inertiajs/react';
import logo from '../Components/img/logoWeb2.png'

const Navbar = ({ onOpenMenu, sidebarRef, user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleRef = useRef();
    const btnDropdownRef = useRef();
    const dropdownRef = useRef();

    const handleOpenDropdown = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, []);

    const handleClickOutside = (e) => {
        if (!sidebarRef.current.contains(e.target) && !toggleRef.current.contains(e.target)) {
            setOpen(false);
        }
        if (!btnDropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    }

    return (
        <div>
            <div className='w-screen bg-purple-700 text-white p-2 fixed shadow-xl z-50'>
                <div className='inline-block ' ref={toggleRef} >
                    <AiOutlineMenu className='md:mr-3 mr-2 relative md:top-1 top-1 md:p-2 p-1 md:text-xl text-xs box-content hover:bg-purple-400 hover:rounded-md duration-300' onClick={onOpenMenu} />
                </div>
                <div className="md:text-xl text-xs font-semibold inline-block relative md:top-0 -top-1">
                    <img className='inline-block mr-3 float-left md:w-[50px] w-[30px] relative md:top-2 top-0' src={logo} alt="logo website" />
                    <h1 className='inline-block md:text-base text-xs'>Aplikasi Transaksi Spp</h1>
                    <p className={`md:text-xs md:block hidden`}>solusi cerdas dalam transaksi</p>
                </div>
                <div className='md:text-base text-xs float-right inline-block relative md:top-2 top-1 md:mr-3'>
                    <button ref={btnDropdownRef} className='cursor-pointer' onClick={handleOpenDropdown}>
                        {user ? (
                            <p>{user.username}</p>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </button>
                    <IoMdArrowDropdown className={`duration-300 inline-block ml-1 ${isOpen ? 'rotate-180' : ''}`} />

                    {isOpen ? (
                        <div ref={dropdownRef} className='absolute right-2 md:top-9 top-7 bg-white text-slate-900 w-40 rounded-md border-2 shadow-lg'>
                            <ul className='cursor-pointer md:text-base text-xs font-semibold'>
                                <li>
                                    <Link
                                        href={route('logout')}
                                        as='button'
                                        method='post'
                                        className='duration-300 hover:bg-purple-500 hover:text-white w-full text-left px-2 md:py-1 py-2 rounded-t-md'>Keluar
                                        <CgLogOut className='inline-block float-right mt-1 mr-1 md:text-lg text-sm' />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route('profile')}
                                        as='button'
                                        className='duration-300 hover:bg-purple-500 hover:text-white w-full text-left px-2 md:py-1 py-2'>Profil
                                        <CgProfile className='inline-block float-right mt-1 mr-1 md:text-lg text-sm' />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route('dashboard')}
                                        as={'button'}
                                        className='duration-300 hover:bg-purple-500 hover:text-white w-full text-left px-2 md:py-1 py-2 rounded-b-md'>Menu Utama
                                        <AiOutlineProfile className='inline-block float-right mt-1 mr-1 md:text-lg text-sm' />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default Navbar
