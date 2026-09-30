<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClienteResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'tipo' => $this->tipo,
            'email' => $this->email,
            'telefone' => $this->telefone,
            'avatar_url' => $this->avatar_url,

            'endereco' => $this->whenLoaded(
                'endereco',
                fn() => $this->endereco
            ),

            'pf' => $this->whenLoaded(
                'dadosPf',
                fn() => $this->dadosPf
            ),

            'pj' => $this->whenLoaded(
                'dadosPj',
                fn() => $this->dadosPj
            ),
        ];
    }
}
