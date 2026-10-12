<?php

namespace App\Services;

use App\Facades\Upload;
use App\Models\Fornecedor;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FornecedorImagemService
{
    public function salvar(
        string $fornecedorId,
        UploadedFile $arquivo
    ): Fornecedor {
        $fornecedor = Fornecedor::findOrFail($fornecedorId);

        $avatarAnterior = $fornecedor->avatar;

        $caminho = Upload::make()
            ->file($arquivo)
            ->directory("fornecedores/{$fornecedor->id}")
            ->disk('public')
            ->save();

        $fornecedor->avatar = $caminho;
        $fornecedor->save();

        $this->apagarArquivo($avatarAnterior);

        return $fornecedor->refresh();
    }

    public function remover(string $fornecedorId): Fornecedor
    {
        $fornecedor = Fornecedor::findOrFail($fornecedorId);

        $avatarAnterior = $fornecedor->avatar;

        $fornecedor->avatar = null;
        $fornecedor->save();

        $this->apagarArquivo($avatarAnterior);

        return $fornecedor->refresh();
    }

    private function apagarArquivo(?string $path): void
    {
        if (!$path) {
            return;
        }

        Storage::disk('public')->delete($path);
    }
}
