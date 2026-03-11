<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthLoginRequest;
use App\Http\Requests\AuthLogoutRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function __construct(private AuthService $service)
    {
    }

    /**
     * Autentica o usuário e retorna um token de acesso.
     */
    public function login(AuthLoginRequest $request): JsonResponse
    {
        return response()->json(
            $this->service->login($request->validated())
        );
    }

    /**
     * Invalida o token de acesso do usuário autenticado.
     */
    public function logout(AuthLogoutRequest $request): JsonResponse
    {
        $this->service->logout($request->validated('token'));

        return response()->json([
            'message' => 'Logout realizado com sucesso.',
        ]);
    }
}
