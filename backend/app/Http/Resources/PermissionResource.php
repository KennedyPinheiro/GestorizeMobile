<?php

namespace App\Http\Resources;

use App\Enums\PermissionEnum;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PermissionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $permissao = PermissionEnum::tryFrom($this->name);

        return [
            'id' => $this->name,
            'nome' => $permissao?->nome() ?? $this->name,
            'grupo' => $permissao?->grupo() ?? 'Outros',
            'acao' => $permissao?->acao() ?? 'Gerenciar',
        ];
    }
}
