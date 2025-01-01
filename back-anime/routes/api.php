<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JWTAuthController;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Controllers\AnimeController;
use App\Http\Controllers\ExcelcsvController;

Route::post('/register', [JWTAuthController::class, 'register']);
Route::post('/login', [JWTAuthController::class, 'login']);

Route::middleware([JwtMiddleware::class])->group(function () {
    Route::get('/user', [JWTAuthController::class, 'getUser']);
    Route::post('/logout', [JWTAuthController::class, 'logout']);
    Route::post('/refresh', [JWTAuthController::class, 'refresh']); // Añadir ruta para refrescar el token
    Route::apiResource('animes', AnimeController::class);
    Route::apiResource('excelcsv', ExcelcsvController::class)->only(['store', 'show', 'destroy']);
});
