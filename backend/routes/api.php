<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::post('/sign-up', [UserController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::put('/profile/update', [UserController::class, 'update']);
    Route::put('/password/update', [UserController::class, 'updatePassword']);
    Route::delete('/profile/delete', [UserController::class, 'destroy']);
});

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
