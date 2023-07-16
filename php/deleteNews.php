<?php

$whoDel = $_POST['WhoDel'];
$idNews = $_POST['IdNews'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
    $whoDel = htmlentities($whoDel, ENT_QUOTES, "UTF-8");
    $delDate = date("Y-m-d H:i:s");

    
        $connection->query(sprintf(
            "UPDATE `%s` SET `IsDel` = '1',`DateDel` = '%s',`WhoDel` = '%s' WHERE `%s`.`IdNews` = '%s';",
            mysqli_real_escape_string($connection, $tb_newscast),
            mysqli_real_escape_string($connection, $delDate),
            mysqli_real_escape_string($connection, $whoDel),
            mysqli_real_escape_string($connection, $tb_newscast),
            mysqli_real_escape_string($connection, $idNews)
        ));

        $connection->close();
    }