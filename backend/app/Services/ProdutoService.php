<?php

namespace App\Services;

use App\Models\Produto;
use App\Models\ProdutoImagem;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProdutoService
{
    public function listar(): Collection
    {
        return Produto::with([
            'categoria',
            'fornecedor',
            'unidadeMedida',
            'imagens',
        ])
            ->latest()
            ->get();
    }

    public function buscar(string $id): Produto
    {
        return Produto::with([
            'categoria',
            'fornecedor',
            'unidadeMedida',
            'imagens',
        ])->findOrFail($id);
    }

    public function criar(array $dados): Produto
    {
        return DB::transaction(function () use ($dados) {
            $produto = Produto::create($dados);

            return $produto->load([
                'categoria',
                'fornecedor',
                'unidadeMedida',
                'imagens',
            ]);
        });
    }

    public function atualizar(
        Produto $produto,
        array $dados
    ): Produto {
        return DB::transaction(function () use ($produto, $dados) {
            $produto->update($dados);

            return $produto->fresh([
                'categoria',
                'fornecedor',
                'unidadeMedida',
                'imagens',
            ]);
        });
    }

    public function excluir(Produto $produto): void
    {
        DB::transaction(function () use ($produto) {
            $produto->imagens->each(function (ProdutoImagem $imagem) {
                Storage::disk('public')->delete($imagem->caminho);
            });

            $produto->delete();
        });
    }
}
