<?php

namespace App\Services;

use App\Models\Cliente;

class ClienteService
{
    public function listar()
    {
        return Cliente::all();
    }

    public function criar(array $dados): Cliente
    {
        return Cliente::create($dados);
    }

    public function buscar(int $id): Cliente
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
