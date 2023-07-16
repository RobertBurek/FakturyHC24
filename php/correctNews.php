<?php

$idNews =  $_POST['IdNews'];
$contentNews = $_POST['ContentNews'];
$whoDel = $_POST['WhoCorrect'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
    $dateDel = date("Y-m-d H:i:s");

    $connection->query(sprintf(
        "UPDATE `%s` SET `ContentNews` = '%s',`DateDel` = '%s',`WhoDel` = '%s' WHERE `%s`.`IdNews` = '%s';",
        mysqli_real_escape_string($connection, $tb_newscast),
        mysqli_real_escape_string($connection, $contentNews),
        mysqli_real_escape_string($connection, $dateDel),
        mysqli_real_escape_string($connection, $whoDel),
        mysqli_real_escape_string($connection, $tb_newscast),
        mysqli_real_escape_string($connection, $idNews)
    ));

    $connection->close();
}
