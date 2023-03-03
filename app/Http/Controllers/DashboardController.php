<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Pembayaran;
use App\Models\Siswa;
use App\Models\Spp;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {

        $items = [
            'kelas' => Kelas::count(),
            'siswa' => Siswa::count(),
            'petugas' => User::count(),
            'spp' => Spp::count(),
            'pembayaran' => Pembayaran::count(),
        ];

        $arrX = ['X RPL 2', 'X TKJ 1', 'X RPL 1', 'X MMK 1', 'X MMD 1'];
        $arrXI = ['XI RPL 2', 'XI TKJ 1', 'XI RPL 1', 'XI MMK 1', 'XI MMD 1'];
        $arrXII = ['XII RPL 2', 'XII RPL 1', 'XII TKJ 1', 'XII MMK 1', 'XII MMD 1'];

        $kelasX = Kelas::whereIn('nama_kelas', $arrX)
            ->with(['siswa' => function ($query) {
                $query->withCount('pembayaran');
            }])
            ->get();

        $kelasXI = Kelas::whereIn('nama_kelas', $arrXI)
            ->with(['siswa' => function ($query) {
                $query->withCount('pembayaran');
            }])
            ->get();

        $kelasXII = Kelas::whereIn('nama_kelas', $arrXII)
            ->with(['siswa' => function ($query) {
                $query->withCount('pembayaran');
            }])
            ->get();


        return Inertia::render('Dashboard/PanelAdmin', [
            'items' => $items,
            'kelasX' => $kelasX,
            'kelasXI' => $kelasXI,
            'kelasXII' => $kelasXII,
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
