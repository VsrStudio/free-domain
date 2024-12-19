<?php
$file = "request.json";

// Jika permintaan GET, ambil data dari file JSON
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $data = file_get_contents($file);
    echo $data;
}
// Jika permintaan POST, tambahkan data baru ke file JSON
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $newRequest = json_decode(file_get_contents('php://input'), true);

    // Ambil data yang sudah ada dalam file JSON
    $data = json_decode(file_get_contents($file), true);

    // Menambahkan request baru
    $data[] = $newRequest;

    // Simpan data kembali ke dalam file JSON
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
    echo json_encode(["status" => "success"]);
}
?>
