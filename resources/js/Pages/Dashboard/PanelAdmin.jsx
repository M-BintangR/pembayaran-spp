import Sidebar from '@/Layouts/Sidebar'
import React from 'react'
import HardTitle from '@/Components/HardTitle';
import { CardAdmin, CardPetugas } from '@/Components/Cards';
import { dataCardsAdmin, dataCardsPetugas } from '@/Components/url/url';

const PanelAdmin = ({ items, user, kelasX, kelasXI, kelasXII }) => {
    return (
        <Sidebar active={'dashboard'} user={user}>
            <HardTitle title={'Menu Utama'} subTitle={`Selamat Datang ${user?.level}`} />
            <CardAdmin dataCards={dataCardsAdmin} items={items} />
            <CardPetugas dataCardsPetugas={dataCardsPetugas} kelasX={kelasX} kelasXI={kelasXI} kelasXII={kelasXII} />
        </Sidebar>
    )
}

export default PanelAdmin
