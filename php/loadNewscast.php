<?php

$estateNews =  $_POST['EstateNews'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
    
    $newscast = [];

    if ($resultNewscast = @$connection->query(sprintf(
        // "SELECT * FROM `%s` WHERE `EstateNews`='%s' AND `IsDel`= 0 ORDER BY SaveDate DESC;",
        // "SELECT * FROM `%s` WHERE `EstateNews`='%s' AND `IsDel`= 0 ORDER BY DateNews DESC;",
        // "SELECT * FROM `%s` WHERE `EstateNews`='%s' AND `IsDel`= 0 ORDER BY SaveDate DESC;",
        // "SELECT * FROM `%s` WHERE `EstateNews`='%s' ORDER BY SaveDate DESC;",
        // "SELECT * FROM `%s` WHERE `EstateNews`='%s' ORDER BY DateNews DESC;",
        "SELECT * FROM `%s` WHERE `EstateNews`='%s';",
        mysqli_real_escape_string($connection, $tb_newscast),
        mysqli_real_escape_string($connection, $estateNews)
    ))) {
        while ($rowInfo = $resultNewscast->fetch_row()) {
            array_push($newscast, $rowInfo);
        }
        echo json_encode($newscast);
    };
    $connection->close();
}
