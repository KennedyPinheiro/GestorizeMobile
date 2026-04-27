<?php

namespace App\Models;

use Spatie\Permission\Models\Permission as SpatiePermission;
use App\Traits\HasSnowflakeId;
use Kra8\Snowflake\Snowflake;

class Permission extends SpatiePermission
{
    use HasSnowflakeId;

    protected $keyType = 'string'; 
    public $incrementing = false;

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = app(Snowflake::class)->next();
            }
        });
    }
}