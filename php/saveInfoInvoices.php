<?php

// echo json_encode(array("error" => "OK !!!"));

$nick = $_POST['Nick'];
$building = $_POST['Building'];
$idInvoice = $_POST['IdInvoice'];
$nextInv = $_POST['NextInv'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
    $nick = htmlentities($nick, ENT_QUOTES, "UTF-8");
    $currentDate = date("Y-m-d H:i:s");
    // $currentYear = date("Y/m/d");
    // $currentTime = date("H:i:s");
    // $idInvoice = str_replace(' ', '', strtolower($nameUser) . "/" . $currentYear . "/" . $currentTime);

    $result = ($connection->query(sprintf(
        "SELECT COUNT(*) FROM `%s` WHERE `%s`.`IdInvoice` = '%s' AND `%s`.`ItemInvoice` = %s;",
        mysqli_real_escape_string($connection, $tb_infoinvoices),
        mysqli_real_escape_string($connection, $tb_infoinvoices),
        mysqli_real_escape_string($connection, $idInvoice),
        mysqli_real_escape_string($connection, $tb_infoinvoices),
        mysqli_real_escape_string($connection, $nextInv)
    )));
    $countResult = $result->fetch_assoc();
    // echo json_encode(array("nick" => $nick, "error" => 'result: ' . $countResult['COUNT(*)']));

    if ($countResult['COUNT(*)'] > 0) {
        $connection->query(sprintf(
            "UPDATE `%s` SET `Building` = '%s' WHERE `%s`.`IdInvoice` = '%s' AND `%s`.`ItemInvoice` = %s;",
            mysqli_real_escape_string($connection, $tb_infoinvoices),
            mysqli_real_escape_string($connection, $building),
            mysqli_real_escape_string($connection, $tb_infoinvoices),
            mysqli_real_escape_string($connection, $idInvoice),
            mysqli_real_escape_string($connection, $tb_infoinvoices),
            mysqli_real_escape_string($connection, $nextInv)
        ));
        echo json_encode(array("nick" => $nick, "error" => 'Nadpisany rekord !!!'));
    } else {
        if ($connection->query(sprintf(
            "INSERT INTO `%s` (`Lp`, `Nick`, `IdInvoice`, `Building`, `ItemInvoice`, `OrSent`, `DateSave`, `WhoSaved`, `OrDel`, `WhoDel`, `DateDel`) VALUES ('', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');",
            mysqli_real_escape_string($connection, $tb_infoinvoices),
            mysqli_real_escape_string($connection, $nick),
            mysqli_real_escape_string($connection, $idInvoice),
            mysqli_real_escape_string($connection, $building),
            mysqli_real_escape_string($connection, $nextInv),
            mysqli_real_escape_string($connection, '1'),
            mysqli_real_escape_string($connection, $currentDate),
            mysqli_real_escape_string($connection, $nick),
            mysqli_real_escape_string($connection, '0'),
            mysqli_real_escape_string($connection, $nick),
            mysqli_real_escape_string($connection, $currentDate)
        ))) {
            echo json_encode(array(
                "idInvoice" => $idInvoice,
                "building" => $building,
                "numberInv" => $nextInv,
                "whoSaved" => $nick,
                "isItSaved" => "1",
                "dateSaved" => $currentDate,
                "isItSent" => "1",
                "whoseInv" => $nick,
                "isItDelete" => "0",
                "whoDelete" => $nick,
                "dateDelete" => $currentDate,
                "error" => 'Nowo zapisany !!!'
            ));
        } else {
            echo json_encode(array("nick" => $nick, "error" => 'Problem z zapisem !!!'));
        }
        // echo json_encode(array("nick" => $nick, "error" => 'Jest jakiś problem z nadpisaniem !!!'));
    }
    $connection->close();
}
