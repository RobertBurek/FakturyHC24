<?php

$idNews =  $_POST['idNews'];
$estateNews =  $_POST['estateNews'];
$contentNews = $_POST['contentNews'];
$dateNews = $_POST['dateNews'];
$whoSave = $_POST['whoSave'];
$saveDate = $_POST['saveDate'];
$isDel = $_POST['isDel'];
$whoDel = $_POST['whoDel'];
$dateDel = $_POST['dateDel'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
    $whoSave = htmlentities($whoSave, ENT_QUOTES, "UTF-8");
    $whoDel = htmlentities($whoDel, ENT_QUOTES, "UTF-8");
    $saveDate = date("Y-m-d H:i:s");
    $currentYear = date("Y/m/d");
    $currentTime = date("H:i:s");
    $idNews = str_replace(' ', '', strtolower($whoSave) . "/" . $dateNews . "/" . $estateNews);


    // if (
        $connection->query(sprintf(
        "INSERT INTO `%s` (`IdNews`, `EstateNews`, `ContentNews`, `DateNews`, `SaveNews`, `WhoSave`, `IsDel`, `WhoDel`, `DateDel`) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%S');",
        mysqli_real_escape_string($connection, $tb_invoices),
        mysqli_real_escape_string($connection, $idNews),
        mysqli_real_escape_string($connection, $estateNews),
        mysqli_real_escape_string($connection, $contentNews),
        mysqli_real_escape_string($connection, $dateNews),
        mysqli_real_escape_string($connection, $whoSave),
        mysqli_real_escape_string($connection, $saveDate),
        mysqli_real_escape_string($connection, $isDel),
        mysqli_real_escape_string($connection, $whoDel),
        mysqli_real_escape_string($connection, $dateDel)
        ));
    // ) {
        // echo json_encode(array(
        //     "error" => 'Zapisem fakturę do bazy !!!',
        //     "idInvoice" => $idInvoice,
        //     "nameFile" => $nameFile,
        //     "currentDate" => $currentDate,
        //     "nick" => $nick
        // ));
    // }

    $connection->close();
}