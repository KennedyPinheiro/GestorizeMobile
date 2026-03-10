<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolesSeeder extends Seeder
{
    public function run()
    {
        DB::table('roles')->insert([
    [
        'nome' => 'Administrador',
        'descricao' => 'Acesso total ao sistema'
    ],
    [
        'nome' => 'Funcionario',
        'descricao' => 'Acesso limitado ao sistema'
    ]
]);
    }

}
