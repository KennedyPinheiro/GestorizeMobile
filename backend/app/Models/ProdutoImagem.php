<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProdutoImagem extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = [
        'produto_id',
        'caminho',
        'principal',
    ];

    protected $casts = [
        'principal' => 'boolean',
    ];

    public function produto()
    {
        return $this->belongsTo(Produto::class);
    }
}
