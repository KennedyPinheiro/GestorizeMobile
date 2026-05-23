<?php

namespace Database\Seeders;

use App\Models\UnidadeMedida;
use Illuminate\Database\Seeder;

class UnidadesMedidaSeeder extends Seeder
{
    public function run()
    {
        UnidadeMedida::create([
            'nome' => 'Unidade',
            'sigla' => 'UN'
        ]);

        UnidadeMedida::create([
            'nome' => 'Quilograma',
            'sigla' => 'KG'
        ]);
        UnidadeMedida::create([
            'nome' => 'Grama',
            'sigla' => 'G'
        ]);

        UnidadeMedida::create([
            'nome' => 'Litro',
            'sigla' => 'L'
        ]);
        UnidadeMedida::create([
            'nome' => 'Mililitro',
            'sigla' => 'ML'
        ]);

        UnidadeMedida::create([
            'nome' => 'Metro',
            'sigla' => 'M'
        ]);

        UnidadeMedida::create([
            'nome' => 'Caixa',
            'sigla' => 'CX'
        ]);
        
        UnidadeMedida::create([
            'nome' => 'Pacote',
            'sigla' => 'PKG'
        ]);
    }
}
