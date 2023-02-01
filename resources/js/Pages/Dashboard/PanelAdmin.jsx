import Sidebar from '@/Layouts/Sidebar'
import React from 'react'
import { CardAdmin } from '@/Components/Cards';
import HardTitle from '@/Components/HardTitle';





const PanelAdmin = ({ items }) => {

    const dataCards = [
        { title: 'Data Siswa', bgColor: 'bg-indigo-700', textColor: 'text-indigo-700', data: 'siswa' },
        { title: 'Data Kelas', bgColor: 'bg-fuchsia-700', textColor: 'text-fuchsia-700', data: 'kelas' },
        { title: 'Data Pembayaran', bgColor: 'bg-violet-700', textColor: 'text-violet-700', data: 'pembayaran' },
        { title: 'Data Spp', bgColor: 'bg-cyan-700', textColor: 'text-cyan-700', data: 'spp' },
        { title: 'Data Petugas', bgColor: 'bg-emerald-700', textColor: 'text-emerald-700', data: 'petugas' },
    ];

    return (
        <Sidebar>
            <HardTitle title={'Dashboard Admin'} subTitle={'Selamat Datang Admin!'} />
            <CardAdmin dataCards={dataCards} items={items} />
        </Sidebar>
    )
}

export default PanelAdmin
