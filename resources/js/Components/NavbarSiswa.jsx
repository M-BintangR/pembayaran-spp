import React from 'react'
import logo from '../Components/img/logoWeb2.png'

const NavbarSiswa = ({ children }) => {
    return (
        <div>
            <div className='w-screen bg-purple-700 text-white p-2 py-3 fixed shadow-xl z-50 '>
                <div className="md:text-xl text-xs font-semibold flex justify-between md:mx-3 mx-2 relative md:top-0 -top-1 ">
                    <div className='inline-block'>
                        <img className='inline-block mr-3 float-left md:w-[50px] w-[40px] relative md:top-2 top-2' src={logo} alt="logo website" />
                        <h1 className='inline-block md:text-base text-xs relative md:top-0 top-2'>Aplikasi Transaksi Spp</h1>
                        <p className={`md:text-xs md:block hidden`}>solusi cerdas dalam transaksi</p>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

export default NavbarSiswa
