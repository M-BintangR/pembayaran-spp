<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PetugasController extends Controller
{

    public function search(Request $request)
    {
        $search = $request->query('search', null);

        if ($search !== null && $search !== "") {
            $items = User::where('username', 'like', '%' . $search . '%')
                ->orWhere('nama_pengguna', 'like', '%' . $search . '%')
                ->paginate(20);
        }

        return response()->json(['items' => $items], 200);
    }

    public function index(Request $request)
    {
        $short = $request->query('short', 20);

        $items = User::orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->paginate($short);

        return Inertia::render('Dashboard/Petugas/Home', [
            'items' => $items,
            'user' => auth()->user(),
            'short' => $short,
        ]);
    }

    public function store(Request $request)
    {
        $validateData = $request->validate([
            'username' => ['required', 'min:1', 'max:25'],
            'nama_pengguna' => ['required', 'min:1', 'max:35'],
            'password' => ['required', 'min:8', 'max:32'],
            'level' => ['required'],
        ]);

        $validateData['password'] = bcrypt($validateData['password']);

        if (User::create($validateData)) {
            return to_route('petugas.index')
                ->with('success', 'Data berhasil ditambahkan.');
        }

        return back()->with('error', 'Data gagal ditambahkan.');
    }

    public function edit(User $user)
    {
        return response()->json([
            'item' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $credentials = $request->validate([
            'username' => ['required', 'min:1', 'max:25'],
            'nama_pengguna' => ['required', 'min:1', 'max:35'],
            'level' => ['required', 'min:1'],
        ]);

        if ($user->update($credentials)) {
            return to_route('petugas.index')
                ->with('success', 'Data berhasil di tambah kan');
        }

        return back()->with('error' . 'Data gagal di tambah kan');
    }

    public function destroy(User $user)
    {
        $user->delete();
        return back();
    }
}
