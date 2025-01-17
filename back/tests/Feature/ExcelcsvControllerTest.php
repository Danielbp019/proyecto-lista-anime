<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use App\Models\ObraModel;
use App\Models\User;
use App\Models\TipoModel;

class ExcelcsvControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_subida_Excelcsv()
    {
        $user = User::factory()->create();
        // Simular el almacenamiento de archivos temporales
        Storage::fake('public');

        // Crear un registro en la tabla tipos
        $tipo1 = TipoModel::create(['nombretipo' => 'Anime']);
        $tipo2 = TipoModel::create(['nombretipo' => 'Dorama']);

        // Crear un archivo CSV de ejemplo con nombres únicos
        $csvContent = "nombre,numero_capitulos,visto,comentarios,fecha_actualizacion,tipo_id\n"
            . "Obra Unica 1,12,1,Comentario 1,2024-12-01,{$tipo1->id}\n"
            . "Obra Unica 2,24,0,Comentario 2,2024-12-01,{$tipo2->id}";
        $file = UploadedFile::fake()->createWithContent('obras.csv', $csvContent);

        // Realizar una solicitud POST para cargar el archivo CSV. Ojo con la ruta!.
        $response = $this->postJson('/api/excelcsv', ['csv-file' => $file, 'user_id' => $user->id]);

        // Verificar que la respuesta tenga estado 200
        $response->assertStatus(200)
            ->assertJson(['success' => true, 'message' => 'CSV cargado exitosamente.']);

        // Verificar que los registros se hayan insertado en la base de datos
        $this->assertDatabaseHas('obras', [
            'nombre' => 'Obra Unica 1',
            'numero_capitulos' => 12,
            'visto' => 1,
            'comentarios' => 'Comentario 1',
            'fecha_actualizacion' => '2024-12-01',
            'user_id' => $user->id,
            'tipo_id' => $tipo1->id
        ]);

        $this->assertDatabaseHas('obras', [
            'nombre' => 'Obra Unica 2',
            'numero_capitulos' => 24,
            'visto' => 0,
            'comentarios' => 'Comentario 2',
            'fecha_actualizacion' => '2024-12-01',
            'user_id' => $user->id,
            'tipo_id' => $tipo2->id
        ]);
        // Verificar que el número de registros en la tabla `obras` es el esperado
        $this->assertDatabaseCount('obras', 2);
    }

    public function test_descarga_Excelcsv()
    {
        $user = User::factory()->create();
        // Crear un registro en la tabla tipos
        $tipo = TipoModel::create(['nombretipo' => 'Tipo de Ejemplo']);
        // Crear algunos registros en la base de datos para probar
        ObraModel::factory()->count(3)->create(['user_id' => $user->id, 'tipo_id' => $tipo->id]);

        // Hacer una solicitud GET a la ruta de la función `show` en ExcelcsvController
        $response = $this->get("/api/excelcsv/{$user->id}"); // Ajusta la ruta según tu configuración

        // Verificar que el estado de la respuesta es 200
        $response->assertStatus(200);

        // Verificar que la cabecera de la respuesta contiene el nombre del archivo
        $response->assertHeader('content-disposition', 'attachment; filename=obras_' . now()->format('Ymd_His') . '.csv');

        // Verificar el contenido del CSV
        $csvContent = file_get_contents($response->getFile()->getPathname());
        $this->assertStringContainsString('nombre,numero_capitulos,visto,comentarios,fecha_actualizacion,tipo_id', $csvContent);

        // Verificar que los registros se encuentran en el CSV
        $obras = ObraModel::where('user_id', $user->id)->get();
        foreach ($obras as $obra) {
            $this->assertStringContainsString($obra->nombre, $csvContent);
            $this->assertStringContainsString((string)$obra->numero_capitulos, $csvContent);
            $this->assertStringContainsString((string)$obra->visto, $csvContent);
            $this->assertStringContainsString($obra->comentarios, $csvContent);
            $this->assertStringContainsString($obra->fecha_actualizacion, $csvContent); // Tratamos fecha_actualizacion como una cadena
            $this->assertStringContainsString((string)$obra->tipo_id, $csvContent);
        }
    }

    public function test_truncate_obra_table()
    {
        $user = User::factory()->create();
        // Crear un registro en la tabla tipos
        $tipo = TipoModel::create(['nombretipo' => 'Tipo de Ejemplo']);
        ObraModel::factory()->count(3)->create(['user_id' => $user->id, 'tipo_id' => $tipo->id]);

        $this->delete("/api/excelcsv/{$user->id}")->assertStatus(200)
            ->assertJson(['success' => true, 'message' => 'Todos los registros de la tabla obras han sido eliminados.']);
        $this->assertDatabaseCount('obras', 0);
    }

    public function test_returns_empty_table_message()
    {
        $user = User::factory()->create();
        $response = $this->get("/api/excelcsv/{$user->id}");
        $response->assertStatus(404)
            ->assertJson(['success' => false, 'message' => 'No hay registros en la tabla obras para este usuario.']);
    }
}
