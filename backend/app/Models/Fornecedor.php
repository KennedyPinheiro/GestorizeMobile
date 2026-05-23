<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

class Fornecedor extends Model
{
    use HasUuids;

    protected $table = 'fornecedores';

    protected $fillable = [
        'nome',
        'cnpj',
        'email',
        'telefone',
        'ramo_atividade',
        'nome_responsavel',
        'chave_pix',
        'endereco_id',
    ];
}
