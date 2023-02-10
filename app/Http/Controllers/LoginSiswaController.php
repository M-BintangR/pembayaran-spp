<?php

namespace App\Http\Controllers;

use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginSiswaController extends Controller
{
    public function store(Request $request)
    {
        // return $request;
        $credentials = $request->validate([
            'nisn' => ['required', 'max:10'],
            'nis' => ['required', 'max:7'],
            'password' => ['nullable'],
        ]);

        if (Auth::guard('siswa')->attempt($credentials)) {
            $request->authenticate();

            $request->session()->regenerate();

            return redirect()->intended(route('panel.siswa'));
        }

        return redirect()->back();
    }
}
