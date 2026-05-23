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
        Schema::create('fornecedores', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nome');
            $table->string('cnpj')->unique();
            $table->string('email')->nullable();
            $table->string('telefone')->nullable();
            $table->string('ramo_atividade')->nullable();
            $table->string('nome_responsavel')->nullable();
            $table->string('chave_pix')->nullable();
            $table->uuid('endereco_id')->nullable();
            $table->foreign('endereco_id')
                 ->references('id') 
                ->on('enderecos')
                ->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fornecedores');
    }
};
