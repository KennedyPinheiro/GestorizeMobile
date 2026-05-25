<?php

namespace Database\Factories;

use App\Models\Categoria;
use App\Models\Fornecedor;
use App\Models\Produto;
use App\Models\UnidadeMedida;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProdutoFactory extends Factory
{
    protected $model = Produto::class;

    public function definition(): array
    {
        $precoCusto = $this->faker->randomFloat(2, 5, 500);
        $porcentagemLucro = $this->faker->randomFloat(2, 10, 100);
        $precoVenda = round($precoCusto * (1 + $porcentagemLucro / 100), 2);

        return [
            'nome'                => $this->faker->words(3, true),
            'descricao'           => $this->faker->sentence(),
            'preco_custo'         => $precoCusto,
            'porcentagem_lucro'   => $porcentagemLucro,
            'preco_venda'         => $precoVenda,
            'data_entrada'        => $this->faker->dateTimeBetween('-1 year', 'now'),
            'categoria_id'        => Categoria::inRandomOrder()->value('id')
                                        ?? Categoria::factory(),
            'fornecedor_id'       => Fornecedor::inRandomOrder()->value('id')
                                        ?? Fornecedor::factory(),
            'unidade_medida_id'   => UnidadeMedida::inRandomOrder()->value('id')
                                        ?? UnidadeMedida::factory(),
            'estoque'             => $this->faker->numberBetween(0, 500),
            'validade'            => $this->faker->optional()->dateTimeBetween('now', '+2 years'),
        ];
    }
}