<?php

namespace App\Services;

use App\Models\Funcionario;
use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;


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

    public function listar(): LengthAwarePaginator
    {
        return Funcionario::with([
            'user.roles',
            'endereco',
        ])
            ->orderBy('created_at', 'desc')
            ->paginate(15);
    }

    public function buscar(string $id): Funcionario
    {
        return Funcionario::with([
            'user.roles',
            'endereco',
        ])->findOrFail($id);
    }

    public function atualizar(
        string $id,
        array $dados
    ): Funcionario {
        return DB::transaction(function () use ($id, $dados) {
            $funcionario = Funcionario::with('user')
                ->findOrFail($id);

            $user = $funcionario->user;

            $dadosUsuario = [];

            if (array_key_exists('name', $dados)) {
                $dadosUsuario['name'] = $dados['name'];
            }

            if (array_key_exists('email', $dados)) {
                $dadosUsuario['email'] = $dados['email'];
            }

            if (
                array_key_exists('password', $dados)
                && filled($dados['password'])
            ) {
                $dadosUsuario['password'] = $dados['password'];
            }

            if (! empty($dadosUsuario)) {
                $user->update($dadosUsuario);
            }

            if (array_key_exists('role', $dados)) {
                $user->syncRoles([$dados['role']]);
            }

            if (array_key_exists('permissions', $dados)) {
                $user->syncPermissions(
                    $dados['permissions'] ?? []
                );
            }
            $dadosFuncionario = [];

            foreach (
                [
                    'telefone',
                    'data_nascimento',
                    'cpf',
                    'endereco_id',
                ] as $campo
            ) {
                if (array_key_exists($campo, $dados)) {
                    $dadosFuncionario[$campo] = $dados[$campo];
                }
            }

            if (! empty($dadosFuncionario)) {
                $funcionario->update($dadosFuncionario);
            }

            return $funcionario->fresh([
                'user.roles',
                'endereco',
            ]);
        });
    }

    public function deletar(string $id): void
    {
        DB::transaction(function () use ($id) {
            $funcionario = Funcionario::with('user')
                ->findOrFail($id);

            $user = $funcionario->user;

            if ($user?->avatar) {
                Storage::disk('public')->delete(
                    $user->avatar
                );
            }

            $funcionario->delete();
            $user?->delete();
        });
    }
}
