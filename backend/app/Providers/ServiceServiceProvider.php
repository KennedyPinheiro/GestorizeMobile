<?php

namespace App\Providers;

use App\Services\AuthService;
use App\Services\DisciplinaService;
use App\Services\IAuthService;
use App\Services\IDisciplinaService;
use App\Services\IPerfilService;
use App\Services\PerfilService;
use Illuminate\Support\ServiceProvider;

class ServiceServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $bindings = [
            IAuthService::class => AuthService::class,
            IPerfilService::class => PerfilService::class,
        ];

        foreach ($bindings as $interface => $service) {
            $this->app->bind($interface, $service);
        }
    }
}