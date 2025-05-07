<?php

use App\Models\User;
use Illuminate\Support\Facades\Auth;

test('csrf token', function () {
    $response = $this->get('/api/__playwright__/csrf_token');

    expect($response->json())->toEqual(csrf_token());
});

test('login', function () {
    $alice = User::factory()->create();

    $this->post('/api/__playwright__/login', [
        'attributes' => [
            'email' => $alice->email,
        ],
    ]);

    expect(Auth::id())->toEqual($alice->id);
});

test('run php', function () {
    $response = $this->post('/api/__playwright__/run-php', [
        'command' => 'return 12345;',
    ]);

    expect($response->json('result'))->toEqual(12345);
});