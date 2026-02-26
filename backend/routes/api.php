<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConfirmationController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Pest\Plugins\Only;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

//Guest
Route::apiResource('packages', PackageController::class)->only(['index', 'show']);
Route::apiResource('categories', CategoryController::class)->only(['index', 'show']);
    
// register
Route::post('/register', [AuthController::class, 'register']);

// login
Route::post('/login', [AuthController::class, 'login']);

// logout
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');

//User
Route::middleware('auth:api')->group(function () {
    // 1. Profile
    Route::apiResource('users', UserController::class)->only(['index', 'show', 'update']);

    // 2. Konfirmasi
    Route::apiResource('confirmations', ConfirmationController::class)->only(['store']);

    // 3. Transaksi
    Route::apiResource('transactions', TransactionController::class)->only(['store','index','show']);

    //Admin only
    Route::middleware(['role:admin'])->group(function () {
        // 1. Lihat user
        Route::apiResource('users', UserController::class)->except(['index', 'show', 'update']);
        
        // 2. Konfirmasi
        Route::apiResource('confirmations', ConfirmationController::class)->except(['store']);
        
        // 3. Transaksi
        Route::apiResource('transactions', TransactionController::class)->except(['store', 'index', 'show']);
        
        // 4. Packages
        Route::apiResource('packages', PackageController::class)->except(['index', 'show']);
        
        // 5. Kategori
        Route::apiResource('categories', CategoryController::class)->except(['index','show']);
    });
});
