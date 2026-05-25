<?php

namespace Database\Seeders;

use App\Models\Cliente;
use App\Models\Orcamento;
use App\Models\OrcamentoItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrcamentoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Cliente::factory(5)->pf()->create();
        Cliente::factory(5)->pj()->create();

        Orcamento::factory(20)->create()->each(function (Orcamento $orcamento) {
            $itens = OrcamentoItem::factory(rand(2, 5))->make([
                'orcamento_id' => $orcamento->id,
            ]);

            $orcamento->itens()->saveMany($itens);

            $orcamento->update([
                'valor_total' => $orcamento->itens()->sum('subtotal'),
            ]);
        });
    }
}
