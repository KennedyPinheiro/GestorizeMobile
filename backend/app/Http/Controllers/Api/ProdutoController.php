<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProdutoImagemRequest;
use App\Http\Requests\StoreProdutoRequest;
use App\Http\Requests\UpdateProdutoRequest;
use App\Http\Resources\ProdutoImagemResource;
use App\Http\Resources\ProdutoResource;
use App\Models\Produto;
use App\Models\ProdutoImagem;
use App\Services\ProdutoImagemService;
use App\Services\ProdutoService;
use App\Services\ResponseService;
use Illuminate\Http\JsonResponse;

class ProdutoController extends Controller
{
    public function __construct(
        private ProdutoService $service,
        private ProdutoImagemService $imagemService
    ) {}

    public function index(): JsonResponse
    {
        return ResponseService::success(
            ProdutoResource::collection(
                $this->service->listar()
            )
        );
    }

    public function show(string $id): JsonResponse
    {
        return ResponseService::success(
            new ProdutoResource(
                $this->service->buscar($id)
            )
        );
    }

    public function store(StoreProdutoRequest $request): JsonResponse
    {
        $produto = $this->service->criar(
            $request->validated()
        );

        return ResponseService::success(
            new ProdutoResource($produto),
            'Produto criado com sucesso.',
            201
        );
    }

    public function update(
        UpdateProdutoRequest $request,
        Produto $produto
    ): JsonResponse {
        $produto = $this->service->atualizar(
            $produto,
            $request->validated()
        );

        return ResponseService::success(
            new ProdutoResource($produto),
            'Produto atualizado com sucesso.'
        );
    }

    public function destroy(Produto $produto): JsonResponse
    {
        $this->service->excluir($produto);

        return ResponseService::success(
            null,
            'Produto excluído com sucesso.'
        );
    }

    public function adicionarImagem(
        ProdutoImagemRequest $request,
        Produto $produto
    ): JsonResponse {
        $imagem = $this->imagemService->adicionar(
            $produto,
            $request->file('imagem'),
            $request->boolean('principal')
        );

        return ResponseService::success(
            new ProdutoImagemResource($imagem),
            'Imagem adicionada com sucesso.',
            201
        );
    }

    public function definirImagemPrincipal(
        ProdutoImagem $imagem
    ): JsonResponse {
        $imagem = $this->imagemService->definirPrincipal($imagem);

        return ResponseService::success(
            new ProdutoImagemResource($imagem),
            'Imagem principal definida com sucesso.'
        );
    }

    public function removerImagem(
        ProdutoImagem $imagem
    ): JsonResponse {
        $this->imagemService->remover($imagem);

        return ResponseService::success(
            null,
            'Imagem removida com sucesso.'
        );
    }
}
