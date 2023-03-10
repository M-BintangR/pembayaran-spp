import React from 'react'

//! month
export const month = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

//! menu dari sidebar
export const menuSidebar = [
    {
        title: 'Dashboard',
        active: 'dashboard',
        role: ['admin', 'petugas'],
        submenu: true,
        submenuItems: [
            { title: 'Menu Utama', link: '/dashboard', active: 'menu utama' },
            { title: 'Profil', link: '/dashboard/profile', active: 'profil' },
        ],
    },
    {
        title: 'Transaksi Pembayaran',
        link: '/dashboard/pembayaran',
        spacing: true,
        active: 'pembayaran',
        role: 'petugas'
    },
    {
        title: 'Laporan',
        active: 'laporan',
        role: 'petugas',
        submenu: true,
        submenuItems: [
            { title: 'Rekap Pembayaran Kelas', link: '/dashboard/laporan', active: 'rekap kelas' },
            { title: 'Tunggakan Pembayaran Kelas', link: '/dashboard/laporan/tunggakan', active: 'rekap tunggakan kelas' },
        ],
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

//! tabel transaksi
export const tableTransaksi01 = [
    { title: 'No' },
    { title: 'Nama Siswa' },
    { title: 'NIS' },
    { title: 'Kelas' },
    { title: '1' },
    { title: '2' },
    { title: '3' },
    { title: '4' },
    { title: '5' },
    { title: '6' },
    { title: '7' },
    { title: '8' },
    { title: '9' },
    { title: '10' },
    { title: '11' },
    { title: '12' },
];

export const tableTransaksi02 = [
    { title: 'No' },
    { title: 'Nama Siswa' },
    { title: 'NIS' },
    { title: 'Kelas' },
    { title: 'Jan' },
    { title: 'Feb' },
    { title: 'Mar' },
    { title: 'Apr' },
    { title: 'Mei' },
    { title: 'Jun' },
    { title: 'Jul' },
    { title: 'Jun' },
    { title: 'Aug' },
    { title: 'Sep' },
    { title: 'Okt' },
    { title: 'Des' },
];

//! Tabel Pembayaran
export const tablePembayaran = [
    { title: 'No' },
    { title: 'NIS' },
    { title: 'Tanggal Bayar' },
    { title: 'Bulan Bayar' },
];

//! Tabel Petugas
export const tablePetugas = [
    { title: 'No' },
    { title: 'Username' },
    { title: 'Nama Pengguna' },
    { title: 'Level' },
];

//! Tabel Siswa
export const tableSiswa = [
    { title: 'No' },
    { title: 'Nama' },
    { title: 'Jenis Kelamin' },
    { title: 'NISN' },
    { title: 'NIS' },
    { title: 'Nama Kelas' },
    { title: 'Alamat' },
    { title: 'No Telp' },
    { title: 'Nominal Pembayaran Spp' },
];

//! Tabel Spp
export const tableSpp = [
    { title: 'No' },
    { title: 'Nominal' },
    { title: 'Level Kelas' },
];

//! Tabel Kelas
export const tableKelas = [
    { title: 'No' },
    { title: 'Nama Kelas' },
    { title: 'Kompetensi Keahlian' },
];

//! Tabel Rekap Pembayaran Kelas
export const tableRekap = [
    { title: 'No' },
    { title: 'Nama Kelas' },
    { title: 'Tunggakan Pembayaran' }
];
//! Tabel Laporan Pembayaran Kelas
export const tableLaporan = [
    { title: 'No' },
    { title: 'Nama Kelas' },
    { title: 'Jumlah Pembayaran' }
];

//! DATA CARD

//! Card Admin
export const dataCardsAdmin = [
    { title: 'Data Siswa', bgColor: 'bg-indigo-700', textColor: 'text-indigo-700', data: 'siswa', role: 'admin' },
    { title: 'Data Kelas', bgColor: 'bg-fuchsia-700', textColor: 'text-fuchsia-700', data: 'kelas', role: 'admin' },
    { title: 'Data Pembayaran', bgColor: 'bg-violet-700', textColor: 'text-violet-700', data: 'pembayaran', role: ['admin', 'petugas'] },
    { title: 'Data Spp', bgColor: 'bg-cyan-700', textColor: 'text-cyan-700', data: 'spp', role: 'admin' },
    { title: 'Data Petugas', bgColor: 'bg-emerald-700', textColor: 'text-emerald-700', data: 'petugas', role: 'admin' },
];

//! Card  Petugas
export const dataCardsPetugas = [
    { title: 'X', bgColor: 'bg-indigo-700', textColor: 'text-indigo-700', data: 'X' },
    { title: 'XI', bgColor: 'bg-indigo-700', textColor: 'text-indigo-700', data: 'XI' },
    { title: 'XII', bgColor: 'bg-indigo-700', textColor: 'text-indigo-700', data: 'XII' },
]


