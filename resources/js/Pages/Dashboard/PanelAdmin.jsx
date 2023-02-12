import Sidebar from '@/Layouts/Sidebar'
import React from 'react'
import { CardAdmin } from '@/Components/Cards';
import HardTitle from '@/Components/HardTitle';





const PanelAdmin = ({ items, user }) => {

    const dataCards = [
        { title: 'Data Siswa', bgColor: 'bg-indigo-700', textColor: 'text-indigo-700', data: 'siswa', role: 'admin' },
        { title: 'Data Kelas', bgColor: 'bg-fuchsia-700', textColor: 'text-fuchsia-700', data: 'kelas', role: 'admin' },
        { title: 'Data Pembayaran', bgColor: 'bg-violet-700', textColor: 'text-violet-700', data: 'pembayaran', role: ['admin', 'petugas'] },
        { title: 'Data Spp', bgColor: 'bg-cyan-700', textColor: 'text-cyan-700', data: 'spp', role: 'admin' },
        { title: 'Data Petugas', bgColor: 'bg-emerald-700', textColor: 'text-emerald-700', data: 'petugas', role: 'admin' },
    ];

    return (
        <Sidebar active={'dashboard'} user={user}>
            <HardTitle title={'Dashboard Admin'} subTitle={`Selamat Datang ${user?.level}`} />
            <CardAdmin dataCards={dataCards} items={items} user={user} />
        </Sidebar>
    )
}

export default PanelAdmin
