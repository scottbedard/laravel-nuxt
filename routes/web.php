<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->to(config('app.frontend_url'));
});

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});

require __DIR__.'/auth.php';

if (config('app.env') === 'local') {
    require __DIR__.'/playwright.php';
}
