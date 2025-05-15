<?php

declare(strict_types=1);

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): array
    {
        $validated = $request->validateWithBag('updatePassword', [
            'currentPassword' => ['required', 'current_password'],
            'password' => ['required', Password::defaults()],
            'passwordConfirmation' => ['required', 'string', 'same:password'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return [
            'result' => 'success',
        ];
    }
}
