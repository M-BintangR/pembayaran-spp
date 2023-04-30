<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;

class PetugasService
{
    public function getPetugas(Request $request): array
    {
        $short = $request->query('short', 20);

        $items = User::orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->paginate($short);

        return [
            'items' => $items,
            'short' => $short,
        ];
    }

    public function updatePetugas(Request $request, User $user)
    {
        if ($user->update($request->all())) {
            return to_route('petugas.index')
                ->with('success', 'Data berhasil di tambah kan');
        }
    }

    public function createPetugas(Request $request)
    {
        $validator = $request->all();
        $validator['password'] = bcrypt($validator['password']);

        if (User::create($validator)) {
            return to_route('petugas.index')
                ->with('success', 'Data berhasil ditambahkan.');
        }
    }

    public function searching(Request $request)
    {
        $search = $request->query('search', null);

        if ($search !== null && $search !== "") {
            $items = User::where('username', 'like', '%' . $search . '%')
                ->orWhere('nama_pengguna', 'like', '%' . $search . '%')
                ->paginate(20);
        }

        return response()->json(['items' => $items], 200);
    }
}
