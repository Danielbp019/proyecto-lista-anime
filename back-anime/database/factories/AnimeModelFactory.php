<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\AnimeModel;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AnimeModel>
 */
class AnimeModelFactory extends Factory
{
    protected $model = AnimeModel::class;

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
