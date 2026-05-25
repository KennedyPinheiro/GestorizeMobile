<?php

namespace Database\Factories;

use App\Models\Endereco;
use Illuminate\Database\Eloquent\Factories\Factory;

class EnderecoFactory extends Factory
{
    protected $model = Endereco::class;

    public function definition(): array
    {
        $estados = [
            'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
            'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
            'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
        ];

        return [
            'cep'          => $this->faker->numerify('#####-###'),
            'logradouro'   => $this->faker->streetName(),
            'numero'       => $this->faker->buildingNumber(),
            'complemento'  => $this->faker->optional()->secondaryAddress(),
            'bairro'       => $this->faker->citySuffix(),
            'cidade'       => $this->faker->city(),
            'estado'       => $this->faker->randomElement($estados),
        ];
    }
}