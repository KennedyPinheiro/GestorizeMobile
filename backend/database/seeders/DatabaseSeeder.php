<?php

namespace Database\Seeders;

use App\Models\Cliente;
use App\Models\Fornecedor;
use App\Models\Produto;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call([
            RolesSeeder::class,
            UnidadesMedidaSeeder::class,
            CategoriasSeeder::class,
            TestUsersSeeder::class, 
        ]);

        Fornecedor::factory(10)->create();
        Produto::factory(50)->create();

        Cliente::factory(5)->pf()->create();
        Cliente::factory(5)->pj()->create();

        $this->call([
            OrcamentoSeeder::class,
        ]);
    }
}