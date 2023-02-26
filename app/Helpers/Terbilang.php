<?php

namespace App\Helpers;

class Terbilang
{
    public static function konversi($angka)
    {
        $bilangan = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];

        if ($angka < 12) {
            return $bilangan[$angka];
        } else if ($angka < 20) {
            return self::konversi($angka - 10) . ' belas';
        } else if ($angka < 100) {
            return self::konversi($angka / 10) . ' puluh ' . self::konversi($angka % 10);
        } else if ($angka < 200) {
            return ' seratus ' . self::konversi($angka - 100);
        } else if ($angka < 1000) {
            return self::konversi($angka / 100) . ' ratus ' . self::konversi($angka % 100);
        } else if ($angka < 2000) {
            return ' seribu ' . self::konversi($angka - 1000);
        } else if ($angka < 1000000) {
            return self::konversi($angka / 1000) . ' ribu ' . self::konversi($angka % 1000);
        } else if ($angka < 1000000000) {
            return self::konversi($angka / 1000000) . ' juta ' . self::konversi($angka % 1000000);
        } else if ($angka < 1000000000000) {
            return self::konversi($angka / 1000000000) . ' milyar ' . self::konversi(fmod($angka, 1000000000));
        } else if ($angka < 1000000000000000) {
            return self::konversi($angka / 1000000000000) . ' trilyun ' . self::konversi(fmod($angka, 1000000000000));
        } else {
            return 'tidak terdefinisi';
        }
    }
}
