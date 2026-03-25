<?php

namespace App\Policies;

use App\Models\User;
use App\Enums\RoleEnum;

class RolePolicy
{
    public function isAdmin(User $user): bool
    {
        return $user->hasRole(RoleEnum::ADMIN->value);
    }

    public function isGestor(User $user): bool
    {
        return $user->hasRole(RoleEnum::GESTOR->value);
    }

    public function isFuncionario(User $user): bool
    {
        return $user->hasRole(RoleEnum::FUNCIONARIO->value);
    }
}
