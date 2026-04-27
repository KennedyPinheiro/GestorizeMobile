<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class ClienteResource extends BaseResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'tipo' => $this->tipo,
            'email' => $this->email,
            'telefone' => $this->telefone,
            'endereco_id' => $this->endereco_id,
        ];
    }
}

