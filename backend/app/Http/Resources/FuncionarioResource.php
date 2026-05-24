<?php
namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FuncionarioResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'               => $this->id,
            'telefone'         => $this->telefone,
            'data_nascimento'  => $this->data_nascimento,
            'cpf'              => $this->cpf,
            'endereco'         => new EnderecoResource($this->whenLoaded('endereco')),
        ];
    }
}