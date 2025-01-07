<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\ObraModel;

class ObraControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_obra_index()
    {
        $response = $this->get('/api/obras');
        $response->assertStatus(200);
        $response->assertJsonStructure(['*' => ['id', 'nombre', 'numero_capitulos', 'visto', 'comentarios', 'fecha_actualizacion']]);
    }

    public function test_obra_store()
    {
        $data = ['nombre' => 'Nuevo Obra', 'numero_capitulos' => 12, 'visto' => 1, 'comentarios' => 'Este es un nuevo obra.', 'fecha_actualizacion' => '2024-12-01'];
        $response = $this->post('/api/obras', $data);
        $response->assertStatus(201);
        $response->assertJson(['success' => true, 'nuevoObra' => $data]);
        $this->assertDatabaseHas('obras', $data);
    }

    public function test_obra_show()
    {
        $obra = ObraModel::factory()->create();
        $response = $this->get("/api/obras/{$obra->id}");
        $response->assertStatus(200);
        // Verificar campos específicos
        $response->assertJsonPath('id', $obra->id);
        $response->assertJsonPath('nombre', $obra->nombre);
        $response->assertJsonPath('numero_capitulos', $obra->numero_capitulos);
        $response->assertJsonPath('visto', (int) $obra->visto); // Convertir booleano a entero
        $response->assertJsonPath('comentarios', $obra->comentarios);
        $response->assertJsonPath('fecha_actualizacion', $obra->fecha_actualizacion);
    }

    public function test_obra_update()
    {
        $obra = ObraModel::factory()->create();
        $data = ['nombre' => 'Obra Actualizado', 'numero_capitulos' => 24, 'visto' => 0, 'comentarios' => 'Este obra ha sido actualizado.', 'fecha_actualizacion' => '2024-12-01'];
        $response = $this->put("/api/obras/{$obra->id}", $data);
        $response->assertStatus(200);
        $response->assertJson(['success' => true, 'editarObra' => $data]);
        $this->assertDatabaseHas('obras', $data);
    }

    public function test_obra_destroy()
    {
        // Crea una instancia de Obra para la prueba
        $obra = ObraModel::factory()->create();
        // Verifica que el obra ha sido creado
        $this->assertDatabaseHas('obras', ['id' => $obra->id]);
        // Realiza la solicitud de eliminación
        $response = $this->delete("/api/obras/{$obra->id}");
        // Verifica el estado de la respuesta
        $response->assertStatus(200);
        $response->assertJson(['success' => true, 'message' => 'Obra eliminado correctamente.']);
        // Verifica que el obra ha sido eliminado
        $this->assertDatabaseMissing('obras', ['id' => $obra->id]);
    }
}
