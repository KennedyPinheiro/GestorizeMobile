<?php

namespace App\Services;

use App\Facades\Upload;
use App\Models\Cliente;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ClienteImagemService
{
    public function salvar(
        string $clienteId,
        UploadedFile $arquivo
    ): Cliente {
        $cliente = Cliente::findOrFail($clienteId);

        $avatarAnterior = $cliente->avatar;

        $caminho = Upload::make()
            ->file($arquivo)
            ->directory("clientes/{$cliente->id}")
            ->disk('public')
            ->save();

        $cliente->avatar = $caminho;
        $cliente->save();

        $this->apagarArquivo($avatarAnterior);

        return $cliente->refresh();
    }

    public function remover(string $clienteId): Cliente
    {
        $cliente = Cliente::findOrFail($clienteId);

        $avatarAnterior = $cliente->avatar;

        $cliente->avatar = null;
        $cliente->save();

        $this->apagarArquivo($avatarAnterior);

        return $cliente->refresh();
    }

    private function apagarArquivo(?string $path): void
    {
        if (!$path) {
            return;
        }

        Storage::disk('public')->delete($path);
    }
}
