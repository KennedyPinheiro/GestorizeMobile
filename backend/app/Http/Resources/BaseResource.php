<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

abstract class BaseResource extends JsonResource
{
    /**
     * We already wrap API responses in ResponseService's `data` key.
     * Disabling Laravel's default resource wrapping avoids double-wrapping.
     *
     * @var string|null
     */
    public static $wrap = null;
}

