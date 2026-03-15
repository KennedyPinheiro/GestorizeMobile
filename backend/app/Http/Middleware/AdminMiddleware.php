<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response as FoundationResponse;

class AdminMiddleware
{
    /**
     * Block access when the authenticated user is not considered an administrator.
     *
     * @return JsonResponse|FoundationResponse
     */
    public function handle(Request $request, Closure $next): JsonResponse|FoundationResponse
    {
        $user = $request->user();

        if (! $user || ! $this->isAdmin($user)) {
            return response()->json([
                'message' => 'Acesso exclusivo para administradores.',
            ], 403);
        }

        return $next($request);
    }

    /**
     * Determine whether the given user meets our admin criteria.
     */
    /**
     * @param  Authenticatable&Model  $user
     */
    protected function isAdmin(Authenticatable $user): bool
    {
        if (method_exists($user, 'getAttribute') && (bool) $user->getAttribute('is_admin')) {
            return true;
        }

        $role = null;

        if (method_exists($user, 'getAttribute')) {
            $role = $user->getAttribute('role');
        }

        if (is_null($role) && property_exists($user, 'role')) {
            $role = $user->role;
        }

        if (is_string($role)) {
            return $this->roleNameIndicatesAdmin($role);
        }

        if (is_object($role) && method_exists($role, 'getAttribute')) {
            $name = $role->getAttribute('nome') ?? $role->getAttribute('name') ?? null;

            if (is_string($name)) {
                return $this->roleNameIndicatesAdmin($name);
            }
        }

        return false;
    }

    protected function roleNameIndicatesAdmin(string $value): bool
    {
        return Str::of($value)
            ->lower()
            ->contains(['admin', 'administrador']);
    }
}
