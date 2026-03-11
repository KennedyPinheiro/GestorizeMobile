<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ClienteRequest;
use App\Services\ClienteService;

class ClienteController extends Controller
{
    public function __construct(private ClienteService $service)
    {
    }

    public function index()
    {
        return response()->json($this->service->listar());
    }

    public function store(ClienteRequest $request)
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

    public function update(ClienteRequest $request, int $id)
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
