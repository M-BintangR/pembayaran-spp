<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Spp extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function pembayaran()
    {
        return $this->hasMany(Pembayaran::class, 'id_spp', 'id');
    }

    public function siswa()
    {
        return $this->hasMany(Siswa::class, 'id_spp', 'id');
    }
}
