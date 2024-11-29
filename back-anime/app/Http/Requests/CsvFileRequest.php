<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CsvFileRequest extends FormRequest
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
            //
            'csv-file' => 'required|file|mimes:csv,txt|max:2048',
        ];
    }

    public function messages()
    {
        return [
            //
            'csv-file.required' => 'El archivo CSV es obligatorio.',
            'csv-file.file' => 'El archivo debe ser un archivo válido.',
            'csv-file.mimes' => 'El archivo debe ser de tipo CSV o TXT.',
            'csv-file.max' => 'El archivo no debe superar los 2MB.',
        ];
    }
}
