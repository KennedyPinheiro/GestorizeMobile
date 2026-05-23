<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Orcamento extends Model
{
    use HasUuids;

    protected $fillable = [
        'cliente_id',
        'funcionario_id',
        'valor_total',
        'data_orcamento',
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }

    public function funcionario()
    {
        return $this->belongsTo(User::class, 'funcionario_id');
    }

    public function itens()
    {
        return $this->hasMany(OrcamentoItem::class);
    }
}
