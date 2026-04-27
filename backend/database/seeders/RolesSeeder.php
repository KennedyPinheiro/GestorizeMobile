<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;
use App\Enums\RoleEnum;
use Kra8\Snowflake\Snowflake;

class RolesSeeder extends Seeder
{
    public function run(): void
    {
        $snowflake = app(Snowflake::class);

        foreach (RoleEnum::cases() as $roleEnum) {
            Role::updateOrCreate(
                ['name' => $roleEnum->value],
                [
                    'id' => $snowflake->next(),
                    'guard_name' => 'api',
                ]
            );
        }
    }
}
