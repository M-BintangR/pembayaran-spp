# APLIKASI TRANSAKSI PEMBAYARAN SPP

Aplikasi pembayaran SPP yang saya buat dengan tujuan tugas pemprograman web & mobile sekolah saya [SMK MUTIARA ILMU](https://mutiarailmu.sch.id) . Dalam aplikasi ini, admin dapat melihat jumlah tagihan SPP yang harus dibayarkan, melakukan pembayaran SPP dengan mudah dan cepat, serta memperoleh informasi tentang status pembayaran SPP secara real-time. Selain itu, dalam aplikasi ini juga terdapat fitur seperti melihat tunggakan siswa,tunggakan kelas, jumlah pembayaran siswa, jumlah pembayaran kelas serta cetak kwitansi, laporan, dan rekap pembayaran.

Aplikasi pembayaran SPP saya juga dilengkapi dengan fitur laporan pembayaran SPP, yang memungkinkan para admin memantau dan melacak pembayaran SPP yang telah dilakukan. Dalam laporan ini, terdapat informasi detail tentang tanggal pembayaran, jumlah yang dibayarkan, dan status pembayaran. Dengan fitur ini, para siswa dan orang tua dapat dengan mudah mengakses catatan pembayaran SPP mereka dan memastikan bahwa pembayaran SPP telah dilakukan dengan benar. Dalam rangka meningkatkan kualitas layanan.

## Screenshot

### Home Page
<img src="https://github.com/M-BintangR/gambar-doc/blob/main/homepage.png" width="1000" alt="gambarHomePage">

### Fitur Aplikasi
<img src="https://github.com/M-BintangR/gambar-doc/blob/main/1.png" width="800" alt="gambarHomePage">
<img src="https://github.com/M-BintangR/gambar-doc/blob/main/2.png" width="800" alt="gambarHomePage">
<img src="https://github.com/M-BintangR/gambar-doc/blob/main/3.png" width="800" alt="gambarHomePage">
<img src="https://github.com/M-BintangR/gambar-doc/blob/main/4.png" width="800" alt="gambarHomePage">
<img src="https://github.com/M-BintangR/gambar-doc/blob/main/5.gif" alt="gambarHomePage">

## Fitur

1. Sistem login 
2. Multiusers
3. Multiroles
4. Homepage dan Dashboard
5. Manajement Transaksi
6. Cetak Laporan,Kwitansi,Rekap, dan Tunggakan
7. Manajement Siswa, Kelas, Petugas, dan Spp
8. Pelacakan Transaksi Pembayaran
9. ...dll

## Cara Install dan Mengatur Aplikasi

## Database dan Tabel

### Tabel User
| Nama            |Type      |Length     |Atribut                       |
|-----------------|----------|-----------|------------------------------|
| id              | int      | 11        | primary_key, auto_increment  |
| username        | varchar  | 25        | -                            | 
| nama_pengguna   | varchar  | 35        | -                            |
| level           | enum     | 0         | -                            |
| password        | varchar  | 8         | -                            |

### Tabel Siswa
| Nama      | Type    | Length    | Atribut                             |
|-----------|---------|-----------|-------------------------------------|
| nisn      | int     | 10        | primary_key, auto_increment, unique |
| nis       | char    | 8         | unique                              |
| nama      | varchar | 35        | -                                   |
| jk        | enum    | 0         | -                                   |
| id_kelas  | int     | 11        | -                                   |
| alamat    | text    | 0         | -                                   |
| no_telp   | char    | 13        | -                                   |
| id_spp    | int     | 11        | -                                   |

### Tabel Kelas
| Nama                | Type    | Atribut                     |
|---------------------|---------|-----------------------------|
| id                  | int     | primary_key, auto_increment |
| nama_kelas          | varchar | -                           |
| kompetensi_keahlian | varchar | -                           |

### Tabel SPP
| Nama      | Type    | Length | Atribut                     |
|-----------|---------|--------|-----------------------------|
| id        | int     | 11     | primary_key, auto_increment |
| nominal   | bigint  | 255    |                             |
| level     | enum    | 0      |                             |

### Tabel Pembayaran
| Nama         | Type       | Length  | Atribut                     |
|--------------|------------|---------|-----------------------------|
| id_petugas   | int        | 11      | primary_key, auto_increment |
| nisn         | int        | 10      | -                           |
| tgl_bayar    | date       | 0       | -                           |
| bulan_bayar  | varchar    | 10      | -                           |
| tahun_bayar  | varchar    | 4       | -                           |   
| id_spp       | int        | 11      | -                           |
| jumlah_bayar | bitint     | 255     | -                           |

### Tabel Kuitansi
| Nama          | Type      | Length    | Atribut                       |
|---------------|-----------|-----------|-------------------------------|
| id            | int       | 11        | primary_key, auto_increment   |
| nis           | char      | 8         | -                             |
| bulan         | varchar   | 100       | -                             |
| tanggal       | date      | 0         | -                             |

