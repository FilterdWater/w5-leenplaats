<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AdvertisementController;
use App\Http\Controllers\Api\CategoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

// Auth
Route::post('/login', [AuthController::class, 'login']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::put('/profile/update', [UserController::class, 'update']);
    Route::put('/password/update', [UserController::class, 'updatePassword']);
    Route::delete('/profile/delete', [UserController::class, 'destroy']);
});
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Postal
Route::get('/postal-lookup', function (Request $request) {
    $postal = $request->query('postal');
    $number = $request->query('number');

    $response = Http::withHeaders([
        'token' => '9b98829a-ec08-4a6c-b52a-c6dc68b8890b',
    ])->get("https://json.api-postcode.nl", [
        'postcode' => $postal,
        'number' => $number,
    ]);

    return $response->json();
});

// User
Route::apiResource('users', UserController::class);
Route::get('/users/email/{email}', [UserController::class, 'emailExists']);

// Advertisement
Route::apiResource('advertisements', AdvertisementController::class);

// Category
Route::apiResource('categories', CategoryController::class);
