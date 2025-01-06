<?php

namespace App\Http\Controllers;

use App\Models\AnimeModel;
use Illuminate\Http\Request;

class EstadisticaController extends Controller
{
    // Obtener el total de registros
    public function totalRegistros(Request $request)
    {
        try {
            $userId = $request->id;
            $totalRegistros = AnimeModel::where('user_id', $userId)->count();

            return response()->json(['total_registros' => $totalRegistros]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // Sin definir
    public function tipo1(Request $request)
    {
        try {
            $userId = $request->id;
            $tipo1 = AnimeModel::where('user_id', $userId)->where('tipo_id', 1)->count();

            return response()->json(['tipo_1' => $tipo1]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // Anime
    public function tipo2(Request $request)
    {
        try {
            $userId = $request->id;
            $tipo2 = AnimeModel::where('user_id', $userId)->where('tipo_id', 2)->count();

            return response()->json(['tipo_2' => $tipo2]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // Dorama
    public function tipo3(Request $request)
    {
        try {
            $userId = $request->id;
            $tipo3 = AnimeModel::where('user_id', $userId)->where('tipo_id', 3)->count();

            return response()->json(['tipo_3' => $tipo3]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // Serie
    public function tipo4(Request $request)
    {
        try {
            $userId = $request->id;
            $tipo4 = AnimeModel::where('user_id', $userId)->where('tipo_id', 4)->count();

            return response()->json(['tipo_4' => $tipo4]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // Registros que no sean de tipo 1 a tipo 4
    public function otrosTipos(Request $request)
    {
        try {
            $userId = $request->id;
            $otrosTipos = AnimeModel::where('user_id', $userId)
                ->whereNotIn('tipo_id', [1, 2, 3, 4])
                ->count();

            return response()->json(['otros_tipos' => $otrosTipos]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
