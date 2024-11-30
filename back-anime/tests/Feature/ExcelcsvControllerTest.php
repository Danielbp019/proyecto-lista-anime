<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use App\Models\AnimeModel;

class ExcelcsvControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_subida_Excelcsv()
    {
        Storage::fake('public');

        $csvContent = "Anime 1,12,1,Comentario 1\nAnime 2,24,0,Comentario 2";
        $file = UploadedFile::fake()->createWithContent('animes.csv', $csvContent);
        $response = $this->postJson('/api/excelcsv', ['csv-file' => $file]);
        $response->assertStatus(200)
            ->assertJson(['success' => true, 'message' => 'CSV cargado exitosamente.']);
        $this->assertDatabaseCount('animes', 10);
    }

    public function test_descarga_Excelcsv()
    {
        
    }

    public function test_truncate_anime_table()
    {
        AnimeModel::factory()->count(3)->create();

        $this->delete('/api/excelcsv/1')->assertStatus(200)
            ->assertJson(['success' => true, 'message' => 'Todos los registros de la tabla animes han sido eliminados.']);
        $this->assertDatabaseCount('animes', 0);
    }

    public function test_returns_empty_table_message()
    {
        $response = $this->get('/api/excelcsv/1');
        $response->assertStatus(404)
            ->assertJson(['success' => false, 'message' => 'No hay registros en la tabla animes.']);
    }
}
