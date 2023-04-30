<?php

namespace App\Http\Requests;

use App\Models\Kelas;
use App\Models\Spp;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SiswaRequest extends FormRequest
{
    private $id_spp, $id_kelas, $validate;
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
        $this->id_spp = Spp::pluck('id');
        $this->id_kelas = Kelas::pluck('id');

        $this->validate = [
            'nisn' => ['required', 'min:1', 'max:10', 'unique:siswas,nisn'],
            'nis' => ['required', 'max:7', 'unique:siswas,nis'],
            'nama' => ['required', 'min:1', 'max:35'],
            'jk' => ['required', 'min:1'],
            'id_kelas' => ['required', Rule::in($this->id_kelas)],
            'alamat' => ['required', 'min:1'],
            'id_spp' => ['nullable', Rule::in($this->id_spp)],
            'no_telp' => ['required', 'min:1', 'max:13'],
        ];

        switch ($this->method()) {
            case 'POST':
                return $this->validate;
            case 'PUT':
            case 'PATCH':
                $this->validate['nisn'] = ['required', 'min:1', 'max:10'];
                $this->validate['nis'] = ['required', 'max:7'];
                return $this->validate;
            default:
                break;
        }
    }
}
