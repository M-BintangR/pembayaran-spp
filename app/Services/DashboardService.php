<?php

namespace App\Services;

use App\Models\Kelas;
use App\Models\Pembayaran;
use App\Models\Siswa;
use App\Models\Spp;
use App\Models\User;

class DashboardService
{
    protected $items;
    public function countering(): array
    {
        $this->items = [
            'kelas' => Kelas::count(),
            'siswa' => Siswa::count(),
            'petugas' => User::count(),
            'spp' => Spp::count(),
            'pembayaran' => Pembayaran::count(),
        ];
        return $this->items;
    }
}
