<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\TipoModel;
// Validaciones
use App\Http\Requests\TipoRequest;

class TipoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        try {
            $tipos = TipoModel::select(
                'id',
                'nombretipo',
            )
                ->orderBy('nombretipo', 'asc')
                ->get();

            return response()->json($tipos);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TipoRequest $request)
    {
        //
        try {
            $nuevosTipos = TipoModel::create([
                'nombretipo' => ucwords(strtolower(trim($request['nombretipo']))),
            ]);

            return response()->json(['success' => true, 'nuevosTipos' => $nuevosTipos], 201);
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
            $tipoBuscar = TipoModel::findOrFail($id);

            return response()->json($tipoBuscar);
        } catch (ModelNotFoundException $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TipoRequest $request, string $id)
    {
        //
        try {
            $editarTipos = TipoModel::findOrFail($id);
            $editarTipos->fill([
                'nombretipo' => ucwords(strtolower(trim($request['nombretipo']))),
            ]);
            $editarTipos->save();

            return response()->json(['success' => true, 'editarTipos' => $editarTipos], 200);
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
            $borrarTipos = TipoModel::findOrFail($id);
            $borrarTipos->delete();

            return response()->json(['success' => true, 'message' => 'Tipo eliminado correctamente.'], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
