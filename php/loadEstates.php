<?php

// $estateNews =  $_POST['EstateNews'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
    
    $estates = [];

    if ($resultEstates = @$connection->query(sprintf(
        // "SELECT * FROM `%s` WHERE `EstateNews`='%s' AND `IsDel`= 0 ORDER BY SaveDate DESC;",
        "SELECT * FROM `%s` WHERE 1 AND `IsDel`= 0 ORDER BY NameEst ASC;",
        mysqli_real_escape_string($connection, $tb_estates),
    ))) {
        while ($rowInfo = $resultEstates->fetch_row()) {
            array_push($estates, $rowInfo);
        }
        echo json_encode($estates);
    };
    $connection->close();
}