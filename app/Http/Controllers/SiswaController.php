<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\Spp;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SiswaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $short = $request->query('short', 20);
        $items = Siswa::with(
            [
                'kelas' => function ($query) {
                    $query->select('id', 'nama_kelas');
                },
                'spp' => function ($query) {
                    $query->select('id', 'nominal');
                }
            ]
        )
            ->orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->paginate($short);

        return Inertia::render('Dashboard/Siswa/Home', [
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
    public function create()
    {
        $data_kelas = Kelas::all();
        $data_spp = Spp::all();

        return Inertia::render('Dashboard/Siswa/Create', [
            'spp' => $data_spp,
            'kelas' => $data_kelas,
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
        $id_spp = Spp::pluck('id');
        $id_kelas = Kelas::pluck('id');

        $validateData = $request->validate([
            'nisn' => ['required', 'integer', 'min:1', 'max:10', 'unique:siswas,nisn'],
            'nis' => ['required', 'max:7', 'unique:siswas,nis'],
            'nama' => ['required', 'min:1', 'max:35'],
            'jk' => ['required', 'min:1'],
            'id_kelas' => ['required', Rule::in($id_spp)],
            'alamat' => ['required', 'min:1'],
            'no_telp' => ['required', 'min:1', 'max:13'],
            'id_spp' => ['required', Rule::in($id_kelas)],
        ]);

        if (Siswa::create($validateData)) {
            return redirect(route('siswa.index'))
                ->with('success', 'Data berhasil di tambah kan');
        }

        return back()->with('error', 'Data gagal di tambahkan');
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
        $data_spp = Spp::all();
        $data_kelas = Kelas::all();

        return Inertia::render('Dashboard/Siswa/Edit', [
            'item' => $siswa,
            'spp' => $data_spp,
            'kelas' => $data_kelas,
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
        $id_spp = Spp::pluck('id');
        $id_kelas = Kelas::pluck('id');

        $credentials = $request->validate([
            'nisn' => ['required', 'min:1', 'max:10'],
            'nis' => ['required', 'min:1', 'max:7'],
            'nama' => ['required', 'min:1', 'max:35'],
            'jk' => ['required', 'min:1'],
            'id_kelas' => ['required', Rule::in($id_spp)],
            'alamat' => ['required', 'min:1'],
            'no_telp' => ['required', 'min:1', 'max:13'],
            'id_spp' => ['required', Rule::in($id_kelas)],
        ]);

        if ($siswa->update($credentials)) {
            return redirect(route('siswa.index'))
                ->with('success');
        }

        return back()->with('error', 'Data gagal di tambah kan');
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

        return back();
    }
}
