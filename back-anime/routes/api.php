<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnimeController;
use App\Http\Controllers\ExcelcsvController;
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);  // Mover fuera del grupo protegido

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('animes', AnimeController::class);
    Route::apiResource('excelcsv', ExcelcsvController::class)->only(['store', 'show', 'destroy']);
});
