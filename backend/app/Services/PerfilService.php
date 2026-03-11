<?php

namespace App\Services;

use App\Exceptions\PerfilException;
use App\Facades\Upload;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class PerfilService implements IPerfilService
{
    /**
     * @param array<string,mixed> $
     */
    public function atualizar(User $user, array $dados): void
    {
        try {
            DB::beginTransaction();

            $foto = $dados['foto'] ?? null;
            unset($dados['foto']);

            $user->update($dados);

            if ($foto instanceof UploadedFile) {
                $user->foto = $this->salvarFotoPerfil($user, $foto);
                $user->save();
            } elseif ($foto !== null) {
                throw new PerfilException('Foto inválida.');
            }

            DB::commit();
        } catch(\Exception $e) {
            DB::rollBack();
            throw new PerfilException("Erro interno ao atualizar as informações do usuário {$user->name}!");
        }
    }

    private function salvarFotoPerfil(User $user, UploadedFile $foto): string
    {
        $pasta = "alunos/{$user->id}";

        return Upload::make()
            ->file($foto)
            ->directory($pasta)
            ->disk('public')
            ->save();
    }
}
