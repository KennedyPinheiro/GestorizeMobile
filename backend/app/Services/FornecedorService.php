<?php

namespace App\Services;

use App\Models\Fornecedor;

class FornecedorService
{
    public function listar()
    {
        return Fornecedor::all();
    }

    public function criar(array $dados): Fornecedor
    {
        return Fornecedor::create($dados);
    }

    public function buscar(int $id): Fornecedor
    {
        return Fornecedor::findOrFail($id);
    }

    public function atualizar(int $id, array $dados): Fornecedor
    {
        $fornecedor = Fornecedor::findOrFail($id);
        $fornecedor->update($dados);

        return $fornecedor;
    }

    public function deletar(int $id): array
    {
        $fornecedor = Fornecedor::findOrFail($id);
        $fornecedor->delete();

        return ['message' => 'Fornecedor removido'];
    }
}
