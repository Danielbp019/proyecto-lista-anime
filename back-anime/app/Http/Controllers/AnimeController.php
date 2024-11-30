<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\AnimeModel;
// Validaciones
use App\Http\Requests\AnimeStoreRequest;
use App\Http\Requests\AnimeUpdateRequest;

class AnimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Select.
        $anime = AnimeModel::select(
            'id',
            'nombre',
            'numero_capitulos',
            'visto',
            'comentarios',
            'fecha_actualizacion'
        )
            ->get();
        return response()->json($anime);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AnimeStoreRequest $request)
    {
        //
        try {
            $nuevoAnime = AnimeModel::create([
                'nombre' => trim($request['nombre']),
                'numero_capitulos' => trim($request['numero_capitulos']),
                'visto' => $request['visto'],
                'comentarios' => trim($request['comentarios']),
                'fecha_actualizacion' => $request['fecha_actualizacion'],
            ]);

            return response()->json(['success' => true, 'nuevoAnime' => $nuevoAnime], 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        try {
            $animeBuscar = AnimeModel::findOrFail($id);

            return response()->json($animeBuscar);
        } catch (ModelNotFoundException $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AnimeUpdateRequest $request, string $id)
    {
        //
        try {
            $editarAnime = AnimeModel::findOrFail($id);
            // El metodo has verifica si un campo esta presente en la solicitud
            if ($request->has('nombre')) {
                $editarAnime->nombre = trim($request['nombre']);
            }
            if ($request->has('numero_capitulos')) {
                $editarAnime->numero_capitulos = trim($request['numero_capitulos']);
            }
            if ($request->has('visto')) {
                $editarAnime->visto = $request['visto'];
            }
            if ($request->has('comentarios')) {
                $editarAnime->comentarios = trim($request['comentarios']);
            }
            if ($request->has('fecha_actualizacion')) {
                $editarAnime->fecha_actualizacion = $request['fecha_actualizacion'];
            }
            $editarAnime->save();

            return response()->json(['success' => true, 'editarAnime' => $editarAnime], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        try {
            $borrarAnime = AnimeModel::findOrFail($id);
            $borrarAnime->delete();

            return response()->json(['success' => true, 'message' => 'Anime eliminado correctamente.'], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
