<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\UserModel;
use App\Http\Requests\RegisterRequest;

class AuthController extends Controller
{
    // Inicio de sesión
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        $user = Auth::user();
        /** @var \App\Models\MyUserModel $user **/
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }


    // Obtener el usuario autenticado
    public function user(Request $request)
    {
        return response()->json($request->user());
    }


    // Cerrar sesión
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Cierre de sesión exitoso']);
    }


    // Registrar usuarios
    public function register(RegisterRequest $request)
    {
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
    }
}
