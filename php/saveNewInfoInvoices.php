<?php

// echo json_encode(array("error" => "OK !!!"));

// $nick = $_POST['Nick'];
// $building = $_POST['Building'];
// $idInvoice = $_POST['IdInvoice'];
// $nextInv = $_POST['NextInv'];

$idInvoice= $_POST['IdInvoice'];
$building= $_POST['Building'];
$itemInvoice= $_POST['ItemInvoice'];
$nick= $_POST['Nick'];
// $dateSave= $_POST['DateSave'];
$whoSaved= $_POST['WhoSaved'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
    $nick = htmlentities($nick, ENT_QUOTES, "UTF-8");
    $currentDate = date("Y-m-d H:i:s");

    $connection->query(sprintf(
        "INSERT INTO `%s` (`Lp`, `Nick`, `IdInvoice`, `Building`, `ItemInvoice`, `OrSent`, `DateSave`, `WhoSaved`, `OrDel`, `WhoDel`, `DateDel`) VALUES ('', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');",
        mysqli_real_escape_string($connection, $tb_infoinvoices),
        mysqli_real_escape_string($connection, $nick),
        mysqli_real_escape_string($connection, $idInvoice),
        mysqli_real_escape_string($connection, $building),
        mysqli_real_escape_string($connection, $itemInvoice),
        mysqli_real_escape_string($connection, '0'),
        mysqli_real_escape_string($connection, $currentDate),
        mysqli_real_escape_string($connection, $whoSaved),
        mysqli_real_escape_string($connection, '0'),
        mysqli_real_escape_string($connection, ""),
        mysqli_real_escape_string($connection, "")
    ));

    $connection->close();
}
