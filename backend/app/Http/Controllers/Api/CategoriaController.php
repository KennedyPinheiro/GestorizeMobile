<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoriaRequest;
use App\Services\CategoriaService;
use App\Services\ResponseService;
use Illuminate\Http\JsonResponse;

class CategoriaController extends Controller
{
    public function __construct(
        private readonly CategoriaService $categoriaService
    ) {}

    public function index(): JsonResponse
    {
        $categorias = $this->categoriaService->listar();

        return ResponseService::success(
            $categorias,
            'Categorias listadas com sucesso.'
        );
    }

    public function store(StoreCategoriaRequest $request): JsonResponse
    {
        $categoria = $this->categoriaService->criar(
            $request->validated()
        );

        return ResponseService::success(
            $categoria,
            'Categoria cadastrada com sucesso.',
            201
        );
    }
}
