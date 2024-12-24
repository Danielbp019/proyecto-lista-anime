<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserModel;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;

class AuthController extends Controller
{
    // Inicio de sesión 
    public function login(LoginRequest $request)
    {
        try {
            // Intenta autenticar con las credenciales validadas
            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json(['message' => 'Credenciales inválidas'], 401);
            }

            $user = Auth::user();
            // Revocar todos los tokens anteriores
            /** @var \App\Models\ $user **/
            $user->tokens()->delete();
            // Crear un nuevo token
            $newToken = $user->createToken('auth_token');
            // Establecemos la expiración del token recién creado
            $newToken->accessToken->expires_at = now()->addHours(24);  // Expira en 24 horas
            $newToken->accessToken->save();

            return response()->json([
                'user' => $user,
                'token' => $newToken->plainTextToken,
            ]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Ha ocurrido un error inesperado.'], 500);
        }
    }

    // Obtener el usuario autenticado
    public function user(Request $request)
    {
        try {
            return response()->json($request->user());
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // Cerrar sesión
    public function logout(Request $request)
    {
        try {
            $request->user()->tokens()->delete();
            return response()->json(['message' => 'Cierre de sesión exitoso']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    // Registrar usuarios
    public function register(RegisterRequest $request)
    {
        try {
            // Datos validados del request
            $validated = $request->validated();

            // Crear el usuario sin necesidad de definir el id (se generará automáticamente en el modelo)
            $user = UserModel::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => bcrypt($validated['password']), // Encriptamos la contraseña
            ]);

            // Crear el token de acceso para el usuario
            $token = $user->createToken('auth_token')->plainTextToken;

            // Retornar el usuario y su token
            return response()->json([
                'user' => $user,
                'token' => $token,
            ], 201); // Código de respuesta 201 para indicar que se creó el recurso
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
