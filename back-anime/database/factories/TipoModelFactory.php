<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\TipoModel;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TipoModel>
 */
class TipoModelFactory extends Factory
{
    protected $model = TipoModel::class;

    public function definition(): array
    {
        return [
            'nombretipo' => $this->faker->word,
        ];
    }
}
