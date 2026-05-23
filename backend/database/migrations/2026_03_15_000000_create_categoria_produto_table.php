<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('categoria_produto', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('produto_id')
                ->constrained('produtos')
                ->cascadeOnDelete();

            $table->foreignUuid('categoria_id')
                ->constrained('categorias')
                ->cascadeOnDelete();

            $table->boolean('is_principal')->default(false);

            $table->timestamps();

            $table->unique(['produto_id', 'categoria_id']);
            $table->index(['produto_id', 'is_principal']);
        });

        DB::table('produtos')->select(['id', 'categoria_id'])->orderBy('id')->chunk(200, function ($produtos) {
            $now = now();
            $rows = [];

            foreach ($produtos as $produto) {
                if ($produto->categoria_id === null) {
                    continue;
                }

                $rows[] = [
                    'produto_id' => $produto->id,
                    'categoria_id' => $produto->categoria_id,
                    'is_principal' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }

            if ($rows) {
                DB::table('categoria_produto')->upsert($rows, ['produto_id', 'categoria_id']);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categoria_produto');
    }
};
