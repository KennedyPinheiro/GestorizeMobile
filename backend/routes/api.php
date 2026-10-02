<?php

use App\Http\Controllers\Api\AcessoController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProdutoController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\FornecedorController;
use App\Http\Controllers\Api\OrcamentoController;
use App\Http\Controllers\Api\UserController;

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);

    Route::prefix('acessos')->middleware('permission:acessos.gerenciar')->group(function () {
        Route::get('papeis', [AcessoController::class, 'papeis']);
        Route::get('permissoes', [AcessoController::class, 'permissoes']);

        Route::put('papeis/{role}/permissoes', [AcessoController::class, 'definirDoPapel']);
        Route::put('users/{user}/permissoes', [AcessoController::class, 'definirDoUsuario']);
    });

    Route::prefix('clientes')->group(function () {
        Route::get('/',        [ClienteController::class, 'index'])->middleware('permission:clientes.ver');
        Route::post('/',       [ClienteController::class, 'store'])->middleware('permission:clientes.criar');
        Route::get('/{id}',    [ClienteController::class, 'show'])->middleware('permission:clientes.ver');
        Route::put('/{id}',    [ClienteController::class, 'atualizar'])->middleware('permission:clientes.editar');
        Route::delete('/{id}', [ClienteController::class, 'destroy'])->middleware('permission:clientes.excluir');

        Route::post('/{id}/imagem',   [ClienteController::class, 'atualizarAvatar'])->middleware('permission:clientes.editar');
        Route::delete('/{id}/imagem', [ClienteController::class, 'removerAvatar'])->middleware('permission:clientes.editar');
    });
    
    Route::prefix('produtos')->group(function () {
        Route::get('/', [ProdutoController::class, 'index'])->middleware('permission:produtos.ver');
        Route::post('/', [ProdutoController::class, 'store'])->middleware('permission:produtos.criar');
        Route::get('/{id}', [ProdutoController::class, 'show'])->middleware('permission:produtos.ver');
        Route::put('/{id}', [ProdutoController::class, 'update'])->middleware('permission:produtos.editar');
        Route::delete('/{id}', [ProdutoController::class, 'destroy'])->middleware('permission:produtos.excluir');
    });
    Route::prefix('fornecedores')->group(function () {
        Route::get('/', [FornecedorController::class, 'index']);
        Route::post('/', [FornecedorController::class, 'store']);
        Route::get('/{id}', [FornecedorController::class, 'show']);
        Route::put('/{id}', [FornecedorController::class, 'update']);
        Route::delete('/{id}', [FornecedorController::class, 'destroy']);
    });
    Route::prefix('orcamentos')->group(function () {
        Route::get('/', [OrcamentoController::class, 'index']);
        Route::post('/', [OrcamentoController::class, 'store']);
        Route::get('/{id}', [OrcamentoController::class, 'show']);
        Route::put('/{id}', [OrcamentoController::class, 'update']);
        Route::delete('/{id}', [OrcamentoController::class, 'destroy']);
    });

    Route::prefix('users')->group(function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('/', [UserController::class, 'store']);
        Route::get('/{user}', [UserController::class, 'show']);
        Route::put('/{user}', [UserController::class, 'update']);
        Route::delete('/{user}', [UserController::class, 'destroy']);
    });
});
