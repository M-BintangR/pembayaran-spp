import Sidebar from '@/Layouts/Sidebar'
import React from 'react'
import { CardAdmin, CardPetugas } from '@/Components/Cards';
import HardTitle from '@/Components/HardTitle';




const PanelAdmin = ({ items, user, kelasX, kelasXI, kelasXII }) => {

    const dataCardsAdmin = [
        { title: 'Data Siswa', bgColor: 'bg-indigo-700', textColor: 'text-indigo-700', data: 'siswa', role: 'admin' },
        { title: 'Data Kelas', bgColor: 'bg-fuchsia-700', textColor: 'text-fuchsia-700', data: 'kelas', role: 'admin' },
        { title: 'Data Pembayaran', bgColor: 'bg-violet-700', textColor: 'text-violet-700', data: 'pembayaran', role: ['admin', 'petugas'] },
        { title: 'Data Spp', bgColor: 'bg-cyan-700', textColor: 'text-cyan-700', data: 'spp', role: 'admin' },
        { title: 'Data Petugas', bgColor: 'bg-emerald-700', textColor: 'text-emerald-700', data: 'petugas', role: 'admin' },
    ];

    const dataCardsPetugas = [
        { title: 'X', bgColor: 'bg-indigo-700', textColor: 'text-indigo-700', data: 'X' },
        { title: 'XI', bgColor: 'bg-indigo-700', textColor: 'text-indigo-700', data: 'XI' },
        { title: 'XII', bgColor: 'bg-indigo-700', textColor: 'text-indigo-700', data: 'XII' },
    ]

    return (
        <Sidebar active={'dashboard'} user={user}>
            <HardTitle title={'Menu Utama'} subTitle={`Selamat Datang ${user?.level}`} />
            {user?.level === 'admin' ? (
                <CardAdmin dataCards={dataCardsAdmin} items={items} />
            ) : user?.level === 'petugas' ? (
                <CardPetugas dataCardsPetugas={dataCardsPetugas} kelasX={kelasX} kelasXI={kelasXI} kelasXII={kelasXII} />
            ) : null}
        </Sidebar>
    )
}

export default PanelAdmin
