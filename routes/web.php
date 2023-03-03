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
        Route::resource('siswa', SiswaController::class)
            ->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
    });
    //! SPP CONTROLLER ROUTE
    Route::controller(SppController::class)->group(function () {
        Route::get('/spp/search', 'search')->name('spp.search');
        Route::resource('spp', SppController::class)
            ->only(['index', 'store', 'edit', 'update', 'destroy']);
    });
    //! PETUGAS CONTROLLER ROUTE
    Route::controller(PetugasController::class)->group(function () {
        Route::get('/petugas/search', 'search')->name('petugas.search');
        Route::resource('petugas', PetugasController::class)
            ->only(['index', 'store', 'edit', 'update', 'destroy'])
            ->parameters(['petugas' => 'user']);
    });
    //! KELAS CONTROLLER ROUTE
    Route::controller(KelasController::class)->group(function () {
        Route::get('/kelas/search', 'search')->name('kelas.search');
        Route::resource('kelas', KelasController::class)->parameters(['kelas' => 'kelas'])->only(['index', 'store', 'edit', 'update', 'destroy']);
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
        Route::get('/laporan/tunggakan', 'tunggakan')->name('tunggakan');
        Route::get('/laporan/tunggakan/cetak/{kelas:id}', 'tunggakanCetak')->name('tunggakan.cetak');
        Route::get('/laporan', 'laporan')->name('laporan');
        Route::get('/laporan/rekap-pembayaran/{kelas:id}', 'rekapLaporan')->name('laporan.rekap');
        Route::resource('pembayaran', PembayaranController::class)
            ->only(['index', 'store']);
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
