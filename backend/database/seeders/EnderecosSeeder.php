<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EnderecosSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('enderecos')->upsert([
            [
                'id' => 1,
                'cep' => '01001-000',
                'logradouro' => 'Praça da Sé',
                'numero' => '100',
                'complemento' => 'Sala 1',
                'bairro' => 'Sé',
                'cidade' => 'São Paulo',
                'estado' => 'SP',
            ],
            [
                'id' => 2,
                'cep' => '20010-000',
                'logradouro' => 'Rua da Assembléia',
                'numero' => '200',
                'complemento' => null,
                'bairro' => 'Centro',
                'cidade' => 'Rio de Janeiro',
                'estado' => 'RJ',
            ],
            [
                'id' => 3,
                'cep' => '30140-110',
                'logradouro' => 'Av. Afonso Pena',
                'numero' => '1500',
                'complemento' => 'Conj. 301',
                'bairro' => 'Centro',
                'cidade' => 'Belo Horizonte',
                'estado' => 'MG',
            ],
        ], ['id'], ['cep', 'logradouro', 'numero', 'complemento', 'bairro', 'cidade', 'estado']);
    }
}
