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
            /*
             * 1. Criar o usuário.
             */
            $user = User::create([
                'name' => $dados['name'],
                'email' => $dados['email'],
                'password' => $dados['password'],
            ]);

            /*
             * 2. Atribuir o perfil principal.
             *
             * O guard deve corresponder ao utilizado
             * na configuração do Spatie Permission.
             */
            $user->assignRole($dados['role']);

            /*
             * 3. Atribuir permissões adicionais diretamente
             * ao usuário, sem alterar as permissões do perfil.
             */
            $user->syncPermissions(
                $dados['permissions'] ?? []
            );

            /*
             * 4. Criar o registro específico do funcionário.
             */
            $funcionario = $user->funcionario()->create([
                'telefone' => $dados['telefone'],
                'data_nascimento' => $dados['data_nascimento'],
                'cpf' => $dados['cpf'],
                'endereco_id' => $dados['endereco_id'] ?? null,
            ]);

            /*
             * 5. Retornar o funcionário com seus relacionamentos
             * necessários para a camada de apresentação.
             *
             * A exposição dos dados será controlada pelo Resource.
             */
            return $funcionario->load([
                'user',
                'endereco',
            ]);
        });
    }
}
