<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\ObraModel;
use App\Models\User;
use App\Models\TipoModel;

class EstadisticaControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testTotalRegistros()
    {
        $user = User::factory()->create();
        $tipo = TipoModel::factory()->create(['id' => 1]);
        $this->actingAs($user);
        ObraModel::factory()->count(5)->create(['user_id' => $user->id, 'tipo_id' => $tipo->id]);

        $response = $this->json('GET', '/api/total-registros', ['id' => $user->id]);

        $response->assertStatus(200)
            ->assertJson(['total_registros' => 5]);
    }

    public function testTipo1()
    {
        $user = User::factory()->create();
        $tipo = TipoModel::factory()->create(['id' => 1]);
        $this->actingAs($user);
        ObraModel::factory()->count(3)->create(['user_id' => $user->id, 'tipo_id' => $tipo->id]);

        $response = $this->json('GET', '/api/tipo-1', ['id' => $user->id]);

        $response->assertStatus(200)
            ->assertJson(['tipo_1' => 3]);
    }

    public function testTipo2()
    {
        $user = User::factory()->create();
        $tipo = TipoModel::factory()->create(['id' => 2]);
        $this->actingAs($user);
        ObraModel::factory()->count(4)->create(['user_id' => $user->id, 'tipo_id' => $tipo->id]);

        $response = $this->json('GET', '/api/tipo-2', ['id' => $user->id]);

        $response->assertStatus(200)
            ->assertJson(['tipo_2' => 4]);
    }

    public function testTipo3()
    {
        $user = User::factory()->create();
        $tipo = TipoModel::factory()->create(['id' => 3]);
        $this->actingAs($user);
        ObraModel::factory()->count(2)->create(['user_id' => $user->id, 'tipo_id' => $tipo->id]);

        $response = $this->json('GET', '/api/tipo-3', ['id' => $user->id]);

        $response->assertStatus(200)
            ->assertJson(['tipo_3' => 2]);
    }

    public function testTipo4()
    {
        $user = User::factory()->create();
        $tipo = TipoModel::factory()->create(['id' => 4]);
        $this->actingAs($user);
        ObraModel::factory()->count(6)->create(['user_id' => $user->id, 'tipo_id' => $tipo->id]);

        $response = $this->json('GET', '/api/tipo-4', ['id' => $user->id]);

        $response->assertStatus(200)
            ->assertJson(['tipo_4' => 6]);
    }

    public function testOtrosTipos()
    {
        $user = User::factory()->create();
        $tipo5 = TipoModel::factory()->create(['id' => 5]);
        $tipo6 = TipoModel::factory()->create(['id' => 6]);
        $this->actingAs($user);
        ObraModel::factory()->count(2)->create(['user_id' => $user->id, 'tipo_id' => $tipo5->id]);
        ObraModel::factory()->count(3)->create(['user_id' => $user->id, 'tipo_id' => $tipo6->id]);

        $response = $this->json('GET', '/api/otros-tipos', ['id' => $user->id]);

        $response->assertStatus(200)
            ->assertJson(['otros_tipos' => 5]);
    }
}
