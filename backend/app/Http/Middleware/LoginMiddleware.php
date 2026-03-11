<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response as FoundationResponse;

class LoginMiddleware
{
    /**
     * Ensure there is an authenticated user on the current guard.
     *
     * @return JsonResponse|FoundationResponse
     */
    public function handle(Request $request, Closure $next): JsonResponse|FoundationResponse
    {
        $user = $request->user();

        if (! $user) {
            $token = $request->bearerToken();

            if ($token) {
                $user = User::where('api_token', $token)->first();

                if ($user) {
                    Auth::setUser($user);
                    $request->setUserResolver(fn () => $user);
                }
            }
        }

        if (! $user) {
            return response()->json([
                'message' => 'Autenticação requerida para acessar este recurso.',
            ], 401);
        }

        return $next($request);
    }
}
