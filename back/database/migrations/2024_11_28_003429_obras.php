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
        // Crear la tabla tipos
        Schema::create('tipos', function (Blueprint $table) {
            $table->id();
            $table->string('nombretipo')->comment('Nombre del tipo: obra, dorama, serie.')->nullable(false)->unique();
        });

        // Crear la tabla obras
        Schema::create('obras', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->comment('Nombre del obra en español')->nullable(false)->unique();
            $table->integer('numero_capitulos')->comment('Número de capítulos')->nullable(false);
            $table->boolean('visto')->comment('Si el obra terminó es 1, de lo contrario es 0')->nullable(false);
            $table->text('comentarios')->nullable()->comment('Expresate para que nunca lo olvides');
            $table->date('fecha_actualizacion')->nullable()->comment('Fecha de la última actualización');
            $table->char('user_id', 36); // Campo para la relación con la tabla users
            $table->unsignedBigInteger('tipo_id'); // Campo para la relación con la tabla tipos
            // Agregar un índice al campo 'nombre'
            $table->index('nombre');
            // Establecer las claves foráneas
            $table->foreign('user_id')->references('id')->on('users')->cascadeOnDelete();
            $table->foreign('tipo_id')->references('id')->on('tipos')->noActionOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Eliminar la tabla obras primero
        Schema::dropIfExists('obras');
        // Luego eliminar la tabla tipos
        Schema::dropIfExists('tipos');
    }
};
