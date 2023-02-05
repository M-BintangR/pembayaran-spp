<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Pembayaran;
use App\Models\Siswa;
use App\Models\Spp;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $items = [
            'kelas' => count(Kelas::all()),
            'siswa' => count(Siswa::all()),
            'petugas' => count(User::all()),
            'spp' => count(Spp::all()),
            'pembayaran' => count(Pembayaran::all()),
        ];

        return Inertia::render('Dashboard/PanelAdmin', [
            'items' => $items,
            'user' => auth()->user(),
        ]);
    }

    public function profile()
    {
        return Inertia::render('Dashboard/Profile', [
            'user' => auth()->user(),
        ]);
    }
}
