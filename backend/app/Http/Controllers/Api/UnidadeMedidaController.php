<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UnidadeMedidaResource;
use App\Models\UnidadeMedida;
use App\Services\ResponseService;
use Illuminate\Http\Request;

class UnidadeMedidaController extends Controller
{
    public function index()
    {
        $unidades = UnidadeMedida::query()
            ->orderBy('nome')
            ->get();

        return ResponseService::success(
            UnidadeMedidaResource::collection($unidades),
            'Unidades de medida listadas com sucesso.'
        );
    }
}
