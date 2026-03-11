<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FornecedoresSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('fornecedores')->upsert([
            [
                'id' => 1,
                'nome' => 'Fornecedor Central',
                'cnpj' => '12.345.678/0001-90',
                'email' => 'contato@fornecedorcentral.com',
                'telefone' => '(11) 4000-1000',
                'ramo_atividade' => 'Distribuição geral',
                'nome_responsavel' => 'João Distribuidor',
                'chave_pix' => 'contato@fornecedorcentral.com',
                'endereco_id' => 1,
            ],
            [
                'id' => 2,
                'nome' => 'Bebidas Premium',
                'cnpj' => '98.765.432/0001-10',
                'email' => 'suporte@bebidaspremium.com',
                'telefone' => '(21) 3222-5555',
                'ramo_atividade' => 'Bebidas',
                'nome_responsavel' => 'Maria Sommelier',
                'chave_pix' => 'maria@bebidaspremium.com',
                'endereco_id' => 2,
            ],
        ], ['id'], ['nome', 'cnpj', 'email', 'telefone', 'ramo_atividade', 'nome_responsavel', 'chave_pix', 'endereco_id']);
    }
}
