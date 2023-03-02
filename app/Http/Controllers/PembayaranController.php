<?php

namespace App\Http\Controllers;

use App\Models\Kwitansi;
use App\Models\Pembayaran;
use App\Models\Siswa;
use App\Models\Spp;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use App\Helpers\Terbilang;
use App\Models\Kelas;
use Carbon\Carbon;

class PembayaranController extends Controller
{
    public function laporan(Request $request)
    {
        $short = $request->query('short', 20);
        $short_kelas = $request->query('short_kelas', null);

        if ($short_kelas != null) {
            $items = Kelas::select('id', 'nama_kelas')
                ->where('id', $short_kelas)
                ->orderBy('created_at', 'desc')
                ->orderBy('updated_at')
                ->paginate($short);
        } else {
            $items = Kelas::select('id', 'nama_kelas')
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

    public function kwitansi(Kwitansi $kwitansi)
    {
        $nominal = $kwitansi->siswa->spp->nominal;
        $total_bulan = count($kwitansi->siswa->pembayaran);
        $total =  $nominal * $total_bulan;
        $terbilang = Terbilang::konversi($total);
        $tanggal = Carbon::now()->isoFormat('dddd, D MMMM YYYY');

        return Inertia::render('Dashboard/Pembayaran/Kwitansi', [
            'user' => auth()->user(),
            'siswa' => $kwitansi->siswa,
            'pembayaran' => $total,
            'kwitansi' => $kwitansi,
            'tanggal' => $tanggal,
            'kelas' => $kwitansi->siswa->kelas,
            'terbilang' => strtoupper($terbilang),
        ]);
    }

    public function transaksiSearch(Request $request)
    {
        $search = $request->query('search', null);

        if ($search !== null && $search !== "") {
            $items = Siswa::with(['kelas', 'pembayaran'])
                ->where(function ($query) use ($search) {
                    $query
                        ->where('nama', 'like', '%' . $search . '%')
                        ->orWhere('nis', 'like', '%' . $search . '%')
                        ->orWhere('nisn', 'like', '%' . $search . '%');
                })->orWhereHas('kelas', function ($query) use ($search) {
                    $query->where('nama_kelas', 'like', '%' . $search . '%');
                })->orWhereHas('pembayaran', function ($query) use ($search) {
                    $query->where('bulan_bayar', 'like', '%' . $search . '%');
                })->paginate(20);
        }

        return response()->json(['siswa' => $items], 200);
    }

    public function search(Request $request)
    {
        $search = $request->query('search', null);

        if ($search !== null && $search !== "") {
            $items = Kwitansi::where('nis', 'LIKE', '%' . $search . '%')
                ->orWhere('tanggal', 'LIKE', '%' . $search . '%')
                ->orWhere('bulan', 'LIKE', '%' . $search . '%')
                ->paginate(20);
        }

        return response()->json(['items' => $items], 200);
    }

    public function transaksi(Request $request)
    {
        $short = $request->query('short', 20);

        $siswa = Siswa::select('id', 'nama', 'nis', 'nisn', 'id_kelas')
            ->orderBy('updated_at', 'desc')
            ->orderBy('created_at', 'desc')
            ->with([
                'kelas' => function ($query) {
                    $query->select('id', 'nama_kelas');
                },
                'pembayaran' => function ($query) {
                    $query->select('nisn', 'bulan_bayar');
                }
            ])
            ->paginate($short);

        return Inertia::render('Dashboard/Pembayaran/Transaksi', [
            'user' => auth()->user(),
            'siswa' => $siswa,
            'short' => $short,
        ]);
    }

    public function index(Request $request)
    {
        $short = $request->query('short', 20);

        $items = Kwitansi::orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->paginate($short);

        return Inertia::render('Dashboard/Pembayaran/Home', [
            'items' => $items,
            'user' => auth()->user(),
            'short' => $short,
        ]);
    }

    public function create(Siswa $siswa)
    {
        $bulan_bayar = $siswa->pembayaran->pluck('bulan_bayar')->toArray();
        return Inertia::render('Dashboard/Pembayaran/Create', [
            'siswa' => $siswa,
            'kelas' => $siswa->kelas->nama_kelas,
            'spp' => $siswa->spp->nominal,
            'user' => auth()->user(),
            'bulan_bayar' => $bulan_bayar,
        ]);
    }

    public function store(Request $request)
    {
        $id_petugas = User::pluck('id');
        $id_spp = Spp::pluck('id');

        $validateData = $request->validate([
            'id_petugas' => ['required', Rule::in($id_petugas)],
            'id_spp' => ['required', Rule::in($id_spp)],
            'nisn' => ['required', 'max:10'],
            'tgl_bayar' => ['required', 'date'],
            'bulan_bayar' => ['required', 'max:12', 'array'],
            'tahun_bayar' => ['required', 'max:4'],
            'jumlah_bayar' => ['required'],
        ]);

        $existingPayments = Pembayaran::where('nisn', $validateData['nisn'])
            ->whereIn('bulan_bayar', array_column($validateData['bulan_bayar'], 'value'))
            ->get();

        if ($existingPayments->isNotEmpty()) {
            return back()->with('error', 'Pembayaran Bulan ini Sudah');
        }
        try {

            foreach ($validateData['bulan_bayar'] as $bulan) {
                $pembayaran = Pembayaran::create([
                    'id_petugas' => $validateData['id_petugas'],
                    'id_spp' => $validateData['id_spp'],
                    'nisn' => $validateData['nisn'],
                    'tgl_bayar' => $validateData['tgl_bayar'],
                    'bulan_bayar' => $bulan['value'],
                    'tahun_bayar' => $validateData['tahun_bayar'],
                    'jumlah_bayar' => $validateData['jumlah_bayar'],
                ]);
            }

            if ($pembayaran) {
                $siswa = Siswa::query()
                    ->where('nisn', $request->nisn)
                    ->firstOrFail();
                $bulan = array_column($request->bulan_bayar, 'value');
                $kwitansi = Kwitansi::query()
                    ->where('nis', $siswa->nis)->first();

                if ($kwitansi) {
                    $bulan_baru = array_merge(explode(",", $kwitansi->bulan), $bulan);
                    $bulan_baru = array_unique($bulan_baru);
                    sort($bulan_baru);

                    $kwitansi->update([
                        'tanggal' => now()->format('Y-m-d'),
                        'bulan' => implode(",", $bulan_baru),
                    ]);
                } else {
                    Kwitansi::create([
                        'nis' => $siswa->nis,
                        'tanggal' => now()->format('Y-m-d'),
                        'bulan' => implode(",", $bulan),
                    ]);
                }
            }
            return to_route('transaksi')->with('success', 'Data berhasil di tambahkan');
        } catch (Exception $e) {
            return back()->with('error', $e);
        }
        return back()->with('error', 'Data gagal di tambahkan');
    }
}
