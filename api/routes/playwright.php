<?php

use App\Http\Controllers\PlaywrightController;
use Illuminate\Support\Facades\Route;

Route::prefix('__playwright__')
    ->middleware('web')
    ->group(function () {
        Route::get('/', fn () => 'Ok');

        Route::post('factory', [PlaywrightController::class, 'factory'])
            ->name('playwright.factory');

        Route::post('login', [PlaywrightController::class, 'login'])
            ->name('playwright.login');

        Route::post('logout', [PlaywrightController::class, 'logout'])
            ->name('playwright.logout');

        Route::post('artisan', [PlaywrightController::class, 'artisan'])
            ->name('playwright.artisan');

        Route::post('run-php', [PlaywrightController::class, 'runPhp'])
            ->name('playwright.run-php');

        Route::get('csrf-token', [PlaywrightController::class, 'csrfToken'])
            ->name('playwright.csrf-token');

        Route::post('routes', [PlaywrightController::class, 'routes'])
            ->name('playwright.routes');

        Route::post('current-user', [PlaywrightController::class, 'currentUser'])
            ->name('playwright.current-user');
    });
