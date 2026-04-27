<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class FuncionarioResource extends BaseResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'telefone' => $this->telefone,
            'data_nascimento' => $this->data_nascimento,
            'cpf' => $this->cpf,
            'rg' => $this->rg,
            'endereco_id' => $this->endereco_id,
            'endereco' => $this->whenLoaded('endereco', fn () => EnderecoResource::make($this->endereco)),
        ];
    }
}
