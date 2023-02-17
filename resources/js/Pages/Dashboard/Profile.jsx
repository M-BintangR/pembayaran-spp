import HardTitle from '@/Components/HardTitle'
import Sidebar from '@/Layouts/Sidebar'
import React from 'react'
import { BiUserCircle, BiUserPin } from 'react-icons/bi';
import { FaUserTie } from 'react-icons/fa';

const Profile = ({ user }) => {
    return (
        <Sidebar active={'dashboard'} user={user}>
            <HardTitle title={'Profil Pengguna'} subTitle={'Data akun anda'} />
            <div className='grid md:grid-cols-2 grid-cols-1 gap-x-5'>
                <div className='md:mt-0 mt-3'>
                    <div className='mb-5'>
                        <BiUserCircle className='inline-block mr-1 text-lg' />
                        <small>Username</small>
                        <input
                            className='border-gray-200 bg-gray-100 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                            type="text"
                            name='nisn'
                            value={user?.username}
                            disabled={true}
                        />
                    </div>
                    <div className='mb-5'>
                        <BiUserPin className='inline-block mr-1 text-lg' />
                        <small>Nama Pengguna</small>
                        <input
                            className='border-gray-200 bg-gray-100 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                            type="text"
                            name='nisn'
                            value={user?.nama_pengguna}
                            disabled={true}
                        />
                    </div>
                    <div className='mb-5'>
                        <FaUserTie className='inline-block mr-1 text-lg' />
                        <small>Peranan</small>
                        <input
                            className='border-gray-200 bg-gray-100 rounded-md shadow-sm md:text-base text-xs mt-1 block w-full'
                            type="text"
                            name='nisn'
                            value={'Admin'}
                            disabled={user?.level}
                        />
                    </div>
                </div>
            </div>
        </Sidebar>
    )
}

export default Profile
