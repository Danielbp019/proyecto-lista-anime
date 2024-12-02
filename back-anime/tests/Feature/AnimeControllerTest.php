<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\AnimeModel;

class AnimeControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_anime_index()
    {
        $response = $this->get('/api/animes');
        $response->assertStatus(200);
        $response->assertJsonStructure(['*' => ['id', 'nombre', 'numero_capitulos', 'visto', 'comentarios', 'fecha_actualizacion']]);
    }

    public function test_anime_store()
    {
        $data = ['nombre' => 'Nuevo Anime', 'numero_capitulos' => 12, 'visto' => 1, 'comentarios' => 'Este es un nuevo anime.', 'fecha_actualizacion' => '2024-12-01'];
        $response = $this->post('/api/animes', $data);
        $response->assertStatus(201);
        $response->assertJson(['success' => true, 'nuevoAnime' => $data]);
        $this->assertDatabaseHas('animes', $data);
    }

    public function test_anime_show()
    {
        $anime = AnimeModel::factory()->create();
        $response = $this->get("/api/animes/{$anime->id}");
        $response->assertStatus(200);
        // Verificar campos específicos
        $response->assertJsonPath('id', $anime->id);
        $response->assertJsonPath('nombre', $anime->nombre);
        $response->assertJsonPath('numero_capitulos', $anime->numero_capitulos);
        $response->assertJsonPath('visto', (int) $anime->visto); // Convertir booleano a entero
        $response->assertJsonPath('comentarios', $anime->comentarios);
        $response->assertJsonPath('fecha_actualizacion', $anime->fecha_actualizacion);
    }

    public function test_anime_update()
    {
        $anime = AnimeModel::factory()->create();
        $data = ['nombre' => 'Anime Actualizado', 'numero_capitulos' => 24, 'visto' => 0, 'comentarios' => 'Este anime ha sido actualizado.', 'fecha_actualizacion' => '2024-12-01'];
        $response = $this->put("/api/animes/{$anime->id}", $data);
        $response->assertStatus(200);
        $response->assertJson(['success' => true, 'editarAnime' => $data]);
        $this->assertDatabaseHas('animes', $data);
    }

    public function test_anime_destroy()
    {
        // Crea una instancia de Anime para la prueba
        $anime = AnimeModel::factory()->create();
        // Verifica que el anime ha sido creado
        $this->assertDatabaseHas('animes', ['id' => $anime->id]);
        // Realiza la solicitud de eliminación
        $response = $this->delete("/api/animes/{$anime->id}");
        // Verifica el estado de la respuesta
        $response->assertStatus(200);
        $response->assertJson(['success' => true, 'message' => 'Anime eliminado correctamente.']);
        // Verifica que el anime ha sido eliminado
        $this->assertDatabaseMissing('animes', ['id' => $anime->id]);
    }
}
