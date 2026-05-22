<?php

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

    Route::prefix('produtos')->group(function () {
        Route::get('/', [ProdutoController::class, 'index']);
        Route::post('/', [ProdutoController::class, 'store']);
        Route::get('/{id}', [ProdutoController::class, 'show']);
        Route::put('/{id}', [ProdutoController::class, 'update']);
        Route::delete('/{id}', [ProdutoController::class, 'destroy']);
    });
    Route::prefix('clientes')->group(function () {
        Route::get('/', [ClienteController::class, 'index']);
        Route::post('/', [ClienteController::class, 'store']);
        Route::get('/{id}', [ClienteController::class, 'show']);
        Route::put('/{id}', [ClienteController::class, 'update']);
        Route::delete('/{id}', [ClienteController::class, 'destroy']);
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
