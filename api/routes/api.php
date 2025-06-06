<?php

declare(strict_types=1);

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

if (
    config('app.env') === 'local' ||
    config('app.env') === 'testing'
) {
    require __DIR__.'/playwright.php';
}
