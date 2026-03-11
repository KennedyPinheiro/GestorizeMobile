<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FornecedorRequest;
use App\Services\FornecedorService;

class FornecedorController extends Controller
{
    public function __construct(private FornecedorService $service)
    {
    }

    public function index()
    {
        return response()->json($this->service->listar());
    }

    public function store(FornecedorRequest $request)
    {
        return response()->json(
            $this->service->criar($request->validated()),
            201
        );
    }

    public function show(int $id)
    {
        return response()->json($this->service->buscar($id));
    }

    public function update(FornecedorRequest $request, int $id)
    {
        return response()->json(
            $this->service->atualizar($id, $request->validated())
        );
    }

    public function destroy(int $id)
    {
        return response()->json($this->service->deletar($id));
    }
}
