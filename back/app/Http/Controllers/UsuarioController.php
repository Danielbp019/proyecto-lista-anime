<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
// Validaciones
use App\Http\Requests\UserRequest;

class UsuarioController extends Controller
{
    public function showUser(string $id)
    {
        //
        try {
            $userBuscar = User::select('id', 'name', 'email', 'created_at', 'updated_at')
                ->find($id);

            return response()->json($userBuscar);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => 'Usuario no encontrado'], 404);
        }
    }

    public function updateUser(UserRequest $request, string $id)
    {
        try {
            // Buscar el usuario por ID
            $editarUsuario = User::findOrFail($id);
            // Llenar los campos con la nueva información
            $editarUsuario->fill([
                'name' => $request->input('name'),
            ]);
            // Guardar los cambios
            $editarUsuario->save();

            return response()->json(['success' => true, 'editarUsuario' => $editarUsuario], 200);
        } catch (\Exception $e) {
            // Manejar excepciones y devolver respuesta de error
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
}
