<?php

declare(strict_types=1);

namespace App\Classes;

use Illuminate\Contracts\Support\Arrayable;

class ArrayCasing
{
    /**
     * Camel case keys recursively.
     *
     * @return array
     */
    public static function camelDeep(array|Arrayable $arr, ?string $ignorePrefix = null)
    {
        return self::keyByRecursive($arr, fn ($val, $key) => str($key)->camel(), $ignorePrefix);
    }

    /**
     * Apply a function to array keys recursively.
     *
     * @param  function  $fn
     * @return array
     */
    public static function keyByRecursive(array|Arrayable $arr, $fn, ?string $ignorePrefix = null)
    {
        return collect($arr)
            ->keyBy(function ($value, $key) use ($fn, $ignorePrefix) {
                if (is_string($ignorePrefix) && str_starts_with($key, $ignorePrefix)) {
                    return $key;
                }

                return $fn($value, $key);
            })
            ->mapWithKeys(function ($item, $key) use ($fn, $ignorePrefix) {
                if (is_string($ignorePrefix) && str_starts_with($key, $ignorePrefix)) {
                    return [substr($key, strlen($ignorePrefix)) => $item];
                } elseif (is_array($item)) {
                    return [$key => self::keyByRecursive($item, $fn, $ignorePrefix)];
                } elseif ($item instanceof \Illuminate\Contracts\Support\Arrayable) {
                    return [$key => self::keyByRecursive($item->toArray(), $fn, $ignorePrefix)];
                }

                return [$key => $item];
            })
            ->toArray();
    }

    /**
     * Snake case keys recursively.
     *
     * @return array
     */
    public static function snakeDeep(array|Arrayable $arr, ?string $ignorePrefix = null)
    {
        return self::keyByRecursive($arr, fn ($val, $key) => str($key)->snake(), $ignorePrefix);
    }
}
