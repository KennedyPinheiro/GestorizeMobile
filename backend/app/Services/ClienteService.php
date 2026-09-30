<?php

namespace App\Services;

use App\Models\Cliente;
use App\Models\Endereco;
use Illuminate\Support\Facades\DB;

class ClienteService
{
    public function listar()
    {
        return Cliente::all();
    }

    public function criar(array $dados): Cliente
    {
        return DB::transaction(function () use ($dados) {
            $endereco = isset($dados['endereco']) ? Endereco::create($dados['endereco']) : null;

            $cliente = Cliente::create([
                'nome'        => $dados['nome'],
                'tipo'        => $dados['tipo'],
                'email'       => $dados['email'] ?? null,
                'telefone'    => $dados['telefone'] ?? null,
                'endereco_id' => $endereco?->id,
            ]);

            $dados['tipo'] === 'pf'
                ? $cliente->dadosPf()->create($dados['pf'])
                : $cliente->dadosPj()->create($dados['pj']);

            return $cliente->load(['dadosPf', 'dadosPj']);
        });
    }

    public function buscar(string $id): Cliente
    {
        return Cliente::findOrFail($id);
    }

    public function atualizar(int $id, array $dados): Cliente
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->update($dados);

        return $cliente;
    }

    public function deletar(int $id): array
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->delete();

        return ['message' => 'Cliente removido'];
    }
}
