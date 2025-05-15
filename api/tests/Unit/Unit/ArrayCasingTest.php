<?php

declare(strict_types=1);

use App\Classes\ArrayCasing;

test('camel deep', function () {
    $output = ArrayCasing::camelDeep([
        'foo_bar' => 'baz',
        'one_two' => [
            'three_four' => 'five',
            'six_seven' => [
                ['eight_nine' => 'ten_eleven'],
            ],
        ],
    ]);

    expect($output)->toBe([
        'fooBar' => 'baz',
        'oneTwo' => [
            'threeFour' => 'five',
            'sixSeven' => [
                ['eightNine' => 'ten_eleven'],
            ],
        ],
    ]);
});

test('snake deep', function () {
    $output = ArrayCasing::snakeDeep([
        'fooBar' => 'baz',
        'oneTwo' => [
            'threeFour' => 'five',
            'sixSeven' => [
                ['eightNine' => 'tenEleven'],
            ],
        ],
    ]);

    expect($output)->toBe([
        'foo_bar' => 'baz',
        'one_two' => [
            'three_four' => 'five',
            'six_seven' => [
                ['eight_nine' => 'tenEleven'],
            ],
        ],
    ]);
});

test('ignore prefix', function () {
    $output = ArrayCasing::camelDeep([
        'foo_bar' => true,
        '_one_two' => false,
    ], '_');

    expect($output)->toBe([
        'fooBar' => true,
        'one_two' => false,
    ]);
});
