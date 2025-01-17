<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ObraStoreRequest extends FormRequest
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
            // El campo visto solo acepta 0 para false o 1 para true.
            'nombre' => ['required', 'string', 'max:255'],
            'numero_capitulos' => ['required', 'integer', 'min:1'],
            'visto' => ['required', 'boolean'],
            'comentarios' => ['nullable', 'string', 'max:250']
        ];
    }
}
