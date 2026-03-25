<?php

namespace App\Models;

use App\Traits\HasSnowflakeId;
use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    use HasSnowflakeId;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'user_id',
        'telefone',
        'data_nascimento',
        'cpf',
        'rg',
        'endereco_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
