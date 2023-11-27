<?php

// Konfigurasi database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "skl_todo_list";

$con = new mysqli($servername, $username, $password, $dbname);

if ($con->connect_error) {
    die("Koneksi Gagal" . $con->connect_error);
}
// End Konfigurasi

// untuk get seluruh data
if ($_SERVER['REQUEST_METHOD']  === 'GET') {
    $sql = "SELECT * FROM task";
    $result = $con->query($sql);

    $todos = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $todos[] = $row;
        }
    }
    // convert ke data json
    echo json_encode($todos);
}
    // end get data

    // untuk create data
elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    $task = $con->real_escape_string($data->task);

    $sql = "INSERT INTO task (task_name) VALUES ('$task')";
    $con->query($sql);
}
    // end create data

    // start delete data
elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"));

    $id = $con->real_escape_string($data->id);

    $sql = "DELETE FROM task WHERE id = $id";
    $con->query($sql);
}
    // end delete data

?>

