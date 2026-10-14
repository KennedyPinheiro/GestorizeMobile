<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DefinirPermissoesRequest;
use App\Http\Resources\RoleResource;
use App\Services\AcessoService;
use App\Services\ResponseService;
use Illuminate\Http\JsonResponse;

class AcessoController extends Controller
{
    public function __construct(
        private AcessoService $service
    ) {}


public function papeis(): JsonResponse
{
    return ResponseService::success(
        RoleResource::collection($this->service->listarPapeis())
    );
}

    public function permissoes(): JsonResponse
    {
        return ResponseService::success(
            $this->service->listarPermissoes()
        );
    }

    public function definirDoPapel(
        DefinirPermissoesRequest $request,
        string $role
    ): JsonResponse {
        return ResponseService::success(
            $this->service->definirPermissoesDoPapel(
                $role,
                $request->validated()['permissions']
            )
        );
    }

    public function definirDoUsuario(
        DefinirPermissoesRequest $request,
        string $user
    ): JsonResponse {
        return ResponseService::success(
            $this->service->definirPermissoesDoUsuario(
                $user,
                $request->validated()['permissions']
            )
        );
    }
}