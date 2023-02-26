<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\PetugasController;
use App\Http\Controllers\SiswaController;
use App\Http\Controllers\SppController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::group(['prefix' => '/dashboard', 'middleware' => ['auth', 'admin']], function () {
    //! SISWA CONTROLLER ROUTE
    Route::controller(SiswaController::class)->group(function () {
        Route::get('/siswa/search', 'search')->name('siswa.search');
        Route::resource('siswa', SiswaController::class);
    });
    //! SPP CONTROLLER ROUTE
    Route::controller(SppController::class)->group(function () {
        Route::get('/spp/search', 'search')->name('spp.search');
        Route::resource('spp', SppController::class);
    });
    //! PETUGAS CONTROLLER ROUTE
    Route::controller(PetugasController::class)->group(function () {
        Route::get('/petugas/search', 'search')->name('petugas.search');
        Route::resource('petugas', PetugasController::class);
    });
    //! KELAS CONTROLLER ROUTE
    Route::controller(KelasController::class)->group(function () {
        Route::get('/kelas/search', 'search')->name('kelas.search');
        Route::resource('kelas', KelasController::class);
    });
});

Route::group(['prefix' => '/dashboard', 'middleware' => ['auth', 'petugas']], function () {
    //! PEMBAYARAN CONTROLLER ROUTE
    Route::controller(PembayaranController::class)->group(function () {
        Route::get('/pembayaran/search', 'search')->name('pembayaran.search');
        Route::get('/pembayaran/transaksi/search', 'transaksiSearch')->name('transaksi.search');
        Route::get('/pembayaran/transaksi', 'transaksi')->name('transaksi');
        Route::get('/pembayaran/{kwitansi:nis}/kwitansi', 'kwitansi')->name('kwitansi');
        Route::get('/pembayaran/{siswa:nisn}/create', 'create')->name('pembayaran.create');
        Route::resource('pembayaran', PembayaranController::class)->name('create', 'pembayaran.tambah');
    });
    //! DASHBOARD CONTROLLER ROUTE
    Route::controller(DashboardController::class)->group(function () {
        Route::get('profile', 'profile')->name('profile');
        Route::get('/', 'index')->name('dashboard');
    });
});

//! HOME PAGE ROUTE
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home')->middleware('guest');

require __DIR__ . '/auth.php';
