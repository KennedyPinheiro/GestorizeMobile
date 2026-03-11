<?php

namespace App\Services;

use App\Models\User;

interface IPerfilService
{
    /**
     * @param array<string,mixed> $dados
     */
    public function atualizar(User $user, array $dados): void;
}
