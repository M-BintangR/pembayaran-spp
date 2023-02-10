<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Pembayaran;
use App\Models\Siswa;
use App\Models\Spp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PembayaranController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function transaksi()
    {
        $siswa = Siswa::with(['kelas'])->orderBy('created_at', 'desc')
            ->paginate(10);
        return Inertia::render('Dashboard/Pembayaran/Transaksi', [
            'user' => auth()->user(),
            'siswa' => $siswa,
        ]);
    }

    public function index()
    {
        $items = Pembayaran::with(['petugas', 'siswa', 'spp', 'siswa.kelas'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        return Inertia::render('Dashboard/Pembayaran/Home', [
            'items' => $items,
            'user' => auth()->user(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Siswa $siswa)
    {
        $dataSpp = Spp::where('id', $siswa->id_spp)->first();
        $kelas = Kelas::where('id', $siswa->id_kelas)->first();
        $month = Pembayaran::where('nisn', $siswa->nisn)->get();
        return Inertia::render('Dashboard/Pembayaran/Create', [
            'siswa' => $siswa,
            'kelas' => $kelas,
            'spp' => $dataSpp,
            'user' => auth()->user(),
            'bulan_bayar' => $month,
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
            'tgl_bayar' => ['required'],
            'bulan_bayar' => ['required'],
            'tahun_bayar' => ['required'],
            'jumlah_bayar' => ['required'],
        ]);

        if ($validateData) {
            $check = Pembayaran::create($validateData);
        }

        if ($check) {
            return  redirect(route('pembayaran.index'))->with('success', 'Data berhasil di tambah kan');
        }

        return redirect()->back()->with('error', 'Data gagal di tambahkan');
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
            'nisn' => ['required', 'max:10'],
            'tgl_bayar' => ['required'],
            'bulan_bayar' => ['required'],
            'tahun_bayar' => ['required'],
            'jumlah_bayar' => ['required'],
        ]);

        if ($credentials) {
            $check = $pembayaran->update($credentials);
        }

        if ($check) {
            return redirect(route('pembayaran.index'))->with('success', 'Data berhasil di tambah kan');
        }

        return redirect()->back()->with('error', 'Data gagal di tambahkan');
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

        return Redirect::back();
    }
}
