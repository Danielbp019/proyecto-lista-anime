<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    public $incrementing = false; // Desactiva el incremento automático del ID
    protected $keyType = 'string'; // Define que la clave primaria es de tipo string
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid(); // Genera un UUID como string
            }
        });
    }

    // Obtiene el valor de la llave primaria por medio del modelo.
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    // Se usa para retornar informacion del usuario en el token.
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Define la relación con el modelo ObraModel.
     */
    public function obras()
    {
        return $this->hasMany(ObraModel::class, 'user_id', 'id');
    }
}
