<?php

namespace App\Services;

use App\Models\Kelas;
use Illuminate\Http\Request;

class KelasService
{

    public function searching(Request $request)
    {
        $search = $request->query('search', null);

        if ($search !== null && $search !== "") {
            $items = Kelas::where('nama_kelas', 'like', '%' . $search . '%')
                ->orWhere('kompetensi_keahlian', 'like', '%' . $search . '%')
                ->paginate(20);
        }

        return response()->json(['items' => $items], 200);
    }

    public function getKelas(Request $request): array
    {
        $short = $request->query('short', 20);

        $items = Kelas::orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->paginate($short);

        return [
            'items' => $items,
            'short' => $short,
        ];
    }
}
