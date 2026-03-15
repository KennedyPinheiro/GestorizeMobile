<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FornecedorRequest;
use App\Services\FornecedorService;
use App\Services\ResponseService;
use Illuminate\Http\JsonResponse;

class FornecedorController extends Controller
{
    public function __construct(private FornecedorService $service) {}

    public function index(): JsonResponse
    {
        return ResponseService::success($this->service->listar());
    }

    public function store(FornecedorRequest $request): JsonResponse
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

    public function update(FornecedorRequest $request, int $id): JsonResponse
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
