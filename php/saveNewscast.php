<?php

$estateNews =  $_POST['EstateNews'];
$contentNews = $_POST['ContentNews'];
$dateNews = $_POST['DateNews'];
$whoSave = $_POST['WhoSave'];
$isDel = $_POST['IsDel'];
$whoDel = $_POST['WhoDel'];
$dateDel = $_POST['DateDel'];
$authorNews = $_POST['AuthorNews'];

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

    if (
        $connection->query(sprintf(
            "INSERT INTO `%s` (`IdNews`, `EstateNews`, `DateNews`, `ContentNews`, `SaveDate`, `WhoSave`, `IsDel`, `WhoDel`, `DateDel`, `AuthorNews`) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');",
            mysqli_real_escape_string($connection, $tb_newscast),
            mysqli_real_escape_string($connection, $idNews),
            mysqli_real_escape_string($connection, $estateNews),
            mysqli_real_escape_string($connection, $dateNews),
            mysqli_real_escape_string($connection, $contentNews),
            mysqli_real_escape_string($connection, $saveDate),
            mysqli_real_escape_string($connection, $whoSave),
            mysqli_real_escape_string($connection, $isDel),
            mysqli_real_escape_string($connection, $whoDel),
            mysqli_real_escape_string($connection, $dateDel),
            mysqli_real_escape_string($connection, $authorNews)
        ))
    ) {
        if ($resultNewscast = @$connection->query(sprintf(
            // "SELECT * FROM `%s` WHERE `EstateNews`='%s' AND `IsDel`= 0 ORDER BY SaveDate DESC;",
            // "SELECT * FROM `%s` WHERE `EstateNews`='%s' AND `IsDel`= 0 ORDER BY DateNews DESC;",
            "SELECT * FROM `%s` WHERE `EstateNews`='%s' AND `IsDel`= 0 ORDER BY SaveDate DESC;",
            mysqli_real_escape_string($connection, $tb_newscast),
            mysqli_real_escape_string($connection, $estateNews)
        ))) {
            while ($rowInfo = $resultNewscast->fetch_row()) {
                array_push($newscast, $rowInfo);
            }
            echo json_encode($newscast);
        };
    }
    $connection->close();
}
