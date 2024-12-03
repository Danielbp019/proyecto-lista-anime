<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // Validación de contraseña que exija al menos dos letras mayúsculas, dos letras minúsculas, dos números y una longitud mínima de 12 caracteres
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'string',
                'min:12',
                'regex:/^(?=(.*[a-z]){2})(?=(.*[A-Z]){2})(?=(.*\d){2}).{12,}$/',
                'confirmed', // Campo de confirmación
            ],
        ];
    }

    /**
     * Mensajes personalizados para las reglas de validación.
     */
    public function messages()
    {
        return [
            'password.regex' => 'La contraseña debe tener al menos dos letras mayúsculas, dos letras minúsculas, dos números y una longitud mínima de 12 caracteres.',
        ];
    }
}
