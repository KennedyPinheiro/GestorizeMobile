<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Kra8\Snowflake\Snowflake;
use App\Enums\RoleEnum;

class TestUsersSeeder extends Seeder
{
    public function run(): void
    {
        $snowflake = app(Snowflake::class);

        $admin = User::updateOrCreate(
            ['email' => 'teste@email.com'],
            [
                'id' => $snowflake->next(),
                'name' => 'Administrador Teste',
                'password' => Hash::make('123456'),
            ]
        );

        $admin->syncRoles([RoleEnum::ADMIN->value]);

        $gestor = User::updateOrCreate(
            ['email' => 'gestor@example.com'],
            [
                'id' => $snowflake->next(),
                'name' => 'Gestor Teste',
                'password' => Hash::make('123456'),
            ]
        );

        $gestor->syncRoles([RoleEnum::GESTOR->value]);

        $funcionario = User::updateOrCreate(
            ['email' => 'funcionario@example.com'],
            [
                'id' => $snowflake->next(),
                'name' => 'Funcionário Teste',
                'password' => Hash::make('123456'),
            ]
        );

        $funcionario->syncRoles([RoleEnum::FUNCIONARIO->value]);
    }
}
