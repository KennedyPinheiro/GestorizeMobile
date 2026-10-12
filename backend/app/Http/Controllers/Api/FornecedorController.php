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

    /**
     * Lista os fornecedores.
     */
    public function index(): JsonResponse
    {
        return ResponseService::success(
            FornecedorResource::collection(
                $this->service->listar()
            )
        );
    }

    /**
     * Cadastra um fornecedor.
     */
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

    /**
     * Busca um fornecedor.
     */
    public function show(string $id): JsonResponse
    {
        return ResponseService::success(
            new FornecedorResource(
                $this->service->buscar($id)
            )
        );
    }

    /**
     * Atualiza os dados de um fornecedor.
     */
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

    /**
     * Exclui um fornecedor.
     */
    public function destroy(string $id): JsonResponse
    {
        $result = $this->service->deletar($id);

        return ResponseService::success(
            [],
            $result['message'] ?? null
        );
    }

    /**
     * Atualiza o avatar do fornecedor.
     */
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

    /**
     * Remove o avatar do fornecedor.
     */
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
