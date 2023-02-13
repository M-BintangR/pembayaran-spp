<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\Spp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Siswa::with(['kelas', 'spp'])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        return Inertia::render('Dashboard/Siswa/Home', [
            'items' => $items,
            'user' => auth()->user(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $dataKelas = Kelas::all();
        $dataSpp = Spp::all();
        return Inertia::render('Dashboard/Siswa/Create', [
            'spp' => $dataSpp,
            'kelas' => $dataKelas,
            'user' => auth()->user(),
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
        $idSpp = Spp::pluck('id');
        $idKelas = Kelas::pluck('id');
        $validateData = $request->validate([
            'nisn' => ['required', 'max:10', 'unique:siswas,nisn'],
            'nis' => ['required', 'max:7', 'unique:siswas,nis'],
            'nama' => ['required', 'max:35'],
            'jk' => ['required'],
            'id_kelas' => ['required', Rule::in($idKelas)],
            'alamat' => ['required'],
            'no_telp' => ['required', 'max:13'],
            'id_spp' => ['required', Rule::in($idSpp)],
        ]);

        if ($validateData) {
            $check = Siswa::create($validateData);
        }

        if ($check) {
            return redirect(route('siswa.index'))->with('success', 'Data berhasil di tambah kan');
        }

        return redirect()->back()->with('error', 'Data gagal di tambahkan');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Siswa  $siswa
     * @return \Illuminate\Http\Response
     */

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Siswa  $siswa
     * @return \Illuminate\Http\Response
     */
    public function edit(Siswa $siswa)
    {
        return Inertia::render('Dashboard/Siswa/Edit', [
            'item' => $siswa,
            'spp' => Spp::all(),
            'kelas' => Kelas::all(),
            'user' => auth()->user(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Siswa  $siswa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Siswa $siswa)
    {
        $idSpp = Spp::pluck('id');
        $idKelas = Kelas::pluck('id');
        $credentials = $request->validate([
            'nisn' => ['required', 'max:10'],
            'nis' => ['required', 'max:7'],
            'nama' => ['required', 'max:35'],
            'jk' => ['required'],
            'id_kelas' => ['required', Rule::in($idKelas)],
            'alamat' => ['required'],
            'no_telp' => ['required', 'max:13'],
            'id_spp' => ['required', Rule::in($idSpp)],
        ]);

        if ($credentials) {
            $check = $siswa->update($credentials);
        }

        if ($check) {
            return redirect(route('siswa.index'))->with('success');
        }

        return redirect()->back()->with('error', 'Data gagal di tambah kan');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Siswa  $siswa
     * @return \Illuminate\Http\Response
     */
    public function destroy(Siswa $siswa)
    {
        $siswa->delete();

        Redirect::back();
    }
}
