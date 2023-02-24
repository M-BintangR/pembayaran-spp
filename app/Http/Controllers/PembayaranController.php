<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Kwitansi;
use App\Models\Pembayaran;
use App\Models\Siswa;
use App\Models\Spp;
use App\Models\User;
use Exception;
use Illuminate\Database\DBAL\TimestampType;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PembayaranController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function kwitansi(Kwitansi $kwitansi)
    {
        $nominal = $kwitansi->siswa->spp->nominal;
        $total_bulan = count($kwitansi->siswa->pembayaran);
        $total =  $nominal * $total_bulan;

        return Inertia::render('Dashboard/Pembayaran/Kwitansi', [
            'user' => auth()->user(),
            'siswa' => $kwitansi->siswa,
            'pembayaran' => $total,
            'kwitansi' => $kwitansi,
            'kelas' => $kwitansi->siswa->kelas,
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
            $items = Pembayaran::where('nis', 'LIKE', '%' . $search . '%')
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Siswa $siswa)
    {

        $data_kelas = Kelas::where('id', $siswa->id_kelas)->pluck('nama_kelas');
        $data_spp = Spp::where('id', $siswa->id_spp)->pluck('nominal');
        $bulan_bayar = $siswa->pembayaran->pluck('bulan_bayar')->toArray();

        return Inertia::render('Dashboard/Pembayaran/Create', [
            'siswa' => $siswa,
            'kelas' => $data_kelas,
            'spp' => $data_spp,
            'user' => auth()->user(),
            'bulan_bayar' => $bulan_bayar,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $idPetugas = User::pluck('id');
        $idSpp = Spp::pluck('id');

        $validateData = $request->validate([
            'id_petugas' => ['required', Rule::in($idPetugas)],
            'id_spp' => ['required', Rule::in($idSpp)],
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
            return redirect(route('transaksi'))->with('success', 'Data berhasil di tambahkan');
        } catch (Exception $e) {
            return back()->with('error', 'Data gagal di tambahkan');
        }
        return back()->with('error', 'Data gagal di tambahkan');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pembayaran  $pembayaran
     * @return \Illuminate\Http\Response
     */

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Pembayaran  $pembayaran
     * @return \Illuminate\Http\Response
     */

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pembayaran  $pembayaran
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pembayaran $pembayaran)
    {
        $idPetugas = Pembayaran::pluck('id');
        $idSpp = Spp::pluck('id');

        $credentials = $request->validate([
            'id_petugas' => ['required', Rule::in($idPetugas)],
            'id_spp' => ['required', Rule::in($idSpp)],
            'nisn' => ['required', 'integer', 'min:1', 'max:10'],
            'tgl_bayar' => ['required', 'date'],
            'bulan_bayar' => ['required', 'max:8'],
            'tahun_bayar' => ['required', 'max:4'],
            'jumlah_bayar' => ['required', 'integer', 'min:1'],
        ]);

        if ($pembayaran->update($credentials)) {
            return redirect(route('pembayaran.index'))
                ->with('success', 'Data berhasil di tambah');
        }

        return back()->with('error', 'Data gagal di tambah');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pembayaran  $pembayaran
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pembayaran $pembayaran)
    {
        $pembayaran->delete();

        return back();
    }
}
