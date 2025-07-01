<?php

use App\Http\Controllers\Api\ApiCommentController;
use App\Http\Controllers\Api\ApiGameController;
use App\Http\Controllers\Api\ApiGameScreenshootController;
use App\Http\Controllers\Api\ApiGameTagController;
use App\Http\Controllers\Api\ApiGameVideoController;
use App\Http\Controllers\Api\ApiReviewController;
use App\Http\Controllers\Api\ApiTagController;
use App\Http\Controllers\Api\ApiUserController;
use App\Http\Controllers\Api\ApiUserGameLibraryController;
use App\Http\Controllers\Api\ApiUserWishlistController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::apiResource('/comments', ApiCommentController::class);
Route::apiResource('/games', ApiGameController::class);
Route::apiResource('/game_screenshot', ApiGameScreenshootController::class);
Route::apiResource('/game_tags', ApiGameTagController::class);
Route::apiResource('/game_videos', ApiGameVideoController::class);
Route::apiResource('/reviews', ApiReviewController::class);
Route::apiResource('/tags', ApiTagController::class);
Route::apiResource('/users', ApiUserController::class);
Route::apiResource('/user_game_library', ApiUserGameLibraryController::class);
Route::apiResource('/user_wishlist', ApiUserWishlistController::class);