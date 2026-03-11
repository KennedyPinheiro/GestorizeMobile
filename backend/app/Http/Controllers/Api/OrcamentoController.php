<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrcamentoRequest;
use App\Services\OrcamentoService;

class OrcamentoController extends Controller
{
    public function __construct(private OrcamentoService $service)
    {
    }

    public function index()
    {
        return response()->json($this->service->listar());
    }

    public function store(OrcamentoRequest $request)
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

    public function update(OrcamentoRequest $request, int $id)
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
