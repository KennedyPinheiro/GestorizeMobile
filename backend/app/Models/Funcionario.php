<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Funcionario extends Model
{
    use HasUuids, HasFactory;
    
    protected $fillable = [
        'user_id',
        'telefone',
        'data_nascimento',
        'cpf',
        'endereco_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function endereco()
    {
        return $this->belongsTo(Endereco::class);
    }
}
