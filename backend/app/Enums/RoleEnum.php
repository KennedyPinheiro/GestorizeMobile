<?php

namespace App\Enums;

enum RoleEnum: string
{
    case ADMIN = 'admin';
    case GESTOR = 'gestor';
    case FUNCIONARIO = 'funcionario';
    case CLIENTE = 'cliente';
    public function label(): string
    {
        return match($this) {
            self::ADMIN => 'Administrador',
            self::GESTOR => 'Gestor',
            self::FUNCIONARIO => 'Funcionário',
            self::CLIENTE=>'Cliente'
        };
    }
}