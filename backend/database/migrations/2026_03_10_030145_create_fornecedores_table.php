<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fornecedores', function (Blueprint $table) {
            $table->id();

            $table->string('nome');
            $table->string('cnpj')->unique();

            $table->string('email')->nullable();
            $table->string('telefone')->nullable();

            $table->string('nome_responsavel')->nullable();
            $table->string('chave_pix')->nullable();

            // 🔥 NOVA RELAÇÃO
            $table->foreignId('fornecedor_categoria_id')
                ->constrained('fornecedor_categorias')
                ->restrictOnDelete();

            $table->foreignId('endereco_id')
                ->nullable()
                ->constrained('enderecos')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fornecedores');
    }
};