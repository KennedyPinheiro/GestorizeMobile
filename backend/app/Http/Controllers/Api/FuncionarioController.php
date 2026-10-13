<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FuncionarioStoreRequest;
use App\Http\Resources\FuncionarioResource;
use App\Services\FuncionarioImagemService;
use App\Services\FuncionarioService;
use App\Services\ResponseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FuncionarioController extends Controller
{
    public function __construct(
        private FuncionarioService $service,
        private FuncionarioImagemService $imagemService,
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

    public function atualizarAvatar(
        Request $request,
        string $id
    ): JsonResponse {
        $request->validate([
            'avatar' => [
                'required',
                'image',
                'mimes:jpeg,jpg,png,webp',
                'max:5120',
            ],
        ]);

        $funcionario = $this->imagemService->salvar(
            $id,
            $request->file('avatar')
        );

        return ResponseService::success(
            new FuncionarioResource($funcionario),
            'Avatar atualizado com sucesso.'
        );
    }

    public function removerAvatar(string $id): JsonResponse
    {
        $funcionario = $this->imagemService->remover($id);

        return ResponseService::success(
            new FuncionarioResource($funcionario),
            'Avatar removido com sucesso.'
        );
    }
}
