<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $search = $request->query('search', null);

        if ($search !== null && $search !== "") {
            $items = Kelas::where('nama_kelas', 'like', '%' . $search . '%')
                ->orWhere('kompetensi_keahlian', 'like', '%' . $search . '%')
                ->paginate(20);
        }

        return response()->json(['items' => $items], 200);
    }

    public function index(Request $request)
    {
        $short = $request->query('short', 20);

        $items = Kelas::orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->paginate($short);

        return Inertia::render('Dashboard/Kelas/Home', [
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'nama_kelas' => ['required', 'min:1', 'max:10'],
            'kompetensi_keahlian' => ['required', 'min:1', 'max:50'],
        ]);

        if (Kelas::create($validateData)) {
            return to_route('kelas.index')
                ->with('success', 'Data berhasil di tambah kan');
        }

        return back()->with('error', 'Data gagal di tambahkan');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Kelas  $kelas
     * @return \Illuminate\Http\Response
     */

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Kelas  $kelas
     * @return \Illuminate\Http\Response
     */
    public function edit($kelas)
    {
        return response()->json([
            "item" => Kelas::where('id', $kelas)->first(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Kelas  $kelas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $kelas)
    {
        $credentials = $request->validate([
            'nama_kelas' => ['required'],
            'kompetensi_keahlian' => ['required'],
        ]);

        $kelas = Kelas::where('id', $kelas)->first();

        if ($kelas->update($credentials)) {
            return to_route('kelas.index')
                ->with('success', 'Data berhasil di tambah kan');
        }

        return back()->with('error', 'Data gagal di tambah kan');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Kelas  $kelas
     * @return \Illuminate\Http\Response
     */
    public function destroy($kelas)
    {
        Kelas::where('id', $kelas)->delete();
        return back();
    }
}
