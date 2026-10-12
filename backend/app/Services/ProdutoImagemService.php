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
    public function substituirPrincipal(
        Produto $produto,
        UploadedFile $imagem
    ): ProdutoImagem {
        return DB::transaction(function () use ($produto, $imagem) {
            $imagemAnterior = $produto->imagens()
                ->where('principal', true)
                ->first();

            $caminhoAnterior = $imagemAnterior?->caminho;

            $caminho = $imagem->store(
                "produtos/{$produto->id}",
                'public'
            );

            if (!$caminho) {
                throw new \RuntimeException(
                    'Não foi possível armazenar a imagem do produto.'
                );
            }

            if ($imagemAnterior) {
                $imagemAnterior->update([
                    'caminho' => $caminho,
                ]);

                $imagemAnterior->save();

                if ($caminhoAnterior) {
                    Storage::disk('public')->delete($caminhoAnterior);
                }

                return $imagemAnterior->fresh();
            }

            return $produto->imagens()->create([
                'caminho' => $caminho,
                'principal' => true,
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
    public function remover(ProdutoImagem $imagem): void
    {
        DB::transaction(function () use ($imagem) {
            $produto = $imagem->produto;
            $eraPrincipal = $imagem->principal;
            $caminho = $imagem->caminho;

            if (filled($caminho)) {
                Storage::disk('public')->delete($caminho);
            }

            $imagem->delete();

            if ($eraPrincipal && $produto) {
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
