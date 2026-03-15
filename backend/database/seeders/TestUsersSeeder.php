<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class TestUsersSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'teste@email.com'],
            [
                'name' => 'Administrador Teste',
                'password' => Hash::make('123456'),
                'is_admin' => true,
                'role_id' => 1,
            ]
        );

        User::updateOrCreate(
            ['email' => 'funcionario@example.com'],
            [
                'name' => 'Funcionário Teste',
                'password' => Hash::make('123456'),
                'is_admin' => false,
                'role_id' => 2,
            ]
        );
    }
}
