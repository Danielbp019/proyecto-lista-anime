<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTAuthController;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Controllers\AnimeController;
use App\Http\Controllers\ExcelcsvController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\TipoController;

Route::post('/register', [JWTAuthController::class, 'register']);
Route::post('/login', [JWTAuthController::class, 'login']);

Route::middleware([JwtMiddleware::class])->group(function () {
    Route::post('/logout', [JWTAuthController::class, 'logout']);
    Route::post('/refresh', [JWTAuthController::class, 'refresh']); // Añadir ruta para refrescar el token
    Route::get('/showUser/{id}', [UsuarioController::class, 'showUser']);
    Route::patch('/updateUser/{id}', [UsuarioController::class, 'updateUser']);
    Route::apiResource('animes', AnimeController::class);
    Route::apiResource('excelcsv', ExcelcsvController::class)->only(['store', 'show', 'destroy']);
    Route::apiResource('tipos', TipoController::class);
});
