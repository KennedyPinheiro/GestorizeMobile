<?php

namespace App\Providers;

use App\Builders\ResponseBuilder;
use App\Builders\UploadBuilder;
use Dedoc\Scramble\Scramble;
use Dedoc\Scramble\Support\Generator\OpenApi;
use Dedoc\Scramble\Support\Generator\SecurityScheme;
use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider;

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
    }

    public function boot(): void
    {
       
    }
}
