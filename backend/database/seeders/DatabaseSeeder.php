<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolesSeeder::class,
            UnidadesMedidaSeeder::class,
            CategoriasSeeder::class,
            EnderecosSeeder::class,
            ClientesSeeder::class,
            TestUsersSeeder::class,
            PermissionSeeder::class,
        ]);
        // Factory user opcional removido, pois agora temos seeds explícitos.
    }
}
