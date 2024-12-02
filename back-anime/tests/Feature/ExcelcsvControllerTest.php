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
        // Simular el almacenamiento de archivos temporales
        Storage::fake('public');

        // Crear un archivo CSV de ejemplo
        $csvContent = "nombre,numero_capitulos,visto,comentarios,fecha_actualizacion\n"
            . "Anime 1,12,1,Comentario 1,2024-12-01\n"
            . "Anime 2,24,0,Comentario 2,2024-12-01";
        $file = UploadedFile::fake()->createWithContent('animes.csv', $csvContent);

        // Realizar una solicitud POST para cargar el archivo CSV. Ojo con la ruta!.
        $response = $this->postJson('/api/excelcsv', ['csv-file' => $file]);

        // Verificar que la respuesta tenga estado 200
        $response->assertStatus(200)
            ->assertJson(['success' => true, 'message' => 'CSV cargado exitosamente.']);

        // Verificar que los registros se hayan insertado en la base de datos
        $this->assertDatabaseHas('animes', [
            'nombre' => 'Anime 1',
            'numero_capitulos' => 12,
            'visto' => 1,
            'comentarios' => 'Comentario 1',
            'fecha_actualizacion' => '2024-12-01',
        ]);

        $this->assertDatabaseHas('animes', [
            'nombre' => 'Anime 2',
            'numero_capitulos' => 24,
            'visto' => 0,
            'comentarios' => 'Comentario 2',
            'fecha_actualizacion' => '2024-12-01',
        ]);
        // Verificar que el número de registros en la tabla `animes` es el esperado
        $this->assertDatabaseCount('animes', 2);
    }

    public function test_descarga_Excelcsv()
    {
        // Crear algunos registros en la base de datos para probar
        AnimeModel::factory()->count(3)->create();

        // Hacer una solicitud GET a la ruta de la función `show` en ExcelcsvController
        $response = $this->get('/api/excelcsv/1'); // Ajusta la ruta según tu configuración

        // Verificar que el estado de la respuesta es 200
        $response->assertStatus(200);

        // Verificar que la cabecera de la respuesta contiene el nombre del archivo
        $response->assertHeader('content-disposition', 'attachment; filename=animes_' . now()->format('Ymd_His') . '.csv');

        // Verificar el contenido del CSV
        $csvContent = file_get_contents($response->getFile()->getPathname());
        $this->assertStringContainsString('nombre,numero_capitulos,visto,comentarios,fecha_actualizacion', $csvContent);

        // Verificar que los registros se encuentran en el CSV
        $animes = AnimeModel::all();
        foreach ($animes as $anime) {
            $this->assertStringContainsString($anime->nombre, $csvContent);
            $this->assertStringContainsString((string)$anime->numero_capitulos, $csvContent);
            $this->assertStringContainsString((string)$anime->visto, $csvContent);
            $this->assertStringContainsString($anime->comentarios, $csvContent);
            $this->assertStringContainsString($anime->fecha_actualizacion, $csvContent); // Tratamos fecha_actualizacion como una cadena
        }
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
