<?php

declare(strict_types=1);

namespace App\Http\Middleware;

use App\Classes\ArrayCasing as ArrayCasingClass;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Api
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($response instanceof JsonResponse) {
            $data = $response->getData(true);

            $response->setData(ArrayCasingClass::camelDeep($data));
        }

        return $response;
    }
}
