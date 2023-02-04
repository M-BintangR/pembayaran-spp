<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\PetugasController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\SppController;
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

Route::redirect('/', 'login');

Route::group(['prefix' => '/dashboard', 'middleware' => ['auth', 'admin']], function () {
    Route::get('/kelas', [KelasController::class, 'index'])->name('kelas.index');
    Route::get('/kelas/{kelas:id}/edit', [KelasController::class, 'edit'])->name('kelas.edit');
    Route::put('/kelas/{kelas:id}', [KelasController::class, 'update'])->name('kelas.update');
    Route::get('/kelas/create', [KelasController::class, 'create'])->name('kelas.create');
    Route::post('/kelas', [KelasController::class, 'store'])->name('kelas.store');
    Route::delete('/kelas/{kelas:id}', [KelasController::class, 'destroy'])->name('kelas.destroy');
    Route::get('/kelas/short/{query}', [KelasController::class, 'index'])->name('kelas.short');

    Route::get('/siswa', [SiswaController::class, 'index'])->name('siswa.index');
    Route::get('/siswa/{siswa:id}/edit', [SiswaController::class, 'edit'])->name('siswa.edit');
    Route::put('/siswa/{siswa:id}', [SiswaController::class, 'update'])->name('siswa.update');
    Route::get('/siswa/create', [SiswaController::class, 'create'])->name('siswa.create');
    Route::post('/siswa', [SiswaController::class, 'store'])->name('siswa.store');
    Route::delete('/siswa/{siswa:id}', [SiswaController::class, 'destroy'])->name('siswa.destroy');
    Route::get('/siswa/short/{query}', [SiswaController::class, 'index'])->name('siswa.short');

    Route::get('/petugas', [PetugasController::class, 'index'])->name('petugas.index');
    Route::get('/petugas/{user:id}/edit', [PetugasController::class, 'edit'])->name('petugas.edit');
    Route::put('/petugas/{user:id}', [PetugasController::class, 'update'])->name('petugas.update');
    Route::get('/petugas/create', [PetugasController::class, 'create'])->name('petugas.create');
    Route::post('/petugas', [PetugasController::class, 'store'])->name('petugas.store');
    Route::delete('/petugas/{user:id}', [PetugasController::class, 'destroy'])->name('petugas.destroy');
    Route::get('/petugas/short/{query}', [PetugasController::class, 'index'])->name('petugas.short');

    Route::get('/spp', [SppController::class, 'index'])->name('spp.index');
    Route::get('/spp/{spp:id}/edit', [SppController::class, 'edit'])->name('spp.edit');
    Route::put('/spp/{spp:id}', [SppController::class, 'update'])->name('spp.update');
    Route::get('/spp/create', [SppController::class, 'create'])->name('spp.create');
    Route::post('/spp', [SppController::class, 'store'])->name('spp.store');
    Route::delete('/spp/{spp:id}', [SppController::class, 'destroy'])->name('spp.destroy');
    Route::get('/spp/short/{query}', [SppController::class, 'index'])->name('spp.short');

    Route::get('/pembayaran', [PembayaranController::class, 'index'])->name('pembayaran.index');
    Route::get('/pembayaran/{pembayaran:id}/edit', [PembayaranController::class, 'edit'])->name('pembayaran.edit');
    Route::put('/pembayaran/{pembayaran:id}', [PembayaranController::class, 'update'])->name('pembayaran.update');
    Route::get('/pembayaran/create', [PembayaranController::class, 'create'])->name('pembayaran.create');
    Route::post('/pembayaran', [PembayaranController::class, 'store'])->name('pembayaran.store');
    Route::delete('/pembayaran/{pembayaran:id}', [PembayaranController::class, 'destroy'])->name('pembayaran.destroy');
    Route::get('/pembayaran/short/{query}', [PembayaranController::class, 'index'])->name('pembayaran.short');
});

Route::get('/dashboard/profile', [DashboardController::class, 'profile'])->name('profile');

Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
