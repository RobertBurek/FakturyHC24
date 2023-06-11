<?php

// $idNews =  $_POST['IdNews'];
$estateNews =  $_POST['EstateNews'];
$contentNews = $_POST['ContentNews'];
$dateNews = $_POST['DateNews'];
$whoSave = $_POST['WhoSave'];
$isDel = $_POST['IsDel'];
// $isDel = 0;
$whoDel = $_POST['WhoDel'];
$dateDel = $_POST['DateDel'];
// $dateDel = date("Y-m-d H:i:s");

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
    $whoSave = htmlentities($whoSave, ENT_QUOTES, "UTF-8");
    $whoDel = htmlentities($whoDel, ENT_QUOTES, "UTF-8");
    $saveDate = date("Y-m-d H:i:s");
    $idNews = str_replace(' ', '', strtolower($whoSave) . "/" . $dateNews . "/" . $estateNews);


    // if (
        $connection->query(sprintf(
        "INSERT INTO `%s` (`IdNews`, `EstateNews`, `DateNews`, `ContentNews`, `SaveDate`, `WhoSave`, `IsDel`, `WhoDel`, `DateDel`) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');",
        mysqli_real_escape_string($connection, $tb_newscast),
        mysqli_real_escape_string($connection, $idNews),
        mysqli_real_escape_string($connection, $estateNews),
        mysqli_real_escape_string($connection, $dateNews),
        mysqli_real_escape_string($connection, $contentNews),
        mysqli_real_escape_string($connection, $saveDate),
        mysqli_real_escape_string($connection, $whoSave),
        mysqli_real_escape_string($connection, $isDel),
        mysqli_real_escape_string($connection, $whoDel),
        mysqli_real_escape_string($connection, $dateDel)
        ));
    // ) {
        // echo json_encode(array(
        //     "error" => 'Zapisem newscast do bazy !!!',
        //     "idNews" => $idNews,
        //     "estateNews" => $estateNews,
        //     "saveDate" => $saveDate,
        //     "whoSave" => $whoSave
        // ));
    // }

    $connection->close();
}