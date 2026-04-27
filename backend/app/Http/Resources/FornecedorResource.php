<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class FornecedorResource extends BaseResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'cnpj' => $this->cnpj,
            'email' => $this->email,
            'telefone' => $this->telefone,
            'nome_responsavel' => $this->nome_responsavel,
            'chave_pix' => $this->chave_pix,
            'endereco_id' => $this->endereco_id,
            'fornecedor_categoria_id' => $this->fornecedor_categoria_id,
            'categoria' => $this->whenLoaded('categoria', fn () => FornecedorCategoriaResource::make($this->categoria)),
        ];
    }
}
