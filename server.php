<?php

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $requests = file_get_contents('request.json');
    echo $requests;
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    $requests = json_decode(file_get_contents('request.json'), true);
    $requests[] = $input;

    file_put_contents('request.json', json_encode($requests, JSON_PRETTY_PRINT));

    echo json_encode(['status' => 'success']);
}
?>
