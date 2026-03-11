<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class FuncionariosSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('funcionarios')->upsert([
            [
                'id' => 1,
                'nome' => 'Funcionário Padrão',
                'email' => 'func1@example.com',
                'telefone' => '(11) 95555-0001',
                'password' => Hash::make('123456'),
                'data_nascimento' => '1990-05-10',
                'cpf' => '123.456.789-00',
                'rg' => '12.345.678-9',
                'role_id' => 2,
                'endereco_id' => 2,
            ],
        ], ['id'], ['nome', 'email', 'telefone', 'password', 'data_nascimento', 'cpf', 'rg', 'role_id', 'endereco_id']);
    }
}
