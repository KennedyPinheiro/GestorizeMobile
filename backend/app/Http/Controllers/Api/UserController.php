<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\IndexUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\IUserService;
use App\Services\ResponseService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function __construct(private IUserService $service) {}

    public function index(IndexUserRequest $request): JsonResponse
    {
        $paginator = $this->service->paginateFor($request->user(), $request->validated());

        return ResponseService::success(
            UserResource::collection(collect($paginator->items())),
            null,
            200,
            [
                'current_page' => $paginator->currentPage(),
                'last_page' => $paginator->lastPage(),
                'per_page' => $paginator->perPage(),
                'total' => $paginator->total(),
            ]
        );
    }

    public function show(User $user): JsonResponse
    {
        $user = $this->service->findFor(request()->user(), $user);

        return ResponseService::success(UserResource::make($user));
    }

    public function store(StoreUserRequest $request): JsonResponse
    {
        $user = $this->service->create($request->validated());

        return ResponseService::success(
            UserResource::make($user),
            'Usuário criado com sucesso.'
        );
    }

    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $user = $this->service->update($request->user(), $user, $request->validated());

        return ResponseService::success(
            UserResource::make($user),
            'Usuário atualizado com sucesso.'
        );
    }

    public function destroy(User $user): JsonResponse
    {
        $this->service->delete(request()->user(), $user);

        return ResponseService::success(
            null,
            'Usuário removido com sucesso.'
        );
    }
}
