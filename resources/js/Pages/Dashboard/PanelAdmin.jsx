import Sidebar from '@/Layouts/Sidebar'
import React from 'react'
import HardTitle from '@/Components/HardTitle';
import { CardAdmin, CardPetugas } from '@/Components/Cards';
import { dataCardsAdmin, dataCardsPetugas } from '@/Components/url/url';

const PanelAdmin = ({ items, user, kelas }) => {

    return (
        <Sidebar active={'dashboard'} user={user}>
            <HardTitle title={'Menu Utama'} subTitle={`Selamat Datang ${user?.level}`} />
            <CardAdmin dataCards={dataCardsAdmin} items={items} />
            <CardPetugas dataCardsPetugas={dataCardsPetugas} kelas={kelas} />
        </Sidebar>
    )
}

export default PanelAdmin
