<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AnimeModel extends Model
{
    use HasFactory;

    protected $table = 'animes';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'numero_capitulos',
        'visto',
        'comentarios',
        'fecha_actualizacion'
    ];

    protected $casts = [
        'visto' => 'integer',
    ];
}
