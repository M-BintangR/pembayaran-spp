import Sidebar from '@/Layouts/Sidebar'
import React from 'react'
import { CardAdmin } from '@/Components/Cards';





const PanelAdmin = () => {
    const dataCards = [
        { title: 'Data Siswa', jumlah: '100', bgColor: 'bg-indigo-700', textColor: 'text-indigo-700' },
        { title: 'Data Kelas', jumlah: '100', bgColor: 'bg-fuchsia-700', textColor: 'text-fuchsia-700' },
        { title: 'Data Pembayaran', jumlah: '100', bgColor: 'bg-violet-700', textColor: 'text-violet-700' },
        { title: 'Data Spp', jumlah: '100', bgColor: 'bg-cyan-700', textColor: 'text-cyan-700' },
        { title: 'Data Petugas', jumlah: '100', bgColor: 'bg-emerald-700', textColor: 'text-emerald-700' },
    ];

    return (
        <Sidebar>
            <div className="md:mt-5 mt-2 md:mb-8 mb-2 bg-slate-100 rounded-md py-3 px-4">
                <h1 className='text-base md:text-2xl font-semibold '>Dashboard Admin</h1>
                <p className='text-xs'>Hi Selamat Datang Admin!</p>
            </div>
            <CardAdmin dataCards={dataCards} />
        </Sidebar>
    )
}

export default PanelAdmin
