<?php

namespace App\Http\Controllers;

use App\Models\Spp;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SppController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $items = Spp::orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->paginate(20);

        return Inertia::render('Dashboard/Spp/Home', [
            'items' => $items,
            'user' => auth()->user(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validateData = $request->validate([
            'nominal' => ['required'],
            'tahun' => ['required'],
        ]);

        if (Spp::create($validateData)) {
            return redirect(route('spp.index'))
                ->with('success', 'Data berhasil di tambah kan');
        }

        return back()->with('error', 'Data gagal di tambah kan');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Spp  $spp
     * @return \Illuminate\Http\Response
     */

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Spp  $spp
     * @return \Illuminate\Http\Response
     */
    public function edit(Spp $spp)
    {
        return response()->json([
            'item' => $spp,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Spp  $spp
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Spp $spp)
    {

        $credentials = $request->validate([
            'nominal' => ['required'],
            'tahun' => ['required'],
        ]);

        if ($spp->update($credentials)) {
            return redirect(route('spp.index'))
                ->with('success', 'Data berhasil di edit');
        }

        return back()->with('error', 'Data gagal di edit');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Spp  $spp
     * @return \Illuminate\Http\Response
     */
    public function destroy(Spp $spp)
    {
        $spp->delete();

        return back();
    }
}
