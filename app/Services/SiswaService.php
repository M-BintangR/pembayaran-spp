<?php

namespace App\Services;

use App\Models\Kelas;
use App\Models\Siswa;
use App\Models\Spp;
use Illuminate\Http\Request;

class SiswaService
{
    public function getSiswa(Request $request): array
    {
        $short = $request->query('short', 20);
        $items = Siswa::with(
            [
                'kelas' => function ($query) {
                    $query->select('id', 'nama_kelas');
                },
                'spp' => function ($query) {
                    $query->select('id', 'nominal');
                }
            ]
        )
            ->orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->paginate($short);

        return [
            'items' => $items,
            'short' => $short,
        ];
    }

    public function getDataKelas(): array
    {
        $data_kelas = Kelas::all();
        return [
            'kelas' => $data_kelas,
        ];
    }

    public function editSiswa(Siswa $siswa): array
    {
        $data_kelas = Kelas::all();
        return [
            'item' => $siswa,
            'kelas' => $data_kelas,
        ];
    }

    public function updateSiswa(Request $request, Siswa $siswa)
    {
        $IdKelas = $request['id_kelas'];
        $kelas = Kelas::where('id', $IdKelas)->firstOrFail();

        if ($kelas) {
            $arr = explode(" ", $kelas->nama_kelas);
            $data_spp = Spp::where('level', $arr[0])->firstOrFail();
            if ($data_spp) {
                $request['id_spp'] = $data_spp->id;
            } else {
                $request['id_spp'] = 1;
            }
        }

        if ($siswa->update($request->all())) {
            return to_route('siswa.index')
                ->with('success');
        }
    }

    public function createSiswa(Request $request)
    {
        $IdKelas = $request['id_kelas'];
        $kelas = Kelas::where('id', $IdKelas)->firstOrFail();

        if ($kelas) {
            $arr = explode(" ", $kelas->nama_kelas);
            $data_spp = Spp::where('level', $arr[0])->firstOrFail();
            if ($data_spp) {
                $request['id_spp'] = $data_spp->id;
            } else {
                $request['id_spp'] = 1;
            }
        }

        if (Siswa::create($request->all())) {
            return to_route('siswa.index')
                ->with('success', 'Data berhasil di tambah kan');
        }
    }

    public function searching(Request $request)
    {
        $search = $request->query('search', null);

        $items = Siswa::with(['kelas', 'spp'])
            ->where(function ($query) use ($search) {
                $query
                    ->where('nama', 'like', "%{$search}%")
                    ->orWhere('nis', 'like', "%{$search}%")
                    ->orWhere('nisn', 'like', "%{$search}%")
                    ->orWhere('alamat', 'like', "%{$search}%")
                    ->orWhere('jk', 'like', "%{$search}%")
                    ->orWhere('no_telp', 'like', "%{$search}%");
            })->orWhereHas('kelas', function ($query) use ($search) {
                $query
                    ->where('nama_kelas', 'like', "%{$search}%");
            })->orWhereHas('spp', function ($query) use ($search) {
                $query
                    ->where('nominal', 'like', "%{$search}%");
            })
            ->orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->paginate(20);

        return response()->json(['items' => $items], 200);
    }
}
