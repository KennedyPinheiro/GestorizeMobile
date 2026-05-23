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
        Schema::create('orcamento_produtos', function (Blueprint $table) {
            $table->uuid('id')->primary(); 

            $table->foreignUuid('orcamento_id') 
                ->constrained('orcamentos')
                ->cascadeOnDelete();

            $table->foreignUuid('produto_id')   
                ->constrained('produtos')
                ->cascadeOnDelete();

            $table->integer('quantidade');
            $table->decimal('preco_unitario', 10, 2);
            $table->decimal('subtotal', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orcamento_produtos');
    }
};
