<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CsvFileRequest;
use App\Models\AnimeModel;
use Illuminate\Support\Facades\Response;

class ExcelcsvController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     * Insertar CSV en la base de datos
     */
    public function store(CsvFileRequest $request)
    {
        try {
            // Obtener el archivo validado
            $file = $request->file('csv-file');
            // Leer todas las líneas del archivo CSV
            $csvData = array_map('str_getcsv', file($file->getRealPath()));

            // Verificar que el archivo no esté vacío
            if (empty($csvData)) {
                return response()->json([
                    'success' => false,
                    'message' => 'El archivo CSV está vacío.'
                ], 400);
            }

            // Cabeceras esperadas
            $expectedHeaders = ['nombre', 'numero_capitulos', 'visto', 'comentarios', 'fecha_actualizacion'];

            // Verificar si la primera fila son las cabeceras esperadas
            $firstRow = $csvData[0];
            if ($firstRow === $expectedHeaders) {
                // Eliminar las cabeceras del CSV si están presentes
                array_shift($csvData);
            }

            // Iterar sobre los datos y llenarlos en la tabla
            $animes = [];
            foreach ($csvData as $row) {
                if (count($row) !== count($expectedHeaders)) {
                    return response()->json([
                        'success' => false,
                        'message' => 'El formato del CSV no coincide con el número de columnas esperado.'
                    ], 400);
                }
                $animeData = array_combine($expectedHeaders, $row);

                $animes[] = [
                    'nombre' => $animeData['nombre'],
                    'numero_capitulos' => $animeData['numero_capitulos'],
                    'visto' => $animeData['visto'] ?: 1,
                    'comentarios' => $animeData['comentarios'] ?: 'Nada que decir o leer por aquí...',
                    'fecha_actualizacion' => $animeData['fecha_actualizacion'] ?: now()
                ];
            }
            // Insertar en la base de datos
            AnimeModel::insert($animes);

            return response()->json(['success' => true, 'message' => 'CSV cargado exitosamente.'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Hubo un problema al cargar el CSV. Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     * Descargar el archivo CSV
     */
    public function show(string $id)
    {
        try {
            // Obtener todos los registros de la tabla `animes`
            $animes = AnimeModel::all();

            if ($animes->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No hay registros en la tabla animes.'
                ], 404);
            }

            // Crear un archivo CSV temporal
            $fileName = 'animes_' . now()->format('Ymd_His') . '.csv';
            $filePath = storage_path("app/public/{$fileName}");
            $file = fopen($filePath, 'w');

            // Agregar encabezados manualmente al CSV
            $headers = ['nombre', 'numero_capitulos', 'visto', 'comentarios', 'fecha_actualizacion'];
            fputcsv($file, $headers);

            // Agregar los datos de la tabla al archivo CSV
            foreach ($animes as $anime) {
                fputcsv($file, [
                    $anime->nombre,
                    $anime->numero_capitulos,
                    $anime->visto,
                    $anime->comentarios,
                    $anime->fecha_actualizacion
                ]);
            }
            fclose($file);

            // Descargar el archivo CSV
            return Response::download($filePath)->deleteFileAfterSend(true);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Hubo un problema al generar el CSV. Error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            // Truncar la tabla `animes`
            AnimeModel::truncate();

            return response()->json([
                'success' => true,
                'message' => 'Todos los registros de la tabla animes han sido eliminados.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Hubo un problema al vaciar la tabla. Error: ' . $e->getMessage()
            ], 500);
        }
    }
}
