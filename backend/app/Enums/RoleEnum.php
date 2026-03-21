<?php

namespace App\Enums;

enum RoleEnum: int
{
    case ADMIN = 1;
    case GESTOR = 2;
    case FUNCIONARIO = 3;

    public function label(): string
    {
        return match($this) {
            self::ADMIN => 'Administrador',
            self::GESTOR => 'Gestor',
            self::FUNCIONARIO => 'Funcionário',
        };
    }
}