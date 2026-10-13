<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FuncionarioStoreRequest;
use App\Http\Resources\FuncionarioResource;
use App\Services\FuncionarioService;
use Illuminate\Http\JsonResponse;

class FuncionarioController extends Controller
{
    public function __construct(
        private FuncionarioService $service,
    ) {}

    public function store(
        FuncionarioStoreRequest $request
    ): JsonResponse {
        $funcionario = $this->service->criar(
            $request->validated()
        );

        return response()->json([
            'success' => true,
            'message' => 'Funcionário criado com sucesso.',
            'data' => new FuncionarioResource($funcionario),
        ], 201);
    }
}