<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCategoriaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nome' => ['required', 'string', 'max:255', Rule::unique('categorias', 'nome'),],
        ];
    }

    public function messages(): array
    {
        return [
            'nome.required' => 'O nome da categoria é obrigatório.',
            'nome.string' => 'O nome da categoria deve ser um texto válido.',
            'nome.max' => 'O nome da categoria deve ter no máximo 255 caracteres.',
            'nome.unique' => 'Já existe uma categoria com esse nome.',
        ];
    }
}
