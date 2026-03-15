<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrcamentoRequest;
use App\Services\OrcamentoService;
use App\Services\ResponseService;
use Illuminate\Http\JsonResponse;

class OrcamentoController extends Controller
{
    public function __construct(private OrcamentoService $service) {}

    public function index(): JsonResponse
    {
        return ResponseService::success($this->service->listar());
    }

    public function store(OrcamentoRequest $request): JsonResponse
    {
        return ResponseService::success(
            $this->service->criar($request->validated()),
            code: 201
        );
    }

    public function show(int $id): JsonResponse
    {
        return ResponseService::success($this->service->buscar($id));
    }

    public function update(OrcamentoRequest $request, int $id): JsonResponse
    {
        return ResponseService::success(
            $this->service->atualizar($id, $request->validated())
        );
    }

    public function destroy(int $id): JsonResponse
    {
        $result = $this->service->deletar($id);

        return ResponseService::success([], $result['message'] ?? null);
    }
}
