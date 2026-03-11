<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ProdutoService;
use App\Http\Requests\ProdutoRequest;

class ProdutoController extends Controller
{
    private $produtoService;

    public function __construct(ProdutoService $produtoService)
    {
        $this->produtoService = $produtoService;
    }

    public function index()
    {
        return response()->json(
            $this->produtoService->listar()
        );
    }

    public function store(ProdutoRequest $request)
    {
        return response()->json(
            $this->produtoService->criar($request->validated())
        );
    }

    public function show($id)
    {
        return response()->json(
            $this->produtoService->buscar($id)
        );
    }

    public function update(ProdutoRequest $request, $id)
    {
        return response()->json(
            $this->produtoService->atualizar($id, $request->validated())
        );
    }

    public function destroy($id)
    {
        return response()->json(
            $this->produtoService->deletar($id)
        );
    }
}
