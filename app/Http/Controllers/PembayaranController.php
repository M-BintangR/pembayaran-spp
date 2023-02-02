<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use App\Models\Siswa;
use App\Models\Spp;
use App\Models\User;
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
    public function index($query = 10)
    {
        $items = Pembayaran::with(['petugas', 'siswa', 'spp'])
            ->orderBy('created_at', 'asc')
            ->paginate($query);
        return Inertia::render('Dashboard/Pembayaran/Home', [
            'items' => $items,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $dataPetugas = User::all();
        $dataSpp = Spp::all();
        return Inertia::render('Dashboard/Pembayaran/Create', [
            'petugas' => $dataPetugas,
            'spp' => $dataSpp,
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
    public function show(Pembayaran $pembayaran)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Pembayaran  $pembayaran
     * @return \Illuminate\Http\Response
     */
    public function edit(Pembayaran $pembayaran)
    {
        return Inertia::render('Dashboard/Kelas/Edit', [
            'item' => $pembayaran->with(['spp', 'petugas']),
        ]);
    }

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
            'nisn' => ['required', 'max:10', 'unique:nisn'],
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