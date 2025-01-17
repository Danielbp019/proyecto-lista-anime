<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\TipoModel;

class TipoControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testIndex()
    {
        $user = User::factory()->create();
        TipoModel::factory()->count(3)->create();

        $response = $this->actingAs($user)->json('GET', '/api/tipos');

        $response->assertStatus(200)
            ->assertJsonCount(3);
    }

    public function testStore()
    {
        $user = User::factory()->create();
        $data = ['nombretipo' => 'Nuevo Tipo'];

        $response = $this->actingAs($user)->json('POST', '/api/tipos', $data);

        $response->assertStatus(201)
            ->assertJson(['success' => true])
            ->assertJsonStructure(['success', 'nuevosTipos' => ['id', 'nombretipo']]);
    }

    public function testShow()
    {
        $user = User::factory()->create();
        $tipo = TipoModel::factory()->create();

        $response = $this->actingAs($user)->json('GET', "/api/tipos/{$tipo->id}");

        $response->assertStatus(200)
            ->assertJson(['id' => $tipo->id, 'nombretipo' => $tipo->nombretipo]);
    }

    public function testUpdate()
    {
        $user = User::factory()->create();
        $tipo = TipoModel::factory()->create();
        $data = ['nombretipo' => 'Tipo Actualizado'];

        $response = $this->actingAs($user)->json('PATCH', "/api/tipos/{$tipo->id}", $data);

        $response->assertStatus(200)
            ->assertJson(['success' => true])
            ->assertJsonStructure(['success', 'editarTipos' => ['id', 'nombretipo']]);
    }

    public function testDestroy()
    {
        $user = User::factory()->create();
        $tipo = TipoModel::factory()->create();

        $response = $this->actingAs($user)->json('DELETE', "/api/tipos/{$tipo->id}");

        $response->assertStatus(200)
            ->assertJson(['success' => true, 'message' => 'Tipo eliminado correctamente.']);
    }
}
