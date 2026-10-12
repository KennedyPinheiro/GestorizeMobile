<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FornecedorImagemRequest;
use App\Http\Requests\StoreFornecedorRequest;
use App\Http\Requests\UpdateFornecedorRequest;
use App\Http\Resources\FornecedorResource;
use App\Services\FornecedorImagemService;
use App\Services\FornecedorService;
use App\Services\ResponseService;
use Illuminate\Http\JsonResponse;

class FornecedorController extends Controller
{
    public function __construct(
        private FornecedorService $service,
        private FornecedorImagemService $imagemService,
    ) {}

    public function index(): JsonResponse
    {
        return ResponseService::success(
            FornecedorResource::collection(
                $this->service->listar()
            )
        );
    }

    public function store(
        StoreFornecedorRequest $request
    ): JsonResponse {
        $fornecedor = $this->service->criar(
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Fornecedor criado com sucesso.',
            'data' => new FornecedorResource($fornecedor),
        ], 201);
    }

    public function show(string $id): JsonResponse
    {
        return ResponseService::success(
            new FornecedorResource(
                $this->service->buscar($id)
            )
        );
    }

    public function atualizar(
        UpdateFornecedorRequest $request,
        string $id
    ): JsonResponse {
        $fornecedor = $this->service->atualizar(
            $id,
            $request->validated()
        );

        return ResponseService::success(
            new FornecedorResource($fornecedor),
            'Fornecedor atualizado com sucesso.'
        );
    }

    public function destroy(string $id): JsonResponse
    {
        $result = $this->service->deletar($id);

        return ResponseService::success(
            [],
            $result['message'] ?? null
        );
    }

    public function atualizarAvatar(
        FornecedorImagemRequest $request,
        string $id
    ): JsonResponse {
        return ResponseService::success(
            new FornecedorResource(
                $this->imagemService->salvar(
                    $id,
                    $request->file('avatar')
                )
            ),
            'Avatar do fornecedor atualizado com sucesso.'
        );
    }

    public function removerAvatar(string $id): JsonResponse
    {
        return ResponseService::success(
            new FornecedorResource(
                $this->imagemService->remover($id)
            ),
            'Avatar do fornecedor removido com sucesso.'
        );
    }
}
