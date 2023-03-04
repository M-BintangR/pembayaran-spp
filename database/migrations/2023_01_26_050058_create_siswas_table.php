<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('siswas', function (Blueprint $table) {
            $table->id();
            $table->char('nisn', 10)->unique();
            $table->char('nis', 8)->unique();
            $table->string('nama', 35);
            $table->enum('jk', ['p', 'l']);
            $table->foreignId('id_kelas');
            $table->text('alamat');
            $table->enum('level', ['X', 'XI', 'XII']);
            $table->char('no_telp', 15);
            $table->foreignId('id_spp');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('siswas');
    }
};
