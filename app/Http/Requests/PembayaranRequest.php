<?php

namespace App\Http\Requests;

use App\Models\Spp;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PembayaranRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $id_petugas = User::pluck('id');
        $id_spp = Spp::pluck('id');

        return [
            'id_petugas' => ['required', Rule::in($id_petugas)],
            'id_spp' => ['required', Rule::in($id_spp)],
            'nisn' => ['required', 'max:10'],
            'tgl_bayar' => ['required', 'date'],
            'bulan_bayar' => ['required', 'max:12', 'array'],
            'tahun_bayar' => ['required', 'max:4'],
            'jumlah_bayar' => ['required'],
        ];
    }
}
