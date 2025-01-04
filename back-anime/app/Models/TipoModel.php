<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TipoModel extends Model
{
    use HasFactory;

    protected $table = 'tipos';

    public $timestamps = false;

    protected $fillable = [
        'nombretipo'
    ];

    /** * Obtener los animes para este tipo. */
    public function animes()
    {
        return $this->hasMany(AnimeModel::class, 'tipo_id', 'id');
    }
}
