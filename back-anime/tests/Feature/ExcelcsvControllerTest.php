<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use App\Models\ObraModel;

class ExcelcsvControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_subida_Excelcsv()
    {
        // Simular el almacenamiento de archivos temporales
        Storage::fake('public');

        // Crear un archivo CSV de ejemplo
        $csvContent = "nombre,numero_capitulos,visto,comentarios,fecha_actualizacion\n"
            . "Obra 1,12,1,Comentario 1,2024-12-01\n"
            . "Obra 2,24,0,Comentario 2,2024-12-01";
        $file = UploadedFile::fake()->createWithContent('obras.csv', $csvContent);

        // Realizar una solicitud POST para cargar el archivo CSV. Ojo con la ruta!.
        $response = $this->postJson('/api/excelcsv', ['csv-file' => $file]);

        // Verificar que la respuesta tenga estado 200
        $response->assertStatus(200)
            ->assertJson(['success' => true, 'message' => 'CSV cargado exitosamente.']);

        // Verificar que los registros se hayan insertado en la base de datos
        $this->assertDatabaseHas('obras', [
            'nombre' => 'Obra 1',
            'numero_capitulos' => 12,
            'visto' => 1,
            'comentarios' => 'Comentario 1',
            'fecha_actualizacion' => '2024-12-01',
        ]);

        $this->assertDatabaseHas('obras', [
            'nombre' => 'Obra 2',
            'numero_capitulos' => 24,
            'visto' => 0,
            'comentarios' => 'Comentario 2',
            'fecha_actualizacion' => '2024-12-01',
        ]);
        // Verificar que el número de registros en la tabla `obras` es el esperado
        $this->assertDatabaseCount('obras', 2);
    }

    public function test_descarga_Excelcsv()
    {
        // Crear algunos registros en la base de datos para probar
        ObraModel::factory()->count(3)->create();

        // Hacer una solicitud GET a la ruta de la función `show` en ExcelcsvController
        $response = $this->get('/api/excelcsv/1'); // Ajusta la ruta según tu configuración

        // Verificar que el estado de la respuesta es 200
        $response->assertStatus(200);

        // Verificar que la cabecera de la respuesta contiene el nombre del archivo
        $response->assertHeader('content-disposition', 'attachment; filename=obras_' . now()->format('Ymd_His') . '.csv');

        // Verificar el contenido del CSV
        $csvContent = file_get_contents($response->getFile()->getPathname());
        $this->assertStringContainsString('nombre,numero_capitulos,visto,comentarios,fecha_actualizacion', $csvContent);

        // Verificar que los registros se encuentran en el CSV
        $obras = ObraModel::all();
        foreach ($obras as $obra) {
            $this->assertStringContainsString($obra->nombre, $csvContent);
            $this->assertStringContainsString((string)$obra->numero_capitulos, $csvContent);
            $this->assertStringContainsString((string)$obra->visto, $csvContent);
            $this->assertStringContainsString($obra->comentarios, $csvContent);
            $this->assertStringContainsString($obra->fecha_actualizacion, $csvContent); // Tratamos fecha_actualizacion como una cadena
        }
    }

    public function test_truncate_obra_table()
    {
        ObraModel::factory()->count(3)->create();

        $this->delete('/api/excelcsv/1')->assertStatus(200)
            ->assertJson(['success' => true, 'message' => 'Todos los registros de la tabla obras han sido eliminados.']);
        $this->assertDatabaseCount('obras', 0);
    }

    public function test_returns_empty_table_message()
    {
        $response = $this->get('/api/excelcsv/1');
        $response->assertStatus(404)
            ->assertJson(['success' => false, 'message' => 'No hay registros en la tabla obras.']);
    }
}
