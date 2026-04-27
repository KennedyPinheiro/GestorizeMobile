<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;

class UnidadeMedidaResource extends BaseResource
{
    /**
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'sigla' => $this->sigla,
        ];
    }
}

