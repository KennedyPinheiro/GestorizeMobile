<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Services\ResponseService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PreventAdminSelfDeletion
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return ResponseService::error(
                'Usuário não autenticado.',
                Response::HTTP_UNAUTHORIZED
            );
        }

        $target = $request->route('user')
            ?? $request->route('id');

        $targetUserId = $target instanceof User
            ? $target->id
            : $target;

        if (
            $user->hasRole('admin')
            && $targetUserId !== null
            && (string) $user->id === (string) $targetUserId
        ) {
            return ResponseService::error(
                'O administrador não pode excluir a própria conta.',
                Response::HTTP_FORBIDDEN
            );
        }

        return $next($request);
    }
}
