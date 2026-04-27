<?php

namespace App\Enums;

enum PermissionEnum: string
{
    case CREATE_USERS = 'create users';
    case VIEW_USERS = 'view users';
    case EDIT_USERS = 'edit users';
    case DELETE_USERS = 'delete users';

    /**
     * Convenience helper for seeders/authorization checks.
     *
     * @return array<int, string>
     */
    public static function values(): array
    {
        return array_map(static fn (self $permission) => $permission->value, self::cases());
    }

    /**
     * Permissions granted to each role by default.
     *
     * @return array<int, self>
     */
    public static function forRole(RoleEnum $role): array
    {
        return match ($role) {
            RoleEnum::ADMIN => [
                self::CREATE_USERS,
                self::VIEW_USERS,
                self::EDIT_USERS,
                self::DELETE_USERS,
            ],
            RoleEnum::GESTOR => [
                self::CREATE_USERS,
                self::VIEW_USERS,
            ],
            RoleEnum::FUNCIONARIO => [
                self::VIEW_USERS,
            ],
        };
    }
}

