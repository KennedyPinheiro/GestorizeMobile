<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProdutoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'preco_custo' => 'required|numeric|min:0',
            'porcentagem_lucro' => 'required|numeric|min:0',
            'preco_venda' => 'required|numeric|min:0',
            'data_entrada' => 'required|date',

            'categorias' => 'required_without:categoria_id|array|min:1',
            'categorias.*' => 'integer|distinct|exists:categorias,id',
            'categoria_id' => 'required_without:categorias|exists:categorias,id',
            'fornecedor_id' => 'required|exists:fornecedores,id',
            'unidade_medida_id' => 'required|exists:unidades_medida,id',

            'estoque' => 'nullable|integer',
            'validade' => 'nullable|date'

        ];
    }
}
