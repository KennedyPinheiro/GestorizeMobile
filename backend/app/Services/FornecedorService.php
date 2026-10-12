<?php

namespace App\Services;

use App\Models\Fornecedor;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class FornecedorService
{

    public function listar(array $filtros = []): LengthAwarePaginator
    {
        $query = Fornecedor::query();

        if (!empty($filtros['nome'])) {
            $query->where(
                'nome',
                'like', 
                '%' . $filtros['nome'] . '%'
            );
        }

        if (!empty($filtros['cnpj'])) {
            $query->where(
                'cnpj',
                'like',
                '%' . $filtros['cnpj'] . '%'
            );
        }

        if (!empty($filtros['email'])) {
            $query->where(
                'email',
                'like',
                '%' . $filtros['email'] . '%'
            );
        }

        if (!empty($filtros['ramo_atividade'])) {
            $query->where(
                'ramo_atividade',
                'like',
                '%' . $filtros['ramo_atividade'] . '%'
            );
        }

        $porPagina = (int) ($filtros['per_page'] ?? 15);
        $porPagina = max(1, min($porPagina, 100));

        return $query
            ->orderBy('nome')
            ->paginate($porPagina)
            ->withQueryString();
    }

    public function buscar(string $id): Fornecedor
    {
        return Fornecedor::query()->findOrFail($id);
    }

    public function criar(array $dados): Fornecedor
    {
        return DB::transaction(function () use ($dados) {
            $fornecedor = Fornecedor::create($dados);

            return $fornecedor->refresh();
        });
    }


    public function atualizar(
        string $id,
        array $dados
    ): Fornecedor {
        return DB::transaction(function () use ($id, $dados) {
            $fornecedor = Fornecedor::query()->findOrFail($id);

            $fornecedor->update($dados);

            return $fornecedor->refresh();
        });
    }

    public function deletar(string $id): void
    {
        DB::transaction(function () use ($id) {
            $fornecedor = Fornecedor::query()->findOrFail($id);

            $fornecedor->delete();
        });
    }
}
