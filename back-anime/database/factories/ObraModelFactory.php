<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\ObraModel;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ObraModel>
 */
class ObraModelFactory extends Factory
{
    protected $model = ObraModel::class;

    public function definition()
    {
        return [
            'nombre' => $this->faker->word,
            'numero_capitulos' => $this->faker->numberBetween(1, 100),
            'visto' => $this->faker->randomElement([0, 1]),
            'comentarios' => $this->faker->sentence,
            'fecha_actualizacion' => $this->faker->date(),
        ];
    }
}
