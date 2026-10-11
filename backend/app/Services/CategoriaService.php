<?php

namespace App\Services;

use App\Models\Categoria;
use Illuminate\Database\Eloquent\Collection;

class CategoriaService
{

    public function listar(): Collection
    {
        return Categoria::query()
            ->orderBy('nome')
            ->get();
    }

    public function criar(array $dados): Categoria
    {
        return Categoria::create([
            'nome' => trim($dados['nome']),
        ]);
    }
}
