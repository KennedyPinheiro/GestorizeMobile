<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FornecedorCategoria extends Model
{
    protected $table = 'fornecedor_categorias';

    protected $fillable = ['nome'];

    public function fornecedores()
    {
        return $this->hasMany(Fornecedor::class);
    }
}