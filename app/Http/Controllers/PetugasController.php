<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PetugasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = User::orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->paginate(20);

        return Inertia::render('Dashboard/Petugas/Home', [
            'items' => $items,
            'user' => auth()->user(),
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
            'username' => ['required', 'min:1', 'max:25'],
            'nama_pengguna' => ['required', 'min:1', 'max:35'],
            'password' => ['required', 'min:8', 'max:32'],
            'level' => ['required'],
        ]);

        $validateData['password'] = bcrypt($validateData['password']);

        if (User::create($validateData)) {
            return redirect(route('petugas.index'))
                ->with('success', 'Data berhasil ditambahkan.');
        }

        return back()->with('error', 'Data gagal ditambahkan.');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return response()->json([
            'item' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $credentials = $request->validate([
            'username' => ['required', 'min:1', 'max:25'],
            'nama_pengguna' => ['required', 'min:1', 'max:35'],
            'level' => ['required', 'min:1'],
        ]);

        if ($user->update($credentials)) {
            return redirect(route('petugas.index'))
                ->with('success', 'Data berhasil di tambah kan');
        }

        return back()->with('error' . 'Data gagal di tambah kan');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();

        return back();
    }
}
