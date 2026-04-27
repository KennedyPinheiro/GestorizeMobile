<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProdutoResource;
use App\Services\ProdutoService;
use App\Http\Requests\ProdutoRequest;
use App\Services\ResponseService;
use Illuminate\Http\JsonResponse;

class ProdutoController extends Controller
{
    public function __construct(private ProdutoService $produtoService) {}

    public function index(): JsonResponse
    {
        return ResponseService::success(
            ProdutoResource::collection($this->produtoService->listar())
        );
    }

    public function store(ProdutoRequest $request): JsonResponse
    {
        return ResponseService::success(
            ProdutoResource::make($this->produtoService->criar($request->validated())),
            code: 201
        );
    }

    public function show(int $id): JsonResponse
    {
        return ResponseService::success(
            ProdutoResource::make($this->produtoService->buscar($id))
        );
    }

    public function update(ProdutoRequest $request, int $id): JsonResponse
    {
        return ResponseService::success(
            ProdutoResource::make($this->produtoService->atualizar($id, $request->validated()))
        );
    }

    public function destroy(int $id): JsonResponse
    {
        $result = $this->produtoService->deletar($id);

        return ResponseService::success([], $result['message'] ?? null);
    }
}
