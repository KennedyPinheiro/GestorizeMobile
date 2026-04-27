<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AuthLoginRequest;
use App\Http\Requests\AuthLogoutRequest;
use App\Http\Requests\AuthRefreshRequest;
use App\Http\Resources\UserResource;
use App\Services\IAuthService;
use App\Services\ResponseService;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function __construct(private IAuthService $service) {}

    public function login(AuthLoginRequest $request): JsonResponse
    {
        $payload = $this->service->login($request->validated());

        return ResponseService::success(
            [
                'token' => $payload['token'],
                'user' => UserResource::make($payload['user']),
            ]
        );
    }

    public function logout(AuthLogoutRequest $request): JsonResponse
    {
        $this->service->logout();

        return ResponseService::success([], 'Logout realizado com sucesso.');
    }

    public function refresh(AuthRefreshRequest $request): JsonResponse
    {
        $payload = $this->service->refresh();

        return ResponseService::success(
            [
                'token' => $payload['token'],
                'user' => UserResource::make($payload['user']),
            ],
            'Token atualizado.'
        );
    }
}
