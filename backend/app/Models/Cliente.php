<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
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
