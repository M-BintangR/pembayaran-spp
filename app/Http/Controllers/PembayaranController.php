<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Siswa;
use App\Models\Kwitansi;
use Illuminate\Http\Request;
use App\Services\PembayaranService;
use App\Http\Requests\PembayaranRequest;

class PembayaranController extends Controller
{
    protected $service;
    public function __construct(PembayaranService $service)
    {
        $this->service = $service;
    }
    public function kwitansi(Kwitansi $kwitansi)
    {
        $data = $this->service->getKuitansiSiswa($kwitansi);
        return Inertia::render('Dashboard/Pembayaran/Kwitansi', $data);
    }

    public function transaksiSearch(Request $request)
    {
        return $this->service->searching($request, 'transaksi');
    }

    public function search(Request $request)
    {
        return $this->service->searching($request, 'index');
    }

    public function transaksi(Request $request)
    {
        $data = $this->service->getTransaksi($request);
        return Inertia::render('Dashboard/Pembayaran/Transaksi', $data);
    }

    public function index(Request $request)
    {
        $data = $this->service->getKuitansi($request);
        return Inertia::render('Dashboard/Pembayaran/Home', $data);
    }

    public function create(Siswa $siswa)
    {
        $data = $this->service->getDataPembayaranSiswa($siswa);
        return Inertia::render('Dashboard/Pembayaran/Create', $data);
    }

    public function store(PembayaranRequest $request)
    {
        return $this->service->createPembayaran($request);
    }
}
