<?php

namespace App\Services;

use App\Facades\Upload;
use App\Models\Funcionario;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class FuncionarioImagemService
{
    public function salvar(
        string $funcionarioId,
        UploadedFile $arquivo
    ): Funcionario {
        return DB::transaction(function () use (
            $funcionarioId,
            $arquivo
        ) {
            $funcionario = Funcionario::with('user')
                ->findOrFail($funcionarioId);

            $user = $funcionario->user;

            $avatarAnterior = $user->avatar;

            $caminho = Upload::make()
                ->file($arquivo)
                ->directory("funcionarios/{$funcionario->id}")
                ->disk('public')
                ->save();

            $user->avatar = $caminho;
            $user->save();

            if ($avatarAnterior && $avatarAnterior !== $caminho) {
                Storage::disk('public')->delete($avatarAnterior);
            }

            return $funcionario->load([
                'user',
                'endereco',
            ]);
        });
    }

    public function remover(string $funcionarioId): Funcionario
    {
        return DB::transaction(function () use ($funcionarioId) {
            $funcionario = Funcionario::with('user')
                ->findOrFail($funcionarioId);

            $user = $funcionario->user;

            $avatarAnterior = $user->avatar;

            $user->avatar = null;
            $user->save();

            if ($avatarAnterior) {
                Storage::disk('public')->delete($avatarAnterior);
            }

            return $funcionario->load([
                'user',
                'endereco',
            ]);
        });
    }
}
