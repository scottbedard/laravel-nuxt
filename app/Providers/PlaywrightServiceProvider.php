<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class PlaywrightServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        if (config('app.env') !== 'local') {
            return;
        }

        $this->loadRoutesFrom(__DIR__.'/../routes/playwright.php');

        $this->publishes([
            __DIR__.'/../playwright.config.ts' => base_path('playwright.config.ts'),
            __DIR__.'/../tests/Playwright' => base_path('tests/Playwright'),
        ], 'playwright');
    }
}
