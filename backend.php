<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Kapcsolódási adatok a Nethelyhez
$host = 'localhost';
$db   = 'adatb10';
$user = 'adatb10';
$pass = 'WebEloadas-2026';
$charset = 'utf8mb4';

try {
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    die(json_encode(["error" => "Kapcsolódási hiba: " . $e->getMessage()]));
}

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
       
        $stmt = $pdo->query("SELECT * FROM aru ORDER BY aru_kod DESC");
        echo json_encode($stmt->fetchAll());
        break;

    case 'POST':
        $in = json_decode(file_get_contents("php://input"), true);
       
        $sql = "INSERT INTO aru (kat_kod, nev, egyseg, ar) VALUES (1, ?, ?, ?)";
        try {
            $pdo->prepare($sql)->execute([$in['nev'], $in['egyseg'], intval($in['ar'])]);
            echo json_encode(["status" => "Siker"]);
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;

    case 'PUT':
        $in = json_decode(file_get_contents("php://input"), true);
       
        $sql = "UPDATE aru SET nev=?, egyseg=?, ar=? WHERE aru_kod=?";
        try {
            $pdo->prepare($sql)->execute([
                $in['nev'], 
                $in['egyseg'], 
                intval($in['ar']), 
                intval($in['aru_kod'])
            ]);
            echo json_encode(["status" => "Módosítva"]);
        } catch (Exception $e) {
            echo json_encode(["error" => $e->getMessage()]);
        }
        break;

    case 'DELETE':
        if(isset($_GET['aru_kod'])) {
            $id = intval($_GET['aru_kod']);
    
            $sql = "DELETE FROM aru WHERE aru_kod = ?";
            $pdo->prepare($sql)->execute([$id]);
            echo json_encode(["status" => "Törölve"]);
        }
        break;
}
?>