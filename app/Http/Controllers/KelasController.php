<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class KelasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Kelas::all()->map(function ($kelas) {
            return [
                'id' => $kelas->id,
                'nama_kelas' => $kelas->nama_kelas,
                'kompetensi_keahlian' => $kelas->kompetensi_keahlian,
                'edit_url' => route('kelas.edit', $kelas->id),
                'delete_url' => route('kelas.destroy', $kelas->id),
            ];
        });
        return Inertia::render('Dashboard/Kelas/Home', [
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
        return Inertia::render('Dashboard/Kelas/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'nama_kelas' => ['required'],
            'kompetensi_keahlian' => ['required'],
        ]);

        if ($validateData) {
            $check = Kelas::create($validateData);
        }

        if ($check) {
            return redirect(route('kelas.index'))->with('success', 'Data berhasil di tambah kan');
        }

        return redirect()->back()->with('error', 'Data gagal di tambahkan');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Kelas  $kelas
     * @return \Illuminate\Http\Response
     */
    public function show(Kelas $kelas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Kelas  $kelas
     * @return \Illuminate\Http\Response
     */
    public function edit(Kelas $kelas)
    {
        return Inertia::render('Dashboard/Kelas/Edit', [
            "item" => $kelas,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Kelas  $kelas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Kelas $kelas)
    {
        $credentials = $request->validate([
            'nama_kelas' => ['required'],
            'kompetensi_keahlian' => ['required'],
        ]);

        if ($credentials) {
            $check = $kelas->update($credentials);
        }

        if ($check) {
            return redirect(route('kelas.index'))->with('success', 'Data berhasil di tambah kan');
        }

        return redirect()->back()->with('error', 'Data gagal di tambah kan');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Kelas  $kelas
     * @return \Illuminate\Http\Response
     */
    public function destroy(Kelas $kelas)
    {
        $success = $kelas->delete();

        return Redirect::back();
    }
}