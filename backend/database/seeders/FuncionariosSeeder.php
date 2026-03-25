<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Funcionario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Kra8\Snowflake\Snowflake;

class FuncionariosSeeder extends Seeder
{
    public function run(): void
    {
        $snowflake = app(Snowflake::class);


        $user = User::create([
            'id' => $snowflake->next(),
            'name' => 'Funcionário Padrão',
            'email' => 'func1@email.com',
            'password' => Hash::make('123456'),
        ]);

        Funcionario::create([
            'id' => $snowflake->next(),
            'user_id' => $user->id,
            'telefone' => '(11) 95555-0001',
            'cpf' => '123.456.789-00',
            'data_nascimento' => '1990-05-10',
        ]);
    }
}
