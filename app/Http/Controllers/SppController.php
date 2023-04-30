<?php

namespace App\Http\Controllers;

use App\Http\Requests\SppRequest;
use App\Models\Spp;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SppController extends Controller
{

    public function search(Request $request)
    {
        $search = $request->query('search', null);

        if ($search !== null && $search !== "") {
            $items = Spp::where('nominal', 'like', '%' . $search . '%')
                ->orWhere('tahun', 'like', '%' . $search . '%')
                ->paginate(20);
        }

        return response()->json(['items' => $items], 200);
    }

    public function index(Request $request)
    {
        $short = $request->query('short', 20);

        $items = Spp::orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->paginate($short);

        return Inertia::render('Dashboard/Spp/Home', [
            'items' => $items,
            'user' => auth()->user(),
            'short' => $short,
        ]);
    }

    public function store(SppRequest $request)
    {
        if (Spp::create($request->all())) {
            return to_route('spp.index')
                ->with('success', 'Data berhasil di tambah kan');
        }

        return back()->with('error', 'Data gagal di tambah kan');
    }

    public function edit(Spp $spp)
    {
        return response()->json([
            'item' => $spp,
        ]);
    }

    public function update(SppRequest $request, Spp $spp)
    {
        if ($spp->update($request->all())) {
            return to_route('spp.index')
                ->with('success', 'Data berhasil di edit');
        }

        return back()->with('error', 'Data gagal di edit');
    }

    public function destroy(Spp $spp)
    {
        $spp->delete();

        return back();
    }
}
