<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PetugasRequest extends FormRequest
{
    private $validate;
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
        $this->validate = [
            'username' => ['required', 'min:1', 'max:25'],
            'nama_pengguna' => ['required', 'min:1', 'max:35'],
            'level' => ['required', 'min:1'],
        ];

        switch ($this->method()) {
            case 'POST':
                $this->validate += ['password' => ['required', 'min:8', 'max:32']];
                return $this->validate;
            case 'PUT':
            case 'PATCH':
                return $this->validate;
            default:
                break;
        }
    }
}
