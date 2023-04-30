<?php

namespace App\Http\Controllers;

use App\Http\Requests\PetugasRequest;
use App\Models\User;
use App\Services\PetugasService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PetugasController extends Controller
{
    protected $service;

    public function __construct(PetugasService $service)
    {
        $this->service = $service;
    }

    public function search(Request $request)
    {
        return $this->service->searching($request);
    }

    public function index(Request $request)
    {
        $data = $this->service->getPetugas($request);
        return Inertia::render('Dashboard/Petugas/Home', $data);
    }

    public function store(PetugasRequest $request)
    {
        return $this->service->createPetugas($request);
    }

    public function edit(User $user)
    {
        return response()->json(['item' => $user,], 200);
    }

    public function update(PetugasRequest $request, User $user)
    {
        return $this->service->updatePetugas($request, $user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return back();
    }
}
