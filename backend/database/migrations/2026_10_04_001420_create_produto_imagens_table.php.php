<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produto_imagens', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->foreignUuid('produto_id')
                ->constrained('produtos')
                ->cascadeOnDelete();

            $table->string('caminho');
            $table->boolean('principal')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produto_imagens');
    }
};
