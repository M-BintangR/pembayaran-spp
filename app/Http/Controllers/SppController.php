<?php

namespace App\Http\Controllers;

use App\Models\Spp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

use function Termwind\render;

class SppController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($query = 10)
    {
        $items = Spp::orderBy('created_at', 'desc')->paginate($query);
        return Inertia::render('Dashboard/Spp/Home', [
            'items' => $items,
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

        if ($validateData) {
            $check = Spp::create($validateData);
        }

        if ($check) {
            return redirect(route('spp.index'))->with('success', 'Data berhasil di tambah kan');
        }

        return redirect()->back()->with('error', 'Data gagal di tambah kan');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Spp  $spp
     * @return \Illuminate\Http\Response
     */
    public function show(Spp $spp)
    {
        //
    }

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

        if ($credentials) {
            $check = $spp->update($credentials);
        }

        if ($check) {
            return redirect(route('spp.index'))->with('success', 'Data berhasil di edit');
        }

        return redirect()->back()->with('error', 'Data gagal di edit');
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

        Redirect::back();
    }
}