<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnimeController;
use App\Http\Controllers\ExcelcsvController;

/* Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum'); */

Route::apiResource('animes', AnimeController::class);
Route::apiResource('excelcsv', ExcelcsvController::class)->only(['store', 'show', 'destroy']);

/* Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('animes', AnimeController::class);
    Route::apiResource('excelcsv', ExcelcsvController::class);
}); */
