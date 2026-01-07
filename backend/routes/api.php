<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AdvertisementController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PictureController;
use App\Http\Controllers\Api\BookmarkController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

// Auth
Route::post('/login', [AuthController::class, 'login']);

// User
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::apiResource('users', UserController::class);
Route::get('/users/email/{email}', [UserController::class, 'emailExists']);

// Advertisement
Route::get('/advertisements', [AdvertisementController::class, 'index']);
Route::get('/advertisements/{advertisement}', [AdvertisementController::class, 'show']);

//Advertisement -> Categories
Route::get('/advertisements/{advertisement}/categories', [AdvertisementController::class, 'fetchCategories']);

// Category
Route::get('/categories', [CategoryController::class, 'index']);

// Need Token to access
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // User
    Route::put('/profile/update', [UserController::class, 'update']);
    Route::put('/password/update', [UserController::class, 'updatePassword']);
    Route::delete('/profile/delete', [UserController::class, 'destroy']);

    // Advertisement
    Route::post('/advertisements', [AdvertisementController::class, 'store']);
    Route::put('/advertisements/{advertisement}', [AdvertisementController::class, 'update']);
    Route::delete('/advertisements/{advertisement}', [AdvertisementController::class, 'destroy']);

    //Advertisement -> Categories
    Route::post('/advertisements/{advertisement}/categories', [AdvertisementController::class, 'attachCategories']);

    // Category
    Route::post('/categories/{category}', [CategoryController::class, 'store']);
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy']);

    // Picture
    Route::post('/pictures', [PictureController::class, 'store']);

    // Bookmark
    Route::get('/bookmark', [BookmarkController::class, 'index']);
    Route::post('/bookmark', [BookmarkController::class, 'store']);
    Route::delete('/bookmark', [BookmarkController::class, 'destroy']);

    // Rental
    Route::post('/rentals', [\App\Http\Controllers\RentalController::class, 'store']);
});

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
