<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FuncionarioImagemRequest;
use App\Http\Requests\StoreFuncionarioRequest;
use App\Http\Requests\UpdateFuncionarioRequest;
use App\Http\Resources\FuncionarioResource;
use App\Services\FuncionarioImagemService;
use App\Services\FuncionarioService;
use App\Services\ResponseService;
use Illuminate\Http\JsonResponse;

class FuncionarioController extends Controller
{
    public function __construct(
        private FuncionarioService $service,
        private FuncionarioImagemService $imagemService,
    ) {}

    public function index(): JsonResponse
    {
        return ResponseService::success(
            FuncionarioResource::collection(
                $this->service->listar()
            )
        );
    }

    public function store(
        StoreFuncionarioRequest $request
    ): JsonResponse {
        $funcionario = $this->service->criar(
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Funcionário cadastrado com sucesso.',
            'data' => new FuncionarioResource($funcionario),
        ], 201);
    }

    public function show(string $id): JsonResponse
    {
        $funcionario = $this->service->buscar($id);

        return ResponseService::success(
            new FuncionarioResource($funcionario)
        );
    }

    public function atualizar(
        UpdateFuncionarioRequest $request,
        string $id
    ): JsonResponse {
        $funcionario = $this->service->atualizar(
            $id,
            $request->validated()
        );

        return ResponseService::success(
            new FuncionarioResource($funcionario)
        );
    }

    public function destroy(string $id): JsonResponse
    {
        $this->service->deletar($id);

        return ResponseService::success([
            'message' => 'Funcionário removido com sucesso.',
        ]);
    }

    public function atualizarAvatar(
        FuncionarioImagemRequest $request,
        string $id
    ): JsonResponse {
        $funcionario = $this->imagemService->salvar(
            $id,
            $request->file('avatar')
        );

        return ResponseService::success(
            new FuncionarioResource($funcionario)
        );
    }

    public function removerAvatar(string $id): JsonResponse
    {
        $funcionario = $this->imagemService->remover($id);

        return ResponseService::success(
            new FuncionarioResource($funcionario)
        );
    }
}
