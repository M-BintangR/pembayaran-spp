<?php

namespace App\Http\Controllers;

use App\Http\Requests\SiswaRequest;
use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\Spp;
use App\Services\SiswaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaController extends Controller
{
    protected $service;

    public function __construct(SiswaService $service)
    {
        $this->service = $service;
    }

    public function search(Request $request)
    {
        return $this->service->searching($request);
    }

    public function index(Request $request)
    {
        $data = $this->service->getSiswa($request);
        return Inertia::render('Dashboard/Siswa/Home', $data);
    }

    public function create()
    {
        $data = $this->service->getDataKelas();
        return Inertia::render('Dashboard/Siswa/Create', $data);
    }

    public function store(SiswaRequest $request)
    {
        return $this->service->createSiswa($request);
    }

    public function edit(Siswa $siswa)
    {
        $data = $this->service->editSiswa($siswa);
        return Inertia::render('Dashboard/Siswa/Edit', $data);
    }

    public function update(SiswaRequest $request, Siswa $siswa)
    {
        return $this->service->updateSiswa($request, $siswa);
    }

    public function destroy(Siswa $siswa)
    {
        $siswa->delete();
        return back();
    }
}
