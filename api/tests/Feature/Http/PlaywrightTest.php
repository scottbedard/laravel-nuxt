<?php

test('csrf token', function () {
    $response = $this->get('/api/__playwright__/csrf_token');

    expect($response->json())->toEqual(csrf_token());
});
