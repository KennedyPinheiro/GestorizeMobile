<?php

namespace App\Services;

use App\Models\Funcionario;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class FuncionarioService
{
    public function criar(array $dados): Funcionario
    {
        return DB::transaction(function () use ($dados) {

            $user = User::create([
                'name' => $dados['name'],
                'email' => $dados['email'],
                'password' => $dados['password'],
            ]);
            $user->assignRole($dados['role']);

            $user->syncPermissions(
                $dados['permissions'] ?? []
            );

            $funcionario = $user->funcionario()->create([
                'telefone' => $dados['telefone'],
                'data_nascimento' => $dados['data_nascimento'],
                'cpf' => $dados['cpf'],
                'endereco_id' => $dados['endereco_id'] ?? null,
            ]);

            return $funcionario->load([
                'user',
                'endereco',
            ]);
        });
    }
}
