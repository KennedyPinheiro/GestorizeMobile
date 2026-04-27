<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class OrcamentoResource extends BaseResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'cliente_id' => $this->cliente_id,
            'funcionario_id' => $this->funcionario_id,
            'valor_total' => $this->valor_total,
            'data_orcamento' => $this->data_orcamento,
            'cliente' => $this->whenLoaded('cliente', fn () => ClienteResource::make($this->cliente)),
            'funcionario' => $this->whenLoaded('funcionario', fn () => UserResource::make($this->funcionario)),
            'itens' => $this->whenLoaded('itens', fn () => OrcamentoItemResource::collection($this->itens)),
        ];
    }
}
