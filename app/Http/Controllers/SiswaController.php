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

    public function search(Request $request)
    {
        $search = $request->query('search', null);

        $items = Siswa::with(['kelas', 'spp'])
            ->where(function ($query) use ($search) {
                $query
                    ->where('nama', 'like', "%{$search}%")
                    ->orWhere('nis', 'like', "%{$search}%")
                    ->orWhere('nisn', 'like', "%{$search}%")
                    ->orWhere('alamat', 'like', "%{$search}%")
                    ->orWhere('jk', 'like', "%{$search}%")
                    ->orWhere('no_telp', 'like', "%{$search}%");
            })->orWhereHas('kelas', function ($query) use ($search) {
                $query
                    ->where('nama_kelas', 'like', "%{$search}%");
            })->orWhereHas('spp', function ($query) use ($search) {
                $query
                    ->where('nominal', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->paginate(20);

        return response()->json(['items' => $items], 200);
    }

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

    public function store(Request $request)
    {
        $id_spp = Spp::pluck('id');
        $id_kelas = Kelas::pluck('id');

        $validateData = $request->validate([
            'nisn' => ['required', 'min:1', 'max:10', 'unique:siswas,nisn'],
            'nis' => ['required', 'max:7', 'unique:siswas,nis'],
            'nama' => ['required', 'min:1', 'max:35'],
            'jk' => ['required', 'min:1'],
            'id_kelas' => ['required', Rule::in($id_spp)],
            'alamat' => ['required', 'min:1'],
            'no_telp' => ['required', 'min:1', 'max:13'],
            'id_spp' => ['required', Rule::in($id_kelas)],
        ]);

        if (Siswa::create($validateData)) {
            return to_route('siswa.index')
                ->with('success', 'Data berhasil di tambah kan');
        }

        return back()->with('error', 'Data gagal di tambahkan');
    }

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
            return to_route('siswa.index')
                ->with('success');
        }

        return back()->with('error', 'Data gagal di tambah kan');
    }

    public function destroy(Siswa $siswa)
    {
        $siswa->delete();

        return back();
    }
}