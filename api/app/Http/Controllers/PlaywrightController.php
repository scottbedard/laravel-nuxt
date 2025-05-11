<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

class PlaywrightController extends Controller
{
    /**
     * Artisan
     *
     * @return void
     */
    public function artisan(Request $request)
    {
        Artisan::call(
            $request->input('command'),
            $request->input('parameters', [])
        );
    }

    /**
     * Csrf token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function csrfToken()
    {
        return response()->json(csrf_token());
    }

    /**
     * Current user
     *
     * @return mixed
     */
    public function currentUser()
    {
        return Auth::user();
    }

    /**
     * Factory
     *
     * @return mixed
     */
    public function factory(Request $request)
    {
        return $this->factoryBuilder(
            $request->input('model'),
            $request->input('state', [])
        )
            ->count(intval($request->input('count', 1)))
            ->create($request->input('attributes'))
            ->each(fn ($model) => $model->setHidden([])->setVisible([]))
            ->load($request->input('load', []))
            ->pipe(function ($collection) {
                return $collection->count() > 1
                    ? $collection
                    : $collection->first();
            });
    }

    /**
     * Factory builder
     *
     * @param  string  $model
     * @param  array  $states
     * @return mixed
     */
    protected function factoryBuilder($model, $states = [])
    {
        $factory = $model::factory();

        $states = Arr::wrap($states);

        foreach ($states as $state => $attributes) {
            if (is_int($state)) {
                $state = $attributes;
                $attributes = [];
            }

            $attributes = Arr::wrap($attributes);

            $factory = $factory->{$state}(...$attributes);
        }

        return $factory;
    }

    /**
     * Login
     *
     * @return mixed
     */
    public function login(Request $request)
    {
        $attributes = $request->input('attributes', []);

        if (empty($attributes)) {
            $user = $this->factoryBuilder(
                $this->userClassName(),
                $request->input('state', [])
            )->create();
        } else {
            $user = app($this->userClassName())
                ->newQuery()
                ->where($attributes)
                ->first();

            if (! $user) {
                $user = $this->factoryBuilder(
                    $this->userClassName(),
                    $request->input('state', [])
                )->create($attributes);
            }
        }

        $user->load($request->input('load', []));

        return tap($user, function ($user) {
            Auth::login($user);

            $user->setHidden([])->setVisible([]);
        });
    }

    /**
     * Logout
     *
     * @return void
     */
    public function logout()
    {
        Auth::logout();
    }

    /**
     * Routes
     */
    public function routes(): Collection
    {
        return collect(Route::getRoutes()->getRoutes())
            ->map(function (\Illuminate\Routing\Route $route) {
                return [
                    'name' => $route->getName(),
                    'domain' => $route->getDomain(),
                    'action' => $route->getActionName(),
                    'uri' => $route->uri(),
                    'method' => $route->methods(),
                ];
            })
            ->keyBy('name');
    }

    /**
     * Run PHP
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function runPhp(Request $request)
    {
        Event::fake();

        $code = $request->input('command');

        if ($code[-1] !== ';') {
            $code .= ';';
        }

        if (! Str::contains($code, 'return')) {
            $code = 'return '.$code;
        }

        return response()->json([
            'result' => eval($code),
        ]);
    }

    /**
     * User class name
     *
     * @return string
     */
    protected function userClassName()
    {
        return config('auth.providers.users.model');
    }
}
