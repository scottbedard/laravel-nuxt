<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Support\Facades\Hash;

test('new password can be set', function () {
    $user = User::factory()->create();

    $response = $this
        ->actingAs($user)
        ->post('/password', [
            'currentPassword' => 'password',
            'password' => 'new-password',
            'passwordConfirmation' => 'new-password',
        ]);

    expect($response->json('result'))->toBe('success');

    $user->refresh();

    expect(Hash::check('new-password', $user->password))->toBeTrue();
});
