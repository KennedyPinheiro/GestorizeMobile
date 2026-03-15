<?php

namespace App\Facades;

use Illuminate\Support\Facades\Facade;

class Response extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'api-response';
    }
}
