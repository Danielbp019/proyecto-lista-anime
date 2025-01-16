<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\CsvFileRequest;
use App\Models\ObraModel;
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
            $expectedHeaders = ['nombre', 'numero_capitulos', 'visto', 'comentarios', 'fecha_actualizacion', 'tipo_id'];
            // Verificar si la primera fila son las cabeceras esperadas
            $firstRow = $csvData[0];
            if ($firstRow === $expectedHeaders) {
                // Eliminar las cabeceras del CSV si están presentes
                array_shift($csvData);
            }

            // Obtener el user_id como valor directo del request
            $userId = $request->user_id;
            // Iterar sobre los datos y llenarlos en la tabla
            $obras = [];
            $rowCount = 1;
            foreach ($csvData as $row) {
                // Si la fila tiene menos columnas, llenar las columnas faltantes con valores predeterminados
                $row = array_pad($row, count($expectedHeaders), '');
                $obraData = array_combine($expectedHeaders, $row);

                // Validar que numero_capitulos sea un número
                if (!is_numeric($obraData['numero_capitulos'])) {
                    return response()->json([
                        'success' => false,
                        'message' => 'El valor de numero_capitulos no es válido en la fila ' . $rowCount
                    ], 400);
                }

                $obras[] = [
                    'nombre' => $obraData['nombre'],
                    'numero_capitulos' => (int)$obraData['numero_capitulos'],
                    'visto' => isset($obraData['visto']) ?: 1,
                    'comentarios' => $obraData['comentarios'] ?: 'Nada que decir o leer por aquí...',
                    'fecha_actualizacion' => $obraData['fecha_actualizacion'] ?: now(),
                    'user_id' => $userId,
                    'tipo_id' => $obraData['tipo_id'] ?: 1,
                ];
                $rowCount++;
            }
            // Insertar en la base de datos
            ObraModel::insert($obras);

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
     * Descargar el archivo CSV filtrado por user_id
     */
    public function show(Request $request, string $id)
    {
        try {
            // Obtener el user_id como valor directo del request
            $userId = $id;

            // Obtener los registros de la tabla `obras` filtrados por user_id
            $obras = ObraModel::where('user_id', $userId)->get();

            if ($obras->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No hay registros en la tabla obras para este usuario.'
                ], 404);
            }

            // Crear un archivo CSV temporal
            $fileName = 'obras_' . now()->format('Ymd_His') . '.csv';
            $filePath = storage_path("app/public/{$fileName}");
            $file = fopen($filePath, 'w');

            // Agregar encabezados manualmente al CSV
            $headers = ['nombre', 'numero_capitulos', 'visto', 'comentarios', 'fecha_actualizacion', 'tipo_id'];
            fputcsv($file, $headers);

            // Agregar los datos de la tabla al archivo CSV
            foreach ($obras as $obra) {
                fputcsv($file, [
                    $obra->nombre,
                    $obra->numero_capitulos,
                    $obra->visto,
                    $obra->comentarios,
                    $obra->fecha_actualizacion,
                    $obra->tipo_id
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
            // Truncar la tabla `obras`
            ObraModel::truncate();

            return response()->json([
                'success' => true,
                'message' => 'Todos los registros de la tabla obras han sido eliminados.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Hubo un problema al vaciar la tabla. Error: ' . $e->getMessage()
            ], 500);
        }
    }
}
