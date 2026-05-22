<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    use AuthorizesRequests;
    
    public function __construct(protected UserService $userService) {}

    public function index(): JsonResponse
    {
        $users = User::with('funcionario.endereco')->paginate(15);

        return response()->json([
            'success' => true,
            'data'    => UserResource::collection($users),
        ]);
    }

    public function show(User $user): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data'    => new UserResource($user->load('funcionario.endereco')),
        ]);
    }

    public function store(CreateUserRequest $request): JsonResponse
    {
        $user = $this->userService->criar($request->validated());

        return response()->json([
            'success' => true,
            'data'    => new UserResource($user),
        ], 201);
    }

    public function update(UpdateUserRequest $request, string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $this->authorize('update', $user);

        return response()->json([
            'success' => true,
            'data'    => new UserResource($this->userService->atualizar($id, $request->validated())),
        ]);
    }

    public function destroy(string $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $this->authorize('delete', $user);

        $this->userService->deletar($id);

        return response()->json([
            'success' => true,
            'message' => 'Usuário removido com sucesso.',
        ]);
    }
}
