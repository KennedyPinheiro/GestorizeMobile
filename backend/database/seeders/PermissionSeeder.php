<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Permission;
use App\Models\Role;
use App\Enums\PermissionEnum;
use App\Enums\RoleEnum;
use Kra8\Snowflake\Snowflake;
use Spatie\Permission\PermissionRegistrar;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $snowflake = app(Snowflake::class);

        foreach (PermissionEnum::cases() as $permissionEnum) {
            $permission = Permission::firstOrNew([
                'name' => $permissionEnum->value,
                'guard_name' => 'api',
            ]);

            if (!$permission->exists) {
                // DatabaseSeeder uses WithoutModelEvents, so we must set the ID explicitly.
                $permission->id = $snowflake->next();
                $permission->save();
            }
        }

        foreach (RoleEnum::cases() as $roleEnum) {
            $role = Role::where('name', $roleEnum->value)->firstOrFail();

            $permissions = array_map(
                static fn (PermissionEnum $permission) => $permission->value,
                PermissionEnum::forRole($roleEnum)
            );

            $role->givePermissionTo($permissions);
        }

        app()[PermissionRegistrar::class]->forgetCachedPermissions();
    }
}
