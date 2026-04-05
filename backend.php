<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "elelmiszerbolt");
if ($conn->connect_error) die(json_encode(["error" => "Kapcsolódási hiba"]));

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        // Friss lista lekérése
        $res = $conn->query("SELECT * FROM ARU ORDER BY aru_kod DESC");
        echo json_encode($res->fetch_all(MYSQLI_ASSOC));
        break;

    case 'POST':
        $in = json_decode(file_get_contents("php://input"), true);
        $nev = $conn->real_escape_string($in['nev']);
        $egyseg = $conn->real_escape_string($in['egyseg']);
        $ar = intval($in['ar']);
        
        // Csak a kötelező mezőket küldjük, az aru_kod-ot a MySQL generálja!
        $sql = "INSERT INTO ARU (kat_kod, nev, egyseg, ar) VALUES (1, '$nev', '$egyseg', $ar)";
        
        if ($conn->query($sql)) echo json_encode(["status" => "Siker"]);
        else echo json_encode(["error" => $conn->error]);
        break;

    case 'PUT':
        $in = json_decode(file_get_contents("php://input"), true);
        $id = intval($in['aru_kod']);
        $nev = $conn->real_escape_string($in['nev']);
        $egyseg = $conn->real_escape_string($in['egyseg']);
        $ar = intval($in['ar']);

        $sql = "UPDATE ARU SET nev='$nev', egyseg='$egyseg', ar=$ar WHERE aru_kod=$id";
        
        if ($conn->query($sql)) echo json_encode(["status" => "Módosítva"]);
        else echo json_encode(["error" => $conn->error]);
        break;

    case 'DELETE':
        if(isset($_GET['aru_kod'])) {
            $id = intval($_GET['aru_kod']);
            $conn->query("DELETE FROM ARU WHERE aru_kod = $id");
            echo json_encode(["status" => "Törölve"]);
        }
        break;
}
$conn->close();
?>