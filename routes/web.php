<?php

use App\Http\Controllers\KelasController;
use App\Http\Controllers\PetugasController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\SppController;
use App\Models\Pembayaran;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::group(['prefix' => '/dashboard'], function () {
    Route::group(['prefix' => '/kelas'], function () {
        Route::get('/', [KelasController::class, 'index'])->name('kelas.index');
    });

    Route::group(['prefix' => '/siswa'], function () {
        Route::get('/', [SiswaController::class, 'index'])->name('siswa.index');
    });

    Route::group(['prefix' => '/petugas'], function () {
        Route::get('/', [PetugasController::class, 'index'])->name('petugas.index');
    });

    Route::group(['prefix' => '/spp'], function () {
        Route::get('/', [SppController::class, 'index'])->name('spp.index');
    });

    Route::group(['prefix' => '/pembayaran'], function () {
        Route::get('/', [Pembayaran::class, 'index'])->name('pembayaran.index');
    });
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/PanelAdmin');
})->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';