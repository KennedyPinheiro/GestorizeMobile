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
        Schema::create('funcionarios', function (Blueprint $table) {
            $table->foreignUuid('id')
                ->primary()
                ->constrained('users')
                ->cascadeOnDelete();

            $table->string('telefone', 20)->nullable();
            $table->date('data_nascimento')->nullable();
            $table->string('cpf', 14)->unique();

            $table->foreignUuid('endereco_id')
                ->nullable()
                ->constrained('enderecos')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('funcionarios');
    }
};
