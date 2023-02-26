<?php

namespace App\Http\Controllers;

use App\Models\Kelas;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KelasController extends Controller
{

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

    public function edit(Kelas $kelas)
    {
        return response()->json([
            "item" => $kelas,
        ]);
    }

    public function update(Request $request, Kelas $kelas)
    {
        $credentials = $request->validate([
            'nama_kelas' => ['required'],
            'kompetensi_keahlian' => ['required'],
        ]);

        if ($kelas->update($credentials)) {
            return to_route('kelas.index')
                ->with('success', 'Data berhasil di tambah kan');
        }

        return back()->with('error', 'Data gagal di tambah kan');
    }

    public function destroy(Kelas $kelas)
    {
        $kelas->delete();
        return back();
    }
}
