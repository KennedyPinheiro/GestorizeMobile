<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Endereco;
use App\Models\Funcionario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Enums\RoleEnum;

class TestUsersSeeder extends Seeder
{
    public function run(): void
    {
        $endereco = Endereco::create([
            'cep'        => '01310-100',
            'logradouro' => 'Av. Paulista',
            'numero'     => '1000',
            'bairro'     => 'Bela Vista',
            'cidade'     => 'São Paulo',
            'estado'     => 'SP',
        ]);

        $admin = User::create([
            'email'    => 'teste@email.com',
            'name'     => 'Administrador Teste',
            'password' => Hash::make('123456'),
        ]);
        $admin->syncRoles([RoleEnum::ADMIN->value]);
        Funcionario::create([
            'user_id'         => $admin->id,
            'telefone'        => '(11) 91111-0001',
            'cpf'             => '111.111.111-11',
            'data_nascimento' => '1985-01-10',
            'endereco_id'     => $endereco->id,
        ]);

        $endereco2 = Endereco::create([
            'cep'        => '20040-020',
            'logradouro' => 'Av. Rio Branco',
            'numero'     => '200',
            'bairro'     => 'Centro',
            'cidade'     => 'Rio de Janeiro',
            'estado'     => 'RJ',
        ]);

        $gestor = User::create([
            'email'    => 'gestor@example.com',
            'name'     => 'Gestor Teste',
            'password' => Hash::make('123456'),
        ]);
        $gestor->syncRoles([RoleEnum::GESTOR->value]);
        Funcionario::create([
            'user_id'         => $gestor->id,
            'telefone'        => '(21) 92222-0002',
            'cpf'             => '222.222.222-22',
            'data_nascimento' => '1990-06-15',
            'endereco_id'     => $endereco2->id,
        ]);

        $endereco3 = Endereco::create([
            'cep'        => '30130-110',
            'logradouro' => 'Av. Afonso Pena',
            'numero'     => '300',
            'bairro'     => 'Centro',
            'cidade'     => 'Belo Horizonte',
            'estado'     => 'MG',
        ]);

        $funcionario = User::create([
            'email'    => 'funcionario@example.com',
            'name'     => 'Funcionário Teste',
            'password' => Hash::make('123456'),
        ]);
        $funcionario->syncRoles([RoleEnum::FUNCIONARIO->value]);
        Funcionario::create([
            'user_id'         => $funcionario->id,
            'telefone'        => '(31) 93333-0003',
            'cpf'             => '333.333.333-33',
            'data_nascimento' => '1995-03-20',
            'endereco_id'     => $endereco3->id,
        ]);
    }
}
