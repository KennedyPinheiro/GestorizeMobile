<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Providers\ServiceServiceProvider;
use Illuminate\Http\Middleware\HandleCors;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->use([
            HandleCors::class,
        ]);

        $middleware->redirectGuestsTo(fn() => null);
    })
    ->withProviders([
        ServiceServiceProvider::class,
    ])
    ->withExceptions(function (Exceptions $exceptions): void {})
    ->withSingletons([Illuminate\Contracts\Debug\ExceptionHandler::class => App\Exceptions\Handler::class])
    ->create();
