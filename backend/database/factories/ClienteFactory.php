<?php

namespace Database\Factories;

use App\Models\Cliente;
use App\Models\ClientePf;
use App\Models\ClientePj;
use App\Models\Endereco;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClienteFactory extends Factory
{
    protected $model = Cliente::class;

    public function definition(): array
    {
        return [
            'nome'        => $this->faker->name(),
            'tipo'        => $this->faker->randomElement(['PF', 'PJ']),
            'email'       => $this->faker->unique()->safeEmail(),
            'telefone'    => $this->faker->numerify('(##) #####-####'),
            'endereco_id' => Endereco::factory(),
        ];
    }

    public function pf(): static
    {
        return $this->state(['tipo' => 'PF'])->afterCreating(function (Cliente $cliente) {
            ClientePf::create([
                'cliente_id'      => $cliente->id,
                'genero'          => $this->faker->randomElement(['M', 'F']),
                'rg'              => $this->faker->numerify('#########'),
                'cpf'             => $this->faker->numerify('###.###.###-##'),
                'data_nascimento' => $this->faker->dateTimeBetween('-60 years', '-18 years'),
            ]);
        });
    }

    public function pj(): static
    {
        return $this->state(['tipo' => 'PJ'])->afterCreating(function (Cliente $cliente) {
            ClientePj::create([
                'cliente_id'        => $cliente->id,
                'cnpj'              => $this->faker->numerify('##.###.###/####-##'),
                'razao_social'      => $this->faker->company(),
                'nome_fantasia'     => $this->faker->companySuffix(),
                'nome_responsavel'  => $this->faker->name(),
                'cpf_responsavel'   => $this->faker->numerify('###.###.###-##'),
                'cargo_responsavel' => $this->faker->jobTitle(),
                'endereco_id'       => Endereco::factory()->create()->id,
            ]);
        });
    }
}