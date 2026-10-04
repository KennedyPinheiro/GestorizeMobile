<?php

namespace App\Services;

use App\Models\Produto;
use App\Models\ProdutoImagem;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProdutoImagemService
{
    public function adicionar(
        Produto $produto,
        UploadedFile $imagem,
        bool $principal = false
    ): ProdutoImagem {
        return DB::transaction(function () use (
            $produto,
            $imagem,
            $principal
        ) {
            if ($principal) {
                $this->removerPrincipal($produto);
            }

            $caminho = $imagem->store(
                "produtos/{$produto->id}",
                'public'
            );

            return $produto->imagens()->create([
                'caminho' => $caminho,
                'principal' => $principal,
            ]);
        });
    }

    public function definirPrincipal(
        ProdutoImagem $imagem
    ): ProdutoImagem {
        return DB::transaction(function () use ($imagem) {
            ProdutoImagem::where('produto_id', $imagem->produto_id)
                ->update([
                    'principal' => false,
                ]);

            $imagem->update([
                'principal' => true,
            ]);

            return $imagem->fresh();
        });
    }

    public function remover(
        ProdutoImagem $imagem
    ): void {
        DB::transaction(function () use ($imagem) {
            Storage::disk('public')->delete($imagem->caminho);

            $produto = $imagem->produto;
            $eraPrincipal = $imagem->principal;
            $imagem->delete();

            if ($eraPrincipal) {
                $novaPrincipal = $produto
                    ->imagens()
                    ->latest()
                    ->first();

                if ($novaPrincipal) {
                    $novaPrincipal->update([
                        'principal' => true,
                    ]);
                }
            }
        });
    }

    private function removerPrincipal(Produto $produto): void
    {
        $produto->imagens()
            ->where('principal', true)
            ->update([
                'principal' => false,
            ]);
    }

    public function listar(Produto $produto)
    {
        return $produto->imagens()
            ->latest()
            ->get();
    }
}
