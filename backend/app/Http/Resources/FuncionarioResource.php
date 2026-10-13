<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FuncionarioResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,

            'telefone' => $this->telefone,
            'data_nascimento' => $this->data_nascimento,
            'cpf' => $this->cpf,

            'user' => $this->whenLoaded('user', function () {
                return [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                    'email' => $this->user->email,

                    'role' => $this->user
                        ->getRoleNames()
                        ->first(),
                ];
            }),

            'endereco' => $this->whenLoaded('endereco', function () {
                return new EnderecoResource($this->endereco);
            }),

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
