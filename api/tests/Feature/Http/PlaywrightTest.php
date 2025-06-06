<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Support\Facades\Auth;

test('artisan', function () {
    $response = $this->post('/api/__playwright__/artisan', [
        'command' => 'inspire',
    ]);

    expect($response->status())->toEqual(200);
});

test('csrf token', function () {
    $response = $this->get('/api/__playwright__/csrf-token');

    expect($response->json())->toEqual(csrf_token());
});

test('current user', function () {
    $alice = User::factory()->create();

    Auth::login($alice);

    $response = $this->post('/api/__playwright__/current-user');

    expect($response->json('id'))->toEqual($alice->id);
});

test('factory', function () {
    $response = $this->post('/api/__playwright__/factory', [
        '_token' => csrf_token(),
        'model' => User::class,
        'attributes' => [
            'email' => 'alice@example.com',
        ],
    ]);

    expect($response->json('email'))->toEqual('alice@example.com');
});

test('login', function () {
    $this->post('/api/__playwright__/login');

    expect(Auth::check())->toBeTrue();

    $alice = User::factory()->create();

    $this->post('/api/__playwright__/login', [
        'attributes' => [
            'email' => $alice->email,
        ],
    ]);

    expect(Auth::id())->toEqual($alice->id);
});

test('logout', function () {
    $alice = User::factory()->create();

    Auth::login($alice);

    $this->post('/api/__playwright__/logout');

    expect(Auth::check())->toBeFalse();
});

test('run php', function () {
    $res1 = $this->post('/api/__playwright__/run-php', [
        'command' => 'return 123;',
    ]);

    $res2 = $this->post('/api/__playwright__/run-php', [
        'command' => 'return 456',
    ]);

    $res3 = $this->post('/api/__playwright__/run-php', [
        'command' => '789;',
    ]);

    expect($res1->json('result'))->toEqual(123);
    expect($res2->json('result'))->toEqual(456);
    expect($res3->json('result'))->toEqual(789);
});
