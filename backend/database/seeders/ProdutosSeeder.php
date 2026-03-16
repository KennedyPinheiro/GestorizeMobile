<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class ProdutosSeeder extends Seeder
{
    public function run(): void
    {
        $hoje = Carbon::today()->toDateString();

        DB::table('produtos')->upsert([
            [
                'id' => 1,
                'nome' => 'Cimento CP-II 50kg',
                'descricao' => 'Saco de cimento para construção',
                'preco_custo' => 30.00,
                'porcentagem_lucro' => 25.00,
                'preco_venda' => 37.50,
                'estoque' => 100,
                'data_entrada' => $hoje,
                'validade' => null,
                'fornecedor_id' => 1,
                'categoria_id' => 4,
                'unidade_medida_id' => 7,
            ],
            [
                'id' => 2,
                'nome' => 'Martelo de Unha 27mm',
                'descricao' => 'Cabo emborrachado',
                'preco_custo' => 15.00,
                'porcentagem_lucro' => 40.00,
                'preco_venda' => 21.00,
                'estoque' => 50,
                'data_entrada' => $hoje,
                'validade' => null,
                'fornecedor_id' => 1,
                'categoria_id' => 3,
                'unidade_medida_id' => 1,
            ],
            [
                'id' => 3,
                'nome' => 'Suco de Laranja 1L',
                'descricao' => 'Suco natural pasteurizado',
                'preco_custo' => 4.50,
                'porcentagem_lucro' => 50.00,
                'preco_venda' => 6.75,
                'estoque' => 200,
                'data_entrada' => $hoje,
                'validade' => Carbon::today()->addMonths(6)->toDateString(),
                'fornecedor_id' => 2,
                'categoria_id' => 2,
                'unidade_medida_id' => 4,
            ],
        ], ['id'], ['nome', 'descricao', 'preco_custo', 'porcentagem_lucro', 'preco_venda', 'estoque', 'data_entrada', 'validade', 'fornecedor_id', 'categoria_id', 'unidade_medida_id']);

        $agora = Carbon::now();

        DB::table('categoria_produto')->upsert([
            [
                'produto_id' => 1,
                'categoria_id' => 4,
                'is_principal' => true,
                'created_at' => $agora,
                'updated_at' => $agora,
            ],
            [
                'produto_id' => 2,
                'categoria_id' => 3,
                'is_principal' => true,
                'created_at' => $agora,
                'updated_at' => $agora,
            ],
            [
                'produto_id' => 3,
                'categoria_id' => 2,
                'is_principal' => true,
                'created_at' => $agora,
                'updated_at' => $agora,
            ],
        ], ['produto_id', 'categoria_id'], ['is_principal', 'updated_at']);
    }
}
