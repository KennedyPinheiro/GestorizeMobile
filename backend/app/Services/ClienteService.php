<?php

namespace App\Services;

use App\Models\Cliente;
use App\Models\Endereco;
use Illuminate\Support\Facades\DB;

class ClienteService
{
    public function listar()
    {
        return Cliente::with([
            'endereco',
            'dadosPf',
            'dadosPj',
        ])->paginate(20);
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
        return Cliente::with([
            'endereco',
            'dadosPf',
            'dadosPj',
        ])->findOrFail($id);
    }

    public function atualizar(string $id, array $dados): Cliente
    {
        return DB::transaction(function () use ($id, $dados) {
            $cliente = Cliente::findOrFail($id);

            $cliente->update([
                'nome'     => $dados['nome'] ?? $cliente->nome,
                'email'    => $dados['email'] ?? $cliente->email,
                'telefone' => $dados['telefone'] ?? $cliente->telefone,
                'imagem'   => $dados['imagem'] ?? $cliente->imagem,
            ]);
            if (isset($dados['endereco'])) {
                if ($cliente->endereco_id) {
                    $endereco = Endereco::find($cliente->endereco_id);

                    if ($endereco) {
                        $endereco->update($dados['endereco']);
                    }
                } else {
                    $endereco = Endereco::create($dados['endereco']);

                    $cliente->update([
                        'endereco_id' => $endereco->id,
                    ]);
                }
            }

            if ($cliente->tipo === 'pf' && isset($dados['pf'])) {
                $cliente->dadosPf()->updateOrCreate(
                    ['cliente_id' => $cliente->id],
                    $dados['pf']
                );
            }

            if ($cliente->tipo === 'pj' && isset($dados['pj'])) {
                $cliente->dadosPj()->updateOrCreate(
                    ['cliente_id' => $cliente->id],
                    $dados['pj']
                );
            }

            return $cliente->load([
                'dadosPf',
                'dadosPj',
            ]);
        });
    }

    public function deletar(int $id): array
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->delete();

        return ['message' => 'Cliente removido'];
    }
}
