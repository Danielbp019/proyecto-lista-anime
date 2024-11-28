<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::create('animes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->comment('Nombre del anime en español');
            $table->integer('numero_capitulos')->comment('Numero de capitulos');
            $table->boolean('visto')->default(false)->comment('Si el anime terminó es 1, de lo contrario es 0');
            $table->text('comentarios')->nullable()->comment('Expresate para que nunca lo olvides');
            $table->timestamps();
            // Agregar un índice al campo 'nombre'
            $table->index('nombre');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('animes');
    }
};
