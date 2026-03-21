<?php

namespace App\Policies;

use App\Enums\RoleEnum;
use App\Models\User;

class RolePolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

     public function isValid(User $user): bool
    {
        return in_array($user->role_id, [
        RoleEnum::ADMIN,
        RoleEnum::GESTOR,
        RoleEnum::FUNCIONARIO,
    ]);
    }
}
