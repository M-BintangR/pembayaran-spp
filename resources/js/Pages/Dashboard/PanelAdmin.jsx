import React from 'react'
import HardTitle from '@/Components/HardTitle';
import { CardAdmin, CardPetugas } from '@/Components/Cards';
import { dataCardsAdmin, dataCardsPetugas } from '@/Components/url/url';
import { usePage } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';

const PanelAdmin = ({ items, data_spp }) => {
    const { auth } = usePage().props;
    return (
        <AuthLayout active={'dashboard'} user={auth.user}>
            <HardTitle title={'Menu Utama'} subTitle={`Selamat Datang ${auth.user?.level}`} />
            {
                auth.user.level === 'admin' ? (
                    <CardAdmin dataCards={dataCardsAdmin} items={items} />
                ) : (
                    <CardPetugas dataCardsPetugas={dataCardsPetugas} dataSpp={data_spp} />
                )
            }
        </AuthLayout>
    )
}

export default PanelAdmin
