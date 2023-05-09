<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Inertia\Inertia;
use App\Models\Spp;

class DashboardController extends Controller
{
    protected $service;
    public function __construct(DashboardService $service)
    {
        $this->service = $service;
    }

    public function index()
    {
        $data_spp = Spp::with(['pembayaran', 'siswa'])->get();
        $items = $this->service->countering();
        return Inertia::render('Dashboard/PanelAdmin', [
            'items' => $items,
            'data_spp' => $data_spp,
        ]);
    }

    public function profile()
    {
        return Inertia::render('Dashboard/Profile');
    }
}