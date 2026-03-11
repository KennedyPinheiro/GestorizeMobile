<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class OrcamentosSeeder extends Seeder
{
    public function run(): void
    {
        // Cria um orçamento
        DB::table('orcamentos')->upsert([
            [
                'id' => 1,
                'cliente_id' => 1,
                'funcionario_id' => 1,
                'valor_total' => 58.50,
                'data_orcamento' => Carbon::today()->toDateString(),
            ],
        ], ['id'], ['cliente_id', 'funcionario_id', 'valor_total', 'data_orcamento']);

        // Itens do orçamento
        DB::table('orcamento_produtos')->upsert([
            [
                'id' => 1,
                'orcamento_id' => 1,
                'produto_id' => 1,
                'quantidade' => 1,
                'preco_unitario' => 37.50,
                'subtotal' => 37.50,
            ],
            [
                'id' => 2,
                'orcamento_id' => 1,
                'produto_id' => 2,
                'quantidade' => 1,
                'preco_unitario' => 21.00,
                'subtotal' => 21.00,
            ],
        ], ['id'], ['orcamento_id', 'produto_id', 'quantidade', 'preco_unitario', 'subtotal']);
    }
}
