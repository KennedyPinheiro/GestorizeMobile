<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Godruoyi\Snowflake\Snowflake;

class RolesSeeder extends Seeder
{


    public function run()
    {
        $snowflake = new Snowflake();

        DB::table('roles')->insert([
            [
                'id' => $snowflake->id(),
                'nome' => 'Administrador',
                'descricao' => 'Acesso total ao sistema'
            ],
            [
                'id' => $snowflake->id(),
                'nome' => 'Gestor',
                'descricao' => 'Acesso quase total ao sistema'

            ],
            [
                'id' => $snowflake->id(),
                'nome' => 'Funcionario',
                'descricao' => 'Acesso limitado ao sistema'
            ],
        ]);
    }
}
