<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class ExcelcsvControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testDestroy()
    {
        // Simular datos en la base de datos
        DB::table('animes')->insert([
            ['nombre' => 'Anime1', 'numero_capitulos' => 12, 'visto' => 1, 'comentarios' => 'Great anime'],
            ['nombre' => 'Anime2', 'numero_capitulos' => 24, 'visto' => 0, 'comentarios' => 'Another comment']
        ]);

        // Realizar la solicitud de eliminación
        $response = $this->deleteJson('/api/excelcsv/1');

        // Verificar respuesta y contenido en la base de datos
        $response->assertStatus(200)
            ->assertJson(['success' => true, 'message' => 'Animes eliminados completamente.']);

        $this->assertDatabaseMissing('animes', ['nombre' => 'Anime1']);
        $this->assertDatabaseMissing('animes', ['nombre' => 'Anime2']);
    }
}
