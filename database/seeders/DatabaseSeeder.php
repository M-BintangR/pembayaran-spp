<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Kelas;
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
                "nama_kelas" => "XII RPL 2",
                "kompetensi_keahlian" => "Rekayasa Prangkat Lunak",
            ],
            [
                "nama_kelas" => "XI RPL 2",
                "kompetensi_keahlian" => "Rekayasa Prangkat Lunak",
            ],
            [
                "nama_kelas" => "X RPL 2",
                "kompetensi_keahlian" => "Rekayasa Prangkat Lunak",
            ],
            [
                "nama_kelas" => "XII RPL 1",
                "kompetensi_keahlian" => "Rekayasa Prangkat Lunak",
            ],
            [
                "nama_kelas" => "XI RPL 1",
                "kompetensi_keahlian" => "Rekayasa Prangkat Lunak",
            ],
            [
                "nama_kelas" => "X RPL 1",
                "kompetensi_keahlian" => "Rekayasa Prangkat Lunak",
            ],
            [
                "nama_kelas" => "XII TKJ 1",
                "kompetensi_keahlian" => "Teknik Komputer Jaringan",
            ],
            [
                "nama_kelas" => "XI TKJ 1",
                "kompetensi_keahlian" => "Teknik Komputer Jaringan",
            ],
            [
                "nama_kelas" => "X TKJ 1",
                "kompetensi_keahlian" => "Teknik Komputer Jaringan",
            ],
            [
                "nama_kelas" => "XII MMD 1",
                "kompetensi_keahlian" => "Multi Media",
            ],
            [
                "nama_kelas" => "XI MMD 1",
                "kompetensi_keahlian" => "Multi Media",
            ],
            [
                "nama_kelas" => "X MMD 1",
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

        $data_siswa = [
            [
                'nama' => 'Fery Fadul',
                'nis' => '202-048',
                'alamat' => 'jl pajayang',
                'nisn' => '1111111111',
                'id_kelas' => 1,
                'id_spp' => 1,
                'no_telp' => '09848934',
                'jk' => 'l',
            ]
        ];

        $data_petugas = [
            [
                'nama_pengguna' => 'Muh Bintang',
                'username' => 'Bintang',
                'level' => 'admin',
                'password' => bcrypt('adminadmin'),
            ],
            [
                'nama_pengguna' => 'Zakaria',
                'username' => 'Zaka',
                'level' => 'admin',
                'password' => bcrypt('adminadmin'),
            ]
        ];

        //! DATA FAKE CREATE
        foreach ($data_spp as $spp) {
            Spp::create($spp);
        }

        foreach ($data_siswa as $siswa) {
            Siswa::create($siswa);
        }

        foreach ($data_kelas as $kelas) {
            Kelas::create($kelas);
        }

        foreach ($data_petugas as $petugas) {
            User::create($petugas);
        }

        //! DATA FACTORY CREATE
        // User::factory()->count(10)->create();
        // Siswa::factory()->count(50)->create();
    }
}
