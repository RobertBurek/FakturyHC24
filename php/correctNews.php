<?php

$idNews =  $_POST['IdNews'];
$contentNews = $_POST['ContentNews'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
    $whoSave = htmlentities($whoSave, ENT_QUOTES, "UTF-8");
    $whoDel = htmlentities($whoDel, ENT_QUOTES, "UTF-8");
    $saveDate = date("Y-m-d H:i:s");
    $idDate = date("Y-m-d/H:i:s");
    $idNews = str_replace(' ', '', $idDate . "/" . $estateNews . "/" . strtolower($whoSave));
    $newscast = [];

    $connection->query(sprintf(
        "UPDATE `%s` SET `ContentNews` = '%s',`DateDel` = '%s' WHERE `%s`.`IdNews` = '%s';",
        mysqli_real_escape_string($connection, $tb_newscast),
        mysqli_real_escape_string($connection, $contentNews),
        mysqli_real_escape_string($connection, $tb_newscast),
        mysqli_real_escape_string($connection, $idNews)
    ));
    // ) {
    //     if ($resultNewscast = @$connection->query(sprintf(
    //         // "SELECT * FROM `%s` WHERE `EstateNews`='%s' AND `IsDel`= 0 ORDER BY SaveDate DESC;",
    //         // "SELECT * FROM `%s` WHERE `EstateNews`='%s' AND `IsDel`= 0 ORDER BY DateNews DESC;",
    //         "SELECT * FROM `%s` WHERE `EstateNews`='%s' AND `IsDel`= 0 ORDER BY SaveDate DESC;",
    //         mysqli_real_escape_string($connection, $tb_newscast),
    //         mysqli_real_escape_string($connection, $estateNews)
    //     ))) {
    //         while ($rowInfo = $resultNewscast->fetch_row()) {
    //             array_push($newscast, $rowInfo);
    //         }
    //         echo json_encode($newscast);
    //     };
    // }
    $connection->close();
}
