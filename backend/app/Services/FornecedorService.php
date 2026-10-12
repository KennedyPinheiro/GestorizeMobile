<?php

namespace App\Services;

use App\Models\Endereco;
use App\Models\Fornecedor;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;

class FornecedorService
{
    public function __construct(
        private FornecedorImagemService $fornecedorImagemService
    ) {}

    /**
     * Lista os fornecedores cadastrados.
     */
    public function listar()
    {
        return Fornecedor::with('endereco')
            ->orderBy('nome')
            ->get();
    }

    /**
     * Cadastra um fornecedor.
     */
    public function criar(array $dados): Fornecedor
    {
        return DB::transaction(function () use ($dados) {
            /** @var UploadedFile|null $avatar */
            $avatar = $dados['avatar'] ?? null;

            unset($dados['avatar']);

            $endereco = isset($dados['endereco'])
                ? Endereco::create($dados['endereco'])
                : null;

            unset($dados['endereco']);

            $fornecedor = Fornecedor::create([
                'nome' => $dados['nome'],
                'cnpj' => $dados['cnpj'],
                'email' => $dados['email'] ?? null,
                'telefone' => $dados['telefone'],
                'ramo_atividade' => $dados['ramo_atividade'] ?? null,
                'nome_responsavel' => $dados['nome_responsavel'] ?? null,
                'chave_pix' => $dados['chave_pix'] ?? null,
                'endereco_id' => $endereco?->id,
            ]);

            if ($avatar instanceof UploadedFile) {
                $this->fornecedorImagemService->salvar(
                    $fornecedor->id,
                    $avatar
                );
            }

            return $fornecedor->load('endereco');
        });
    }

    /**
     * Busca um fornecedor pelo identificador.
     */
    public function buscar(string $id): Fornecedor
    {
        return Fornecedor::with('endereco')
            ->findOrFail($id);
    }

    /**
     * Atualiza os dados de um fornecedor.
     */
    public function atualizar(
        string $id,
        array $dados
    ): Fornecedor {
        return DB::transaction(function () use ($id, $dados) {
            $fornecedor = Fornecedor::findOrFail($id);

            $campos = [
                'nome',
                'cnpj',
                'email',
                'telefone',
                'ramo_atividade',
                'nome_responsavel',
                'chave_pix',
            ];

            $fornecedor->update(
                collect($dados)
                    ->only($campos)
                    ->all()
            );

            if (is_array($dados['endereco'] ?? null)) {
                if ($fornecedor->endereco_id) {
                    Endereco::findOrFail(
                        $fornecedor->endereco_id
                    )->update($dados['endereco']);
                } else {
                    $endereco = Endereco::create(
                        $dados['endereco']
                    );

                    $fornecedor->update([
                        'endereco_id' => $endereco->id,
                    ]);
                }
            }

            return $fornecedor->fresh('endereco');
        });
    }

  
    public function deletar(string $id): array
    {
        $fornecedor = Fornecedor::findOrFail($id);

        $fornecedor->delete();

        return [
            'message' => 'Fornecedor removido com sucesso.',
        ];
    }
}
