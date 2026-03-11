<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class AuthService implements IAuthService
{
    /**
     * Autentica e gera token simples.
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

        $token = Str::random(80);
        $user->forceFill(['api_token' => $token])->save();

        return [
            'token' => $token,
            'user' => $user->only(['id', 'name', 'email']),
        ];
    }

    /**
     * Invalida o token informado.
     */
    public function logout(string $token): void
    {
        $user = User::where('api_token', $token)->first();

        if (! $user) {
            throw new AuthenticationException('Token inválido.');
        }

        $user->forceFill(['api_token' => null])->save();
    }
}
