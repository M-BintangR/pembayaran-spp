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

        $data_kelas = [
            [
                "nama_kelas" => "3 RPL 2",
                "kompetensi_keahlian" => "Rekayasa Prangkat Lunak",
            ],
            [
                "nama_kelas" => "2 RPL 2",
                "kompetensi_keahlian" => "Rekayasa Prangkat Lunak",
            ],
            [
                "nama_kelas" => "1 RPL 2",
                "kompetensi_keahlian" => "Rekayasa Prangkat Lunak",
            ],
            [
                "nama_kelas" => "3 RPL 1",
                "kompetensi_keahlian" => "Rekayasa Prangkat Lunak",
            ],
            [
                "nama_kelas" => "2 RPL 1",
                "kompetensi_keahlian" => "Rekayasa Prangkat Lunak",
            ],
            [
                "nama_kelas" => "1 RPL 1",
                "kompetensi_keahlian" => "Rekayasa Prangkat Lunak",
            ],
            [
                "nama_kelas" => "3 TKJ 1",
                "kompetensi_keahlian" => "Teknik Komputer Jaringan",
            ],
            [
                "nama_kelas" => "2 TKJ 1",
                "kompetensi_keahlian" => "Teknik Komputer Jaringan",
            ],
            [
                "nama_kelas" => "1 TKJ 1",
                "kompetensi_keahlian" => "Teknik Komputer Jaringan",
            ],
            [
                "nama_kelas" => "3 MMD 1",
                "kompetensi_keahlian" => "Multi Media",
            ],
            [
                "nama_kelas" => "2 MMD 1",
                "kompetensi_keahlian" => "Multi Media",
            ],
            [
                "nama_kelas" => "1 MMD 1",
                "kompetensi_keahlian" => "Multi Media",
            ],
        ];

        $data_spp = [
            [
                "tahun" => 2019,
                "nominal" => 170000,
            ],
            [
                "tahun" => 2020,
                "nominal" => 200000,
            ],
            [
                "tahun" => 2021,
                "nominal" => 250000,
            ],
            [
                "tahun" => 2022,
                "nominal" => 270000,
            ],
            [
                "tahun" => 2023,
                "nominal" => 300000,
            ],
        ];

        $data_pembayaran = [
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
                "jumlah_bayar" => 250000
            ],
        ];

        $data_petugas = [[
            'nama_pengguna' => 'Muh Bintang',
            'username' => 'Bintang',
            'level' => 'admin',
            'password' => bcrypt('adminadmin'),
        ]];

        foreach ($data_pembayaran as $pembayaran) {
            Pembayaran::create($pembayaran);
        }

        foreach ($data_spp as $spp) {
            Spp::create($spp);
        }

        foreach ($data_kelas as $kelas) {
            Kelas::create($kelas);
        }

        foreach ($data_petugas as $petugas) {
            User::create($petugas);
        }

        // ! Menggunakan Factory data Fake
        User::factory()->count(10)->create();
        Siswa::factory()->count(50)->create();
    }
}
