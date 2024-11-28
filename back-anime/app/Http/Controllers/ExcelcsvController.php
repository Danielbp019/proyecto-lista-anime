<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\CsvFileRequest;

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
     */
    public function store(CsvFileRequest $request)
    {
        // Guardar
        try {
            set_time_limit(300);
            ini_set('memory_limit', '512M');
            $path = $request->file('csv_file')->storeAs('uploads', 'uploaded.csv');

            $dataToInsert = [];
            $batchSize = 500;

            if (($handle = fopen(storage_path('app/' . $path), "r")) !== FALSE) {
                while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                    $dataToInsert[] = [
                        'nombre' => $data[0],
                        'numero_capitulos' => $data[1],
                        'visto' => $data[2],
                        'comentarios' => $data[3]
                    ];
                    if (count($dataToInsert) >= $batchSize) {
                        DB::table('animes')->insert($dataToInsert);
                        $dataToInsert = [];
                    }
                }
                fclose($handle);
                if (!empty($dataToInsert)) {
                    DB::table('animes')->insert($dataToInsert);
                }
            }

            return response()->json(['success' => true, 'message' => 'CSV cargado.'], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Hubo un problema al cargar el CSV. Por favor, inténtalo de nuevo.'], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Descargar animes
        try {
            $table = DB::table('animes')->get();

            if ($table->isEmpty()) {
                return response()->json(['success' => false, 'message' => 'No hay datos disponibles.'], 404);
            }

            $filename = "animes.csv";
            $handle = fopen($filename, 'w+');

            // Añadir encabezados al CSV
            fputcsv($handle, array_keys((array) $table[0]));

            // Añadir datos al CSV
            foreach ($table as $row) {
                fputcsv($handle, (array) $row);
            }
            fclose($handle);

            // Preparar headers para la descarga
            $currentDate = date('Y-m-d'); // Formato de fecha: Año-Mes-Día
            $downloadName = "animes_$currentDate.csv";
            $headers = array(
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment; filename="' . $downloadName . '"',
            );

            return response()->download($filename, $downloadName, $headers)->deleteFileAfterSend(true);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Error al generar el archivo: ' . $e->getMessage()], 500);
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
        // Vaciar la tabla
        try {
            DB::table('animes')->truncate();

            return response()->json(['success' => true, 'message' => 'Animes eliminados completamente.'], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Hubo un problema al truncar. Por favor, inténtalo de nuevo.'], 500);
        }
    }
}
