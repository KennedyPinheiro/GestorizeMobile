<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class OrcamentoItemResource extends BaseResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'orcamento_id' => $this->orcamento_id,
            'produto_id' => $this->produto_id,
            'quantidade' => $this->quantidade,
            'preco_unitario' => $this->preco_unitario,
            'subtotal' => $this->subtotal,
            'produto' => $this->whenLoaded('produto', fn () => ProdutoResource::make($this->produto)),
        ];
    }
}
