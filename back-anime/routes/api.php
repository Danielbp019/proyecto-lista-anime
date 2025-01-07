<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTAuthController;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Controllers\ObraController;
use App\Http\Controllers\ExcelcsvController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\TipoController;
use App\Http\Controllers\EstadisticaController;

Route::post('/register', [JWTAuthController::class, 'register']);
Route::post('/login', [JWTAuthController::class, 'login']);

Route::middleware([JwtMiddleware::class])->group(function () {
    Route::post('/logout', [JWTAuthController::class, 'logout']);
    Route::post('/refresh', [JWTAuthController::class, 'refresh']); // Añadir ruta para refrescar el token
    Route::get('/showUser/{id}', [UsuarioController::class, 'showUser']);
    Route::patch('/updateUser/{id}', [UsuarioController::class, 'updateUser']);
    Route::apiResource('obras', ObraController::class);
    Route::apiResource('excelcsv', ExcelcsvController::class)->only(['store', 'show', 'destroy']);
    Route::apiResource('tipos', TipoController::class);
    // Ruta para obtener el total de registros
    Route::get('/total-registros', [EstadisticaController::class, 'totalRegistros']);
    // Ruta para obtener la cantidad de registros de tipo 1 - Sin definir
    Route::get('/tipo-1', [EstadisticaController::class, 'tipo1']);
    // Ruta para obtener la cantidad de registros de tipo 2 - Anime
    Route::get('/tipo-2', [EstadisticaController::class, 'tipo2']);
    // Ruta para obtener la cantidad de registros de tipo 3 - Dorama
    Route::get('/tipo-3', [EstadisticaController::class, 'tipo3']);
    // Ruta para obtener la cantidad de registros de tipo 4 - Serie
    Route::get('/tipo-4', [EstadisticaController::class, 'tipo4']);
    // Ruta para obtener la cantidad de registros que no sean de tipo 1 a tipo 4
    Route::get('/otros-tipos', [EstadisticaController::class, 'otrosTipos']);
});
