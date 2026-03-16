<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProdutoController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\FornecedorController;
use App\Http\Controllers\Api\OrcamentoController;

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('login');
Route::post('refresh', [AuthController::class, 'refresh'])->middleware('login');

Route::middleware('login')->group(function () {
    Route::apiResource('produtos', ProdutoController::class);
    Route::apiResource('clientes', ClienteController::class);
    Route::apiResource('fornecedores', FornecedorController::class);
    Route::apiResource('orcamentos', OrcamentoController::class);
});
