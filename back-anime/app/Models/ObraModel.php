<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ObraModel extends Model
{
    use HasFactory;

    protected $table = 'obras';

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'numero_capitulos',
        'visto',
        'comentarios',
        'fecha_actualizacion',
        'user_id',
        'tipo_id'
    ];

    protected $casts = [
        'visto' => 'integer',
    ];

    /** * Obtener el usuario que posee este obra. */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /** * Obtener el tipo al que pertenece este obra. */
    public function tipo()
    {
        return $this->belongsTo(TipoModel::class, 'tipo_id', 'id');
    }
}
