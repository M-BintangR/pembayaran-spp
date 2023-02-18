<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Pembayaran;
use App\Models\Siswa;
use App\Models\Spp;
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

        $items = Pembayaran::select('id', 'bulan_bayar', 'tahun_bayar', 'nisn', 'tgl_bayar', 'id_spp', 'jumlah_bayar', 'id_petugas')
            ->orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->with([
                'petugas' => function ($query) {
                    $query->select('id', 'nama_pengguna');
                },
                'siswa' => function ($query) {
                    $query->select('nisn', 'nama', 'nis');
                },
                'spp' => function ($query) {
                    $query->select('id', 'nominal');
                },
            ])
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
        $idPetugas = Pembayaran::pluck('id');
        $idSpp = Spp::pluck('id');

        $validateData = $request->validate([
            'id_petugas' => ['required', Rule::in($idPetugas)],
            'id_spp' => ['required', Rule::in($idSpp)],
            'nisn' => ['required', 'max:10'],
            'tgl_bayar' => ['required', 'date'],
            'bulan_bayar' => ['required', 'max:10'],
            'tahun_bayar' => ['required', 'max:4'],
            'jumlah_bayar' => ['required'],
        ]);

        if (Pembayaran::create($validateData)) {
            return  redirect(route('pembayaran.index'))
                ->with('success', 'Data berhasil di tambah kan');
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
