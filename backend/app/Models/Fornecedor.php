<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fornecedor extends Model
{
    protected $table = 'fornecedores';

    protected $fillable = [
        'nome',
        'cnpj',
        'email',
        'telefone',
        'nome_responsavel',
        'chave_pix',
        'endereco_id',
        'fornecedor_categoria_id', 
    ];

    public function categoria()
    {
        return $this->belongsTo(FornecedorCategoria::class, 'fornecedor_categoria_id');
    }

    
}