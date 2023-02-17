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
    { title: 'Nama Petugas / Penerima' },
    { title: 'Nama Siswa' },
    { title: 'NIS' },
    { title: 'Tanggal Bayar' },
    { title: 'Bulan Bayar' },
    { title: 'Tahun Bayar' },
    { title: 'Nominal Pembayaran Spp' },
    { title: 'Jumlah Yang Di Bayar' },
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
    { title: 'Tahun' },
];

//! Tabel Kelas
export const tableKelas = [
    { title: 'No' },
    { title: 'Nama Kelas' },
    { title: 'Kompetensi Keahlian' },
];
