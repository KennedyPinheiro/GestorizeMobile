<?php

namespace App\Enums;

enum RoleEnum: string
{
    case ADMIN = 'admin';
    case GESTOR = 'gestor';
    case FUNCIONARIO = 'funcionario';

    public function label(): string
    {
        return match($this) {
            self::ADMIN => 'Administrador',
            self::GESTOR => 'Gestor',
            self::FUNCIONARIO => 'Funcionário',
        };
    }
}