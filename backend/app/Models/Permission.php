<?php

namespace App\Models;

use App\Traits\HasSnowflakeId;
use Spatie\Permission\Models\Permission as SpatiePermission;
use Kra8\Snowflake\Snowflake;

class Permission extends SpatiePermission
{
    use HasSnowflakeId;

   
}
