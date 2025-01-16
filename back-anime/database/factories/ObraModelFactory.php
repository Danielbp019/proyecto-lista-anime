<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ObraModel;
use App\Models\User;
use App\Models\TipoModel;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ObraModel>
 */
class ObraModelFactory extends Factory
{
    protected $model = ObraModel::class;

    public function definition(): array
    {
        return [
            'nombre' => $this->faker->unique()->word,
            'numero_capitulos' => $this->faker->numberBetween(1, 100),
            'visto' => $this->faker->randomElement([0, 1]),
            'comentarios' => $this->faker->sentence,
            'fecha_actualizacion' => $this->faker->date(),
            'user_id' => function () {
                return User::factory()->create()->id;
            },
            'tipo_id' => function () {
                return TipoModel::factory()->create()->id;
            },
        ];
    }
}
