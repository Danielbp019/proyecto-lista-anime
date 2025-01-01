<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;

class JWTAuthController extends Controller
{
    // User registration
    public function register(RegisterRequest $request)
    {
        try {
            $user = User::create([
                'name' => $request->get('name'),
                'email' => $request->get('email'),
                'password' => bcrypt($request->get('password')),
            ]);
            /* Al generar un token en el momento del registro, el usuario puede ser autenticado inmediatamente sin necesidad de realizar un inicio de sesión adicional. Puedo enviarlo al dashboard de una vez desde aqui. 
            $token = JWTAuth::fromUser($user); 
            return response()->json(compact('user', 'token'), 201); */

            return response()->json(compact('user'), 201);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // Iniciar sesión de usuario y obtener detalles del usuario
    public function login(LoginRequest $request)
    {
        // Validar las credenciales de entrada
        $credentials = $request->only('email', 'password');
        try {
            // Intentar autenticar al usuario y generar un nuevo token
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Credenciales inválidas'], 401);
            }
            // Obtener el usuario autenticado.
            /** @disregard [Comentario para que no salte un falso error: intelephense(P1013)] */
            $user = auth()->user();

            return response()->json(['token' => $token, 'user' => $user]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'No se pudo crear el token: ' . $e->getMessage()], 500);
        }
    }

    // Cerrar sesión del usuario
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json(['message' => 'Cierre de sesión exitoso']);
    }

    public function refresh()
    {
        try {
            // Generar un nuevo token basado en el token actual
            $newToken = JWTAuth::refresh(JWTAuth::getToken());

            return $this->respondWithToken($newToken);
        } catch (JWTException $e) {
            return response()->json(['success' => false, 'message' => 'No se pudo refrescar el token: ' . $e->getMessage()], 500);
        }
    }

    protected function respondWithToken($token)
    {
        /** @disregard [Comentario para que no salte un falso error: intelephense(P1013)] */
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
