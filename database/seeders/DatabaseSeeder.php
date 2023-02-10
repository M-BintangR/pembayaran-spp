<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Kelas;
use App\Models\Pembayaran;
use App\Models\Siswa;
use App\Models\Spp;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $dataSiswa = [
            [
                "nisn" => '1111111111',
                "nis" => '202-062',
                "nama" => 'Muhammad Bintang',
                "jk" => 'p',
                "id_kelas" => 1,
                "alamat" => 'bps blk f8 no 13',
                "no_telp" => '0879873627891',
                "id_spp" => 1,
            ],
            [
                "nisn" => '2222222222',
                "nis" => '202-063',
                "nama" => 'Fery Fadul',
                "jk" => 'p',
                "id_kelas" => 2,
                "alamat" => 'jl pajayyang',
                "no_telp" => '9930283947826',
                "id_spp" => 2,
            ],
        ];

        foreach ($dataSiswa as $siswa) {
            Siswa::create($siswa);
        }

        $dataKelas = [
            [
                "nama_kelas" => "3 RPL 2",
                "kompetensi_keahlian" => "Rekayasa Prangkat Lunak",
            ],
            [
                "nama_kelas" => "3 RPL 1",
                "kompetensi_keahlian" => "Rekayasa Prangkat Lunak",
            ],
            [
                "nama_kelas" => "3 TKJ 1",
                "kompetensi_keahlian" => "Teknik Komputer Jaringan",
            ],
            [
                "nama_kelas" => "3 MMD 1",
                "kompetensi_keahlian" => "Multi Media",
            ],
        ];

        foreach ($dataKelas as $kelas) {
            Kelas::create($kelas);
        }

        $dataSpp = [
            [
                "tahun" => 2019,
                "nominal" => 200000,
            ],
            [
                "tahun" => 2020,
                "nominal" => 300000,
            ],
        ];


        foreach ($dataSpp as $spp) {
            Spp::create($spp);
        }

        $dataPembayaran = [
            [
                "id_petugas" => 1,
                "nisn" => '1111111111',
                "tgl_bayar" => '2022-03-02',
                "bulan_bayar" => 'maret',
                "tahun_bayar" => '2004',
                "id_spp" => 1,
                "jumlah_bayar" => 200000
            ],
            [
                "id_petugas" => 2,
                "nisn" => '2222222222',
                "tgl_bayar" => '2022-03-02',
                "bulan_bayar" => 'maret',
                "tahun_bayar" => '2004',
                "id_spp" => 2,
                "jumlah_bayar" => 300000
            ],
        ];


        foreach ($dataPembayaran as $pembayaran) {
            Pembayaran::create($pembayaran);
        }

        $dataPetugas = [
            [
                "username" => 'HoshiChan',
                "password" => bcrypt("adminadmin"),
                "nama_pengguna" => "Bintang",
                "level" => 'admin'
            ],
            [
                "username" => 'Fery Kun',
                "password" => bcrypt("petugas"),
                "nama_pengguna" => "Fery Fadul",
                "level" => 'petugas'
            ],

        ];

        foreach ($dataPetugas as $petugas) {
            User::create($petugas);
        }


        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}
