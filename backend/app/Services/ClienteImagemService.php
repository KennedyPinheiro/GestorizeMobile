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

        $imagemAnterior = $cliente->imagem;

        $caminho = Upload::make()
            ->file($arquivo)
            ->directory("clientes/{$cliente->id}")
            ->disk('public')
            ->save();

        $cliente->imagem = $caminho;
        $cliente->save();

        $this->apagarArquivo($imagemAnterior);

        return $cliente->refresh();
    }

    public function remover(string $clienteId): Cliente
    {
        $cliente = Cliente::findOrFail($clienteId);

        $imagem = $cliente->imagem;

        $cliente->imagem = null;
        $cliente->save();

        $this->apagarArquivo($imagem);

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
