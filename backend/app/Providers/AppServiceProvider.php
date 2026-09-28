<?php

namespace App\Providers;

use App\Builders\ResponseBuilder;
use App\Builders\UploadBuilder;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Enums\RoleEnum;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton('api-response', function () {
            return new ResponseBuilder();
        });

        $this->app->singleton('api-upload', function () {
            return new UploadBuilder();
        });

        Gate::before(fn($user) => $user->hasRole(RoleEnum::ADMIN->value) ? true : null);
    }

    public function boot(): void {}
}
