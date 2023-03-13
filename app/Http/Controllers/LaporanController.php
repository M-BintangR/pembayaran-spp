<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Siswa;
use Inertia\Inertia;
use App\Models\Kelas;

class LaporanController extends Controller
{
    public function tunggakan(Request $request)
    {
        $short = $request->query('short', 20);
        $short_kelas = $request->query('short_kelas', null);

        if ($short_kelas != null) {
            $items = Kelas::with(['siswa' => function ($query) {
                $query->with(['pembayaran', 'spp']);
            }])->select('id', 'nama_kelas')
                ->where('id', $short_kelas)
                ->orderBy('created_at', 'desc')
                ->orderBy('updated_at')
                ->paginate($short);
        } else {
            $items = Kelas::with(['siswa' => function ($query) {
                $query->with(['pembayaran', 'spp']);
            }])
                ->select('id', 'nama_kelas')
                ->orderBy('created_at', 'desc')
                ->orderBy('updated_at')
                ->paginate($short);
        }

        $relasi = Kelas::all();

        return Inertia::render('Dashboard/Pembayaran/Tunggakan', [
            'user' => auth()->user(),
            'items' => $items,
            'shortKelas' => $short_kelas,
            'relasi' => $relasi,
            'short' => $short,
        ]);
    }

    public function tunggakanCetak(Kelas $kelas)
    {
        $siswa = Siswa::where('id_kelas', $kelas->id)
            ->orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->with(['pembayaran', 'spp' => function ($query) {
                $query->select('id', 'nominal');
            }])
            ->get();

        return Inertia::render('Dashboard/Pembayaran/LaporanTunggakan', [
            'siswa' => $siswa,
            'kelas' => $kelas,
        ]);
    }

    public function laporan(Request $request)
    {
        $short = $request->query('short', 20);
        $short_kelas = $request->query('short_kelas', null);

        if ($short_kelas != null) {
            $items = Kelas::with(['siswa' => function ($query) {
                $query->with(['pembayaran', 'spp']);
            }])
                ->select('id', 'nama_kelas')
                ->where('id', $short_kelas)
                ->orderBy('created_at', 'desc')
                ->orderBy('updated_at')
                ->paginate($short);
        } else {
            $items = Kelas::with(['siswa' => function ($query) {
                $query->with(['pembayaran', 'spp']);
            }])
                ->select('id', 'nama_kelas')
                ->orderBy('created_at', 'desc')
                ->orderBy('updated_at')
                ->paginate($short);
        }

        $relasi = Kelas::all();

        return Inertia::render('Dashboard/Pembayaran/Laporan', [
            'user' => auth()->user(),
            'items' => $items,
            'shortKelas' => $short_kelas,
            'relasi' => $relasi,
            'short' => $short,
        ]);
    }

    public function rekapLaporan(Kelas $kelas)
    {
        $siswa = Siswa::where('id_kelas', $kelas->id)
            ->orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->with('pembayaran')
            ->get();

        return Inertia::render('Dashboard/Pembayaran/Rekap', [
            'kelas' => $kelas,
            'siswa' => $siswa,
        ]);
    }
}