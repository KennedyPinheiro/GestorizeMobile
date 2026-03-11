<?php
namespace App\Services;

use App\Models\Produto;

class ProdutoService
{

    public function listar()
    {
        return Produto::with([
            'categoria',
            'fornecedor',
            'unidadeMedida'
        ])->get();
    }

    public function criar($dados)
    {
        return Produto::create($dados);
    }

    public function buscar($id)
    {
        return Produto::findOrFail($id);
    }

    public function atualizar($id, $dados)
    {
        $produto = Produto::findOrFail($id);
        $produto->update($dados);

        return $produto;
    }

    public function deletar($id)
    {
        $produto = Produto::findOrFail($id);
        $produto->delete();

        return ['message' => 'Produto removido'];
    }

}