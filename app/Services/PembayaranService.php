<?php

namespace App\Services;

use App\Helpers\Terbilang;
use App\Models\Kwitansi;
use App\Models\Pembayaran;
use App\Models\Siswa;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;

class PembayaranService
{
    public function getKuitansi(Request $request): array
    {
        $short = $request->query('short', 20);

        $items = Kwitansi::orderBy('created_at', 'desc')
            ->orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->paginate($short);

        return [
            'items' => $items,
            'short' => $short,
        ];
    }

    public function getDataPembayaranSiswa(Siswa $siswa): array
    {
        $bulan_bayar = $siswa->pembayaran->pluck('bulan_bayar')->toArray();

        return [
            'siswa' => $siswa,
            'kelas' => $siswa->kelas->nama_kelas,
            'spp' => $siswa->spp->nominal,
            'bulan_bayar' => $bulan_bayar,
        ];
    }

    public function getKuitansiSiswa(Kwitansi $kwitansi): array
    {
        $nominal = $kwitansi->siswa->spp->nominal;
        $total_bulan = count($kwitansi->siswa->pembayaran);
        $total =  $nominal * $total_bulan;
        $terbilang = Terbilang::konversi($total);
        $tanggal = Carbon::now()->isoFormat('dddd, D MMMM YYYY');

        return [
            'siswa' => $kwitansi->siswa,
            'pembayaran' => $total,
            'kwitansi' => $kwitansi,
            'tanggal' => $tanggal,
            'kelas' => $kwitansi->siswa->kelas,
            'terbilang' => strtoupper($terbilang),
        ];
    }

    public function getTransaksi(Request $request): array
    {
        $short = $request->query('short', 20);

        $siswa = Siswa::select('id', 'nama', 'nis', 'nisn', 'id_kelas')
            ->with([
                'kelas' => function ($query) {
                    $query->select('id', 'nama_kelas');
                },
                'pembayaran' => function ($query) {
                    $query->select('nisn', 'bulan_bayar');
                }
            ])
            ->orderBy('created_at', 'desc')
            ->orderBy('updated_at', 'desc')
            ->paginate($short);

        return [
            'siswa' => $siswa,
            'short' => $short,
        ];
    }

    public function searching(Request $request, $kind)
    {
        $search = $request->query('search', null);

        switch ($kind) {
            case 'index':
                $items = Kwitansi::where('nis', 'LIKE', '%' . $search . '%')
                    ->orWhere('tanggal', 'LIKE', '%' . $search . '%')
                    ->orWhere('bulan', 'LIKE', '%' . $search . '%')
                    ->paginate(20);
                break;
            case 'transaksi':
                $items = Siswa::with(['kelas', 'pembayaran'])
                    ->where(function ($query) use ($search) {
                        $query
                            ->where('nama', 'like', '%' . $search . '%')
                            ->orWhere('nis', 'like', '%' . $search . '%')
                            ->orWhere('nisn', 'like', '%' . $search . '%');
                    })->orWhereHas('kelas', function ($query) use ($search) {
                        $query->where('nama_kelas', 'like', '%' . $search . '%');
                    })->orWhereHas('pembayaran', function ($query) use ($search) {
                        $query->where('bulan_bayar', 'like', '%' . $search . '%');
                    })->paginate(20);
                break;
            default:
                break;
        }

        return response()->json(['items' => $items], 200);
    }

    public function createPembayaran(Request $request)
    {
        $existingPayments = Pembayaran::where('nisn', $request['nisn'])
            ->whereIn('bulan_bayar', array_column($request['bulan_bayar'], 'value'))
            ->get();

        if ($existingPayments->isNotEmpty()) {
            return back()->with('error', 'Pembayaran Bulan ini Sudah');
        }
        try {

            foreach ($request['bulan_bayar'] as $bulan) {
                $pembayaran = Pembayaran::create([
                    'id_petugas' => $request['id_petugas'],
                    'id_spp' => $request['id_spp'],
                    'nisn' => $request['nisn'],
                    'tgl_bayar' => $request['tgl_bayar'],
                    'bulan_bayar' => $bulan['value'],
                    'tahun_bayar' => $request['tahun_bayar'],
                    'jumlah_bayar' => $request['jumlah_bayar'],
                ]);
            }

            if ($pembayaran) {
                $siswa = Siswa::query()
                    ->where('nisn', $request->nisn)
                    ->firstOrFail();
                $bulan = array_column($request->bulan_bayar, 'value');
                $kwitansi = Kwitansi::query()
                    ->where('nis', $siswa->nis)->first();

                if ($kwitansi) {
                    $bulan_baru = array_merge(explode(",", $kwitansi->bulan), $bulan);
                    $bulan_baru = array_unique($bulan_baru);
                    sort($bulan_baru);

                    $kwitansi->update([
                        'tanggal' => now()->format('Y-m-d'),
                        'bulan' => implode(",", $bulan_baru),
                    ]);
                } else {
                    Kwitansi::create([
                        'nis' => $siswa->nis,
                        'tanggal' => now()->format('Y-m-d'),
                        'bulan' => implode(",", $bulan),
                    ]);
                }
            }
            return to_route('transaksi')->with('success', 'Data berhasil di tambahkan');
        } catch (Exception $e) {
            return back()->with('error', $e);
        }
    }
}
