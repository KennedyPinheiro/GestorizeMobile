<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthService implements IAuthService
{
    /**
     *
     *
     * @param array{email:string,password:string} $credentials
     */

    public function login(array $credentials): array
    {
        $user = User::where('email', $credentials['email'])->first();

        if (! $user || ! Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => 'Credenciais inválidas.',
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return [
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames(),
            ],
        ];
    }

    public function logout(): void
    {
        $user = request()->user();
        if (!$user) {
            throw new AuthenticationException('Não autenticado');
        }

        $user->currentAccessToken()->delete();
    }

    /**
     * 
     *
     * @return array{token:string,user:array{id:int,name:string,email:string}}
     */
    public function refresh(): array
    {
        $user = auth()->user();

        if (!$user) {
            throw new AuthenticationException('Não autenticado');
        }

        $user->currentAccessToken()->delete();

        $newToken = $user->createToken('api-token')->plainTextToken;

        return [
            'token' => $newToken,
            'user' => $user->only(['id', 'name', 'email']),
        ];
    }
}
