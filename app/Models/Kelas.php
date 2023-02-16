<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kelas extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function siswa()
    {
        return $this->hasMany(Siswa::class, 'id_kelas', 'id');
    }

    // ! Triger kelas->siswa->pembayaran
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($kelas) {
            foreach ($kelas->siswa as $siswa) {
                foreach ($siswa->pembayaran as $pembayaran) {
                    $pembayaran->delete();
                }
                $siswa->delete();
            }
        });
    }
}
