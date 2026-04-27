<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class ProdutoResource extends BaseResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'descricao' => $this->descricao,
            'preco_custo' => $this->preco_custo,
            'porcentagem_lucro' => $this->porcentagem_lucro,
            'preco_venda' => $this->preco_venda,
            'data_entrada' => $this->data_entrada,
            'estoque' => $this->estoque,
            'validade' => $this->validade,
            'categoria_id' => $this->categoria_id,
            'fornecedor_id' => $this->fornecedor_id,
            'unidade_medida_id' => $this->unidade_medida_id,
            'categoria' => $this->whenLoaded('categoria', fn () => CategoriaResource::make($this->categoria)),
            'categorias' => $this->whenLoaded('categorias', fn () => CategoriaResource::collection($this->categorias)),
            'fornecedor' => $this->whenLoaded('fornecedor', fn () => FornecedorResource::make($this->fornecedor)),
            'unidade_medida' => $this->whenLoaded('unidadeMedida', fn () => UnidadeMedidaResource::make($this->unidadeMedida)),
        ];
    }
}
