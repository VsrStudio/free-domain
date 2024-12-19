<?php
// server.php

// Mengatur header untuk JSON
header('Content-Type: application/json');

// Mengecek apakah ada permintaan GET atau POST
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Mengambil data request.json
    $requests = file_get_contents('request.json');
    echo $requests;
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil data POST
    $input = json_decode(file_get_contents('php://input'), true);

    // Menyimpan data permintaan ke request.json
    $requests = json_decode(file_get_contents('request.json'), true);
    $requests[] = $input; // Menambahkan permintaan baru ke array

    file_put_contents('request.json', json_encode($requests, JSON_PRETTY_PRINT));

    echo json_encode(['status' => 'success']);
}
?>
