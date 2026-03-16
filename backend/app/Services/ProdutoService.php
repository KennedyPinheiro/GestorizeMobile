<?php
namespace App\Services;

use App\Models\Produto;

class ProdutoService
{

    public function listar()
    {
        return Produto::with([
            'categoria',
            'categorias',
            'fornecedor',
            'unidadeMedida'
        ])->get();
    }

    public function criar($dados)
    {
        $categoriaIds = $this->resolverCategorias($dados);
        $dados['categoria_id'] = $categoriaIds[0];

        $produto = Produto::create($dados);
        $this->sincronizarCategorias($produto, $categoriaIds);

        return $produto->load(['categoria', 'categorias', 'fornecedor', 'unidadeMedida']);
    }

    public function buscar($id)
    {
        return Produto::with(['categoria', 'categorias', 'fornecedor', 'unidadeMedida'])
            ->findOrFail($id);
    }

    public function atualizar($id, $dados)
    {
        $produto = Produto::findOrFail($id);

        if (array_key_exists('categorias', $dados) || array_key_exists('categoria_id', $dados)) {
            $categoriasAtuais = $produto->categorias()->pluck('categorias.id')->all();
            $categoriaIds = $this->resolverCategorias($dados, $produto->categoria_id, $categoriasAtuais);
            $dados['categoria_id'] = $categoriaIds[0];
            $produto->update($dados);
            $this->sincronizarCategorias($produto, $categoriaIds);
        } else {
            $produto->update($dados);
        }

        return $produto->load(['categoria', 'categorias', 'fornecedor', 'unidadeMedida']);
    }

    public function deletar($id)
    {
        $produto = Produto::findOrFail($id);
        $produto->delete();

        return ['message' => 'Produto removido'];
    }

    private function resolverCategorias(array $dados, ?int $principalFallback = null, array $categoriasAtuais = []): array
    {
        $categorias = $dados['categorias'] ?? [];

        if (!is_array($categorias)) {
            $categorias = [];
        }

        $categorias = array_values(array_unique(array_filter($categorias)));

        if (!$categorias && isset($dados['categoria_id'])) {
            $categorias = array_merge([$dados['categoria_id']], $categoriasAtuais);
        }

        if (!$categorias && $categoriasAtuais) {
            $categorias = $categoriasAtuais;
        }

        if (!$categorias && $principalFallback) {
            $categorias = [$principalFallback];
        }

        if (!$categorias) {
            throw new \InvalidArgumentException('Pelo menos uma categoria deve ser informada.');
        }

        return array_values(array_unique($categorias));
    }

    private function sincronizarCategorias(Produto $produto, array $categorias): void
    {
        $sincronizadas = [];

        foreach ($categorias as $index => $categoriaId) {
            $sincronizadas[$categoriaId] = ['is_principal' => $index === 0];
        }

        $produto->categorias()->sync($sincronizadas);
    }

}
