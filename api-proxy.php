<?php
header("Access-Control-Allow-Origin: *");
// api-proxy.php

// Get parameters from query string or POST
$year = $_GET['year'] ?? date('Y');
$month = $_GET['month'] ?? date('m');
$date = $_GET['date'] ?? date('d');

// Prepare JSON payload
$data = array(
    "year" => intval($year),
    "month" => intval($month),
    "date" => intval($date),
    "hours" => 6,
    "minutes" => 0,
    "seconds" => 0,
    "longitude" => 78.4666,
    "latitude" => 17.38333,
    "timezone" => 5.5,
    "config" => array(
        "observation_point" => "geocentric",
        "ayanamsha" => "lahiri"
    )
);

// cURL request to the API
$ch = curl_init('https://json.apiastro.com/nakshatra-durations');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'x-api-key: Slr5QqH2y34OvWg5NOTyi4EkVyn1jQS73nXKZT51'
));
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);
if (curl_errno($ch)) {
    echo json_encode(['error' => curl_error($ch)]);
} else {
    echo $response;
}
curl_close($ch);
?>