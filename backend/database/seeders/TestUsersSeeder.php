<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TestUsersSeeder extends Seeder
{
    public function run(): void
    {
        $adminRoleId = DB::table('roles')->where('nome', 'Administrador')->value('id');
        $gestorRoleId = DB::table('roles')->where('nome', 'Gestor')->value('id');
        $funcRoleId = DB::table('roles')->where('nome', 'Funcionario')->value('id');

        User::updateOrCreate(
            ['email' => 'teste@email.com'],
            [
                'name' => 'Administrador Teste',
                'password' => Hash::make('123456'),
                'role_id' => $adminRoleId,
            ]
        );

        User::updateOrCreate(
            ['email' => 'gestor@example.com'],
            [
                'name' => 'Gestor Teste',
                'password' => Hash::make('123456'),
                'role_id' => $gestorRoleId,
            ]
        );

        User::updateOrCreate(
            ['email' => 'funcionario@example.com'],
            [
                'name' => 'Funcionário Teste',
                'password' => Hash::make('123456'),
                'role_id' => $funcRoleId,
            ]
        );
    }
}
