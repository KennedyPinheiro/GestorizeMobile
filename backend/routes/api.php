<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProdutoController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\FornecedorController;
use App\Http\Controllers\Api\OrcamentoController;
use App\Http\Controllers\Api\UserController;
use App\Enums\PermissionEnum;

Route::post('login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);

    Route::get('users', [UserController::class, 'index'])
        ->middleware([
            'role:admin|gestor',
            'permission:' . PermissionEnum::VIEW_USERS->value,
        ]);

    Route::get('users/{user}', [UserController::class, 'show'])
        ->middleware([
            'role:admin|gestor',
            'permission:' . PermissionEnum::VIEW_USERS->value,
        ]);

    Route::post('users', [UserController::class, 'store'])
        ->middleware([
            'role:admin|gestor',
            'permission:' . PermissionEnum::CREATE_USERS->value,
        ]);

    Route::post('users/{role}', [UserController::class, 'store'])
        ->where('role', 'admin|gestor|funcionario')
        ->middleware([
            'role:admin|gestor',
            'permission:' . PermissionEnum::CREATE_USERS->value,
        ]);

    Route::match(['put', 'patch'], 'users/{user}', [UserController::class, 'update'])
        ->middleware([
            'role:admin|gestor',
            'permission:' . PermissionEnum::EDIT_USERS->value,
        ]);

    Route::delete('users/{user}', [UserController::class, 'destroy'])
        ->middleware([
            'role:admin|gestor',
            'permission:' . PermissionEnum::DELETE_USERS->value,
        ]);

    Route::apiResource('produtos', ProdutoController::class);
    Route::apiResource('clientes', ClienteController::class);
    Route::apiResource('fornecedores', FornecedorController::class);
    Route::apiResource('orcamentos', OrcamentoController::class);
});
