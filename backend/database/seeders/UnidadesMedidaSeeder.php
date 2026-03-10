<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnidadesMedidaSeeder extends Seeder
{
    public function run()
    {
        DB::table('unidades_medida')->insert([
            ['nome' => 'Unidade', 'sigla' => 'UN'],
            ['nome' => 'Quilograma', 'sigla' => 'KG'],
            ['nome' => 'Grama', 'sigla' => 'G'],
            ['nome' => 'Litro', 'sigla' => 'L'],
            ['nome' => 'Mililitro', 'sigla' => 'ML'],
            ['nome' => 'Metro', 'sigla' => 'M'],
            ['nome' => 'Caixa', 'sigla' => 'CX'],
            ['nome' => 'Pacote', 'sigla' => 'PCT']
        ]);
    }
}
