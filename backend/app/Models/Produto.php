<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Produto extends Model
{
    protected $fillable = [
        'nome',
        'descricao',
        'preco_custo',
        'porcentagem_lucro',
        'preco_venda',
        'data_entrada',
        'categoria_id',
        'fornecedor_id',
        'unidade_medida_id',
        'estoque',
        'validade'
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function fornecedor()
    {
        return $this->belongsTo(Fornecedor::class);
    }

    public function unidadeMedida()
    {
        return $this->belongsTo(UnidadeMedida::class);
    }
}
