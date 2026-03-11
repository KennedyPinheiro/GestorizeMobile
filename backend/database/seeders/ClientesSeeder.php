<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClientesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('clientes')->upsert([
            [
                'id' => 1,
                'nome' => 'Carlos Pereira',
                'tipo' => 'pf',
                'telefone' => '(11) 99999-1111',
                'email' => 'carlos.pereira@email.com',
                'endereco_id' => 3,
            ],
            [
                'id' => 2,
                'nome' => 'Construções Alfa',
                'tipo' => 'pj',
                'telefone' => '(11) 98888-2222',
                'email' => 'compras@construcoesalfa.com',
                'endereco_id' => 1,
            ],
        ], ['id'], ['nome', 'tipo', 'telefone', 'email', 'endereco_id']);

        DB::table('clientes_pf')->upsert([
            [
                'id' => 1,
                'cliente_id' => 1,
                'genero' => 'masculino',
                'rg' => '12.345.678-9',
                'cpf' => '123.456.789-00',
                'data_nascimento' => '1990-05-10',
            ],
        ], ['id'], ['cliente_id', 'genero', 'rg', 'cpf', 'data_nascimento']);

        DB::table('clientes_pj')->upsert([
            [
                'id' => 1,
                'cliente_id' => 2,
                'cnpj' => '12.345.678/0001-00',
                'razao_social' => 'Construções Alfa LTDA',
                'nome_fantasia' => 'Alfa Engenharia',
                'nome_responsavel' => 'José Almeida',
                'cpf_responsavel' => '987.654.321-00',
                'cargo_responsavel' => 'Diretor',
                'endereco_id' => 1,
            ],
        ], ['id'], ['cliente_id', 'cnpj', 'razao_social', 'nome_fantasia', 'nome_responsavel', 'cpf_responsavel', 'cargo_responsavel', 'endereco_id']);
    }
}
