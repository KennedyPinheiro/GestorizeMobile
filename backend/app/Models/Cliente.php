<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasUuids;

    protected $fillable = [
        'nome',
        'tipo',
        'email',
        'telefone',
        'endereco_id',
    ];

    public function orcamentos()
    {
        return $this->hasMany(Orcamento::class);
    }
}
