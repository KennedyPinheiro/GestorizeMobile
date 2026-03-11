<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FornecedorRequest extends FormRequest
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
            'nome' => 'required|string|max:255',
            'cnpj' => 'required|string|max:20|unique:fornecedores,cnpj,' . $this->route('fornecedor'),
            'email' => 'nullable|email',
            'telefone' => 'nullable|string|max:30',
            'ramo_atividade' => 'nullable|string|max:255',
            'nome_responsavel' => 'nullable|string|max:255',
            'chave_pix' => 'nullable|string|max:255',
            'endereco_id' => 'nullable|exists:enderecos,id',
        ];
    }
}
