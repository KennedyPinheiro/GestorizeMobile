<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClienteImagemRequest;
use App\Http\Requests\StoreClienteRequest;
use App\Http\Requests\UpdateClienteRequest;
use App\Http\Resources\ClienteResource;
use App\Services\ClienteImagemService;
use App\Services\ClienteService;
use App\Services\ResponseService;
use Illuminate\Http\JsonResponse;

class ClienteController extends Controller
{
    public function __construct(
        private ClienteService $service,
        private ClienteImagemService $imagemService,
    ) {}

    public function index(): JsonResponse
    {
        return ResponseService::success(
            ClienteResource::collection(
                $this->service->listar()
            )
        );
    }

    public function store(StoreClienteRequest $request): JsonResponse
    {
        $cliente = $this->service->criar(
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Cliente criado com sucesso',
            'data' => new ClienteResource($cliente),
        ], 201);
    }

    public function show(string $id): JsonResponse
    {
        return ResponseService::success(
            new ClienteResource(
                $this->service->buscar($id)
            )
        );
    }

    public function atualizar(
        UpdateClienteRequest $request,
        string $id
    ): JsonResponse {
        $cliente = $this->service->atualizar(
            $id,
            $request->validated()
        );

        return ResponseService::success(
            new ClienteResource($cliente),
            'Cliente atualizado com sucesso.'
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
        ClienteImagemRequest $request,
        string $id
    ): JsonResponse {
        return ResponseService::success(
            new ClienteResource(
                $this->imagemService->salvar(
                    $id,
                    $request->file('avatar')
                )
            )
        );
    }
    public function removerAvatar(string $id): JsonResponse
    {
        return ResponseService::success(
            new ClienteResource(
                $this->imagemService->remover($id)
            )
        );
    }
}
