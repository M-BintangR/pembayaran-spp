import React from 'react'

export const menuSidebar = [
    {
        title: 'Dashboard',
        active: 'dashboard',
        role: ['admin', 'petugas'],
        submenu: true,
        submenuItems: [
            { title: 'Menu Utama', link: '/dashboard', active: 'menu utama' },
            { title: 'Profil', link: '', active: 'profil' },
        ],
    },
    {
        title: 'Transaksi Pembayaran',
        link: '/dashboard/pembayaran',
        spacing: true,
        active: 'pembayaran',
        role: ['admin', 'petugas']
    },
    {
        title: 'Data Siswa',
        link: '/dashboard/siswa',
        active: 'siswa',
        role: 'admin'
    },
    {
        title: 'Data Kelas',
        link: '/dashboard/kelas',
        active: 'kelas',
        role: 'admin'
    },
    {
        title: 'Data Spp',
        link: '/dashboard/spp',
        active: 'spp',
        role: 'admin'
    },
    {
        title: 'Data Petugas',
        link: '/dashboard/petugas',
        active: 'petugas',
        role: 'admin'

    },
];

