<?php

namespace App\Services;

use App\Models\Orcamento;

class OrcamentoService
{
    public function listar()
    {
        return Orcamento::with(['cliente', 'itens.produto'])->get();
    }

    public function criar(array $dados): Orcamento
    {
        return Orcamento::create($dados);
    }

    public function buscar(int $id): Orcamento
    {
        return Orcamento::with(['cliente', 'funcionario', 'itens.produto'])->findOrFail($id);
    }

    public function atualizar(int $id, array $dados): Orcamento
    {
        $orcamento = Orcamento::findOrFail($id);
        $orcamento->update($dados);

        return $orcamento->load(['cliente', 'funcionario', 'itens.produto']);
    }

    public function deletar(int $id): array
    {
        $orcamento = Orcamento::findOrFail($id);
        $orcamento->delete();

        return ['message' => 'Orçamento removido'];
    }
}
