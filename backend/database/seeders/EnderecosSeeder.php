<?php

namespace Database\Seeders;

use App\Models\Endereco;
use Illuminate\Database\Seeder;

class EnderecosSeeder extends Seeder
{
    public function run(): void
    {
        Endereco::create([
            'cep'         => '01001-000',
            'logradouro'  => 'Praça da Sé',
            'numero'      => '100',
            'complemento' => 'Sala 1',
            'bairro'      => 'Sé',
            'cidade'      => 'São Paulo',
            'estado'      => 'SP',
        ]);

        Endereco::create([
            'cep'         => '20010-000',
            'logradouro'  => 'Rua da Assembléia',
            'numero'      => '200',
            'bairro'      => 'Centro',
            'cidade'      => 'Rio de Janeiro',
            'estado'      => 'RJ',
        ]);

        Endereco::create([
            'cep'         => '30140-110',
            'logradouro'  => 'Av. Afonso Pena',
            'numero'      => '1500',
            'complemento' => 'Conj. 301',
            'bairro'      => 'Centro',
            'cidade'      => 'Belo Horizonte',
            'estado'      => 'MG',
        ]);
    }
}