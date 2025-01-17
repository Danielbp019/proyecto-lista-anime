<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\ObraModel;
use App\Models\User;
use App\Models\TipoModel;

class ObraControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_obra_index()
    {
        $user = User::factory()->create();
        ObraModel::factory()->count(3)->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->json('GET', '/api/obras', ['id' => $user->id]);

        $response->assertStatus(200);
        $response->assertJsonStructure(['*' => ['id', 'nombre', 'numero_capitulos', 'visto', 'comentarios', 'fecha_actualizacion', 'tipo_id']]);
    }

    public function test_obra_store()
    {
        $user = User::factory()->create();
        // Crear un registro en la tabla tipos
        $tipo = TipoModel::create(['nombretipo' => 'Tipo de Ejemplo']);

        $data = [
            'nombre' => 'Nueva Obra',
            'numero_capitulos' => 12,
            'visto' => 1,
            'comentarios' => 'Este es una nueva obra.',
            'user_id' => $user->id,
            'tipo_id' => $tipo->id
        ];

        $response = $this->actingAs($user)->post('/api/obras', $data);

        $response->assertStatus(201);
        $response->assertJson(['success' => true, 'nuevoObra' => $response['nuevoObra']]);
        $this->assertDatabaseHas('obras', $data);
    }

    public function test_obra_show()
    {
        $obra = ObraModel::factory()->create();
        $user = User::factory()->create();

        $response = $this->actingAs($user)->json('GET', "/api/obras/{$obra->id}");

        $response->assertStatus(200);
        // Verificar campos específicos
        $response->assertJsonPath('id', $obra->id);
        $response->assertJsonPath('nombre', $obra->nombre);
        $response->assertJsonPath('numero_capitulos', $obra->numero_capitulos);
        $response->assertJsonPath('visto', (int)$obra->visto); // Convertir booleano a entero
        $response->assertJsonPath('comentarios', $obra->comentarios);
        $response->assertJsonPath('fecha_actualizacion', $obra->fecha_actualizacion);
        $response->assertJsonPath('tipo_id', $obra->tipo_id);
    }

    public function test_obra_update()
    {
        $obra = ObraModel::factory()->create();
        $user = User::factory()->create();

        $data = [
            'nombre' => 'Obra Actualizado',
            'numero_capitulos' => 24,
            'visto' => 0,
            'comentarios' => 'Este obra ha sido actualizado.',
            'tipo_id' => 1
        ];

        $response = $this->actingAs($user)->put("/api/obras/{$obra->id}", $data);

        $response->assertStatus(200);
        $response->assertJson(['success' => true, 'editarObra' => $response['editarObra']]);
        $this->assertDatabaseHas('obras', $data);
    }

    public function test_obra_destroy()
    {
        $obra = ObraModel::factory()->create();
        $user = User::factory()->create();

        $this->assertDatabaseHas('obras', ['id' => $obra->id]);

        $response = $this->actingAs($user)->delete("/api/obras/{$obra->id}");

        $response->assertStatus(200);
        $response->assertJson(['success' => true, 'message' => 'Obra eliminado correctamente.']);

        $this->assertDatabaseMissing('obras', ['id' => $obra->id]);
    }
}
