<?php

Use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FilmeController;

Route::prefix('v1')->group(function () {
    Route::group([
        'middleware' => 'api',
        'prefix' => 'auth'
    ], function () {
        Route::post('login', [AuthController::class, 'login']);
        Route::post('register', [AuthController::class, 'register']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
        Route::get('check', [AuthController::class, 'checkToken'])->middleware('auth:api');
        Route::get('me', [AuthController::class, 'me'])->middleware('auth:api');
    });

    Route::middleware('jwt.guard:api')->group(function () {

        Route::prefix('filme')->group(function () {
            Route::get('', [FilmeController::class, 'index']);
            Route::post('', [FilmeController::class, 'store']);
            Route::get('{id}', [FilmeController::class, 'show']);
            Route::put('{id}', [FilmeController::class, 'update']);
            Route::delete('{id}', [FilmeController::class, 'destroy']);
        });

    });
});
