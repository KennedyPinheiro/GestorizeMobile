<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    use HasUuids, HasFactory;

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

    public function dadosPf()
    {
        return $this->hasOne(ClientePf::class);
    }

    public function dadosPj()
    {
        return $this->hasOne(ClientePj::class);
    }
}
