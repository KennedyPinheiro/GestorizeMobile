<?php

namespace App\Providers;

use App\Services\AuthService;
use App\Services\DisciplinaService;
use App\Services\IAuthService;
use App\Services\IDisciplinaService;
use App\Services\IPerfilService;
use App\Services\IUserService;
use App\Services\PerfilService;
use App\Services\UserService;
use Illuminate\Support\ServiceProvider;

class ServiceServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $bindings = [
            IAuthService::class => AuthService::class,
            IPerfilService::class => PerfilService::class,
            IUserService::class => UserService::class,
        ];

        foreach ($bindings as $interface => $service) {
            $this->app->bind($interface, $service);
        }
    }
}
