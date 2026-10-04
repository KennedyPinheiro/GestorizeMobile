<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProdutoImagemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'imagem' => ['required', 'image', 'mimes:jpeg,jpg,png,webp', 'max:5120',],
            'principal' => ['sometimes', 'boolean',],
        ];
    }

    public function messages(): array
    {
        return [
            'imagem.required' => 'A imagem é obrigatória.',
            'imagem.image' => 'O arquivo enviado deve ser uma imagem.',
            'imagem.mimes' => 'A imagem deve estar no formato JPEG, JPG, PNG ou WEBP.',
            'imagem.max' => 'A imagem não pode ultrapassar 5 MB.',

            'principal.boolean' => 'O campo principal deve ser verdadeiro ou falso.',
        ];
    }
}
