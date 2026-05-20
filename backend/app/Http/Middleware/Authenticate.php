<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Auth\AuthenticationException;

class Authenticate extends Middleware
{
    protected function redirectTo($request)
    {
        return null; 
    }

    protected function unauthenticated($request, array $guards)
    {
        throw new AuthenticationException(
            'Não autenticado.',
            $guards
        );
    }
}