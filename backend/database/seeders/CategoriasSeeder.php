<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriasSeeder extends Seeder
{
    public function run()
    {
       Categoria::create([
            'nome' => 'Alimentos',
        ]);

        Categoria::create([
            'nome' => 'Bebidas',
        ]);

        Categoria::create([
            'nome' => 'Limpeza',
        ]);

        Categoria::create([
            'nome' => 'Higiene Pessoal',
        ]);

        Categoria::create([
            'nome' => 'Eletrônicos',
        ]);

        Categoria::create([
            'nome' => 'Roupas',
        ]);

        Categoria::create([
            'nome' => 'Calçados',
        ]);

        Categoria::create([
            'nome' => 'Móveis',
        ]);

        Categoria::create([
            'nome' => 'Brinquedos',
        ]);
    }
}
