<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriasSeeder extends Seeder
{
    public function run()
    {
        DB::table('categorias')->insert([
            ['nome' => 'Alimentos'],
            ['nome' => 'Bebidas'],
            ['nome' => 'Ferramentas'],
            ['nome' => 'Material de Construção']
        ]);
    }
}
