<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Utf8Response
{
    // Afecta principalmente las respuestas JSON, asegurándose de que los datos JSON se devuelvan con codificación UTF-8 sin caracteres escapados.
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);
        if ($response instanceof \Illuminate\Http\JsonResponse) {
            $response->setEncodingOptions(JSON_UNESCAPED_UNICODE);
        }
        return $response;
    }
}
