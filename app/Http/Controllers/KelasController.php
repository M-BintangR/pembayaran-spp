<?php

namespace App\Http\Controllers;

use App\Http\Requests\KelasRequest;
use App\Services\KelasService;
use Illuminate\Http\Request;
use App\Models\Kelas;
use Inertia\Inertia;

class KelasController extends Controller
{
    protected $service;
    public function __construct(KelasService $service)
    {
        $this->service = $service;
    }

    public function search(Request $request)
    {
        return $this->service->searching($request);
    }

    public function index(Request $request)
    {
        $data = $this->service->getKelas($request);
        return Inertia::render('Dashboard/Kelas/Home', $data);
    }

    public function store(KelasRequest $request)
    {
        if (Kelas::create($request->all())) {
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

    public function update(KelasRequest $request, Kelas $kelas)
    {
        if ($kelas->update($request->all())) {
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
