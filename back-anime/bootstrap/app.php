<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Configura los middleware aquí
        $middleware->prepend(\App\Http\Middleware\ForceJsonResponse::class);
        $middleware->prepend(\App\Http\Middleware\Utf8Response::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->reportable(function (Throwable $e) {
            // Aquí puedes definir cómo se reportan las excepciones
        });

        $exceptions->renderable(function (ValidationException $e, $request) {
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Datos de validación inválidos',
                    'errors' => $e->errors(),
                ], $e->status);
            }
        });
    })
    ->create();
return $app;
