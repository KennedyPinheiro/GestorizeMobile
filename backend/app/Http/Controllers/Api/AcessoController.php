<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\DefinirPermissoesRequest;
use App\Services\AcessoService;
use App\Services\ResponseService;

class AcessoController extends Controller
{
    public function __construct(private AcessoService $service) {}

    public function papeis()
    {
        return ResponseService::success($this->service->listarPapeis());
    }

    public function permissoes()
    {
        return ResponseService::success($this->service->listarPermissoes());
    }

    public function definirDoPapel(DefinirPermissoesRequest $request, string $role)
    {
        return ResponseService::success(
            $this->service->definirPermissoesDoPapel($role, $request->validated()['permissions'])
        );
    }

    public function definirDoUsuario(DefinirPermissoesRequest $request, string $user)
    {
        return ResponseService::success(
            $this->service->definirPermissoesDoUsuario($user, $request->validated()['permissions'])
        );
    }
}
