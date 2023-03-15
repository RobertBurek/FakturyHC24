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


    if ($connection->query(sprintf(
        "INSERT INTO `infoinvoices` (`Lp`, `Nick`, `IdInvoice`, `Building`, `ItemInvoice`, `OrSent`, `DateSave`, `WhoSaved`, `OrDel`, `WhoDel`, `DateDel`) VALUES (NULL, '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');",
        mysqli_real_escape_string($connection, $nick),
        mysqli_real_escape_string($connection, $idInvoice),
        mysqli_real_escape_string($connection, $building),
        mysqli_real_escape_string($connection, $nextInv),
        mysqli_real_escape_string($connection, '1'),
        mysqli_real_escape_string($connection, $currentDate),
        mysqli_real_escape_string($connection, $nick),
        mysqli_real_escape_string($connection, '1'),
        mysqli_real_escape_string($connection, $nick),
        mysqli_real_escape_string($connection, $currentDate)
    ))) {
        // $connection->query(sprintf(
        //     "CREATE TABLE `%s`.`%s` (
        //         `Word` varchar(9) COLLATE utf8_polish_ci NOT NULL,
        //         `Level` int(11) NOT NULL,
        //         `Attempt` int(11) NOT NULL,
        //         `IsCategory` tinyint(1) NOT NULL,
        //         `IsOnlyWord` tinyint(1) NOT NULL,
        //         `Points` int(11) NOT NULL,
        //         PRIMARY KEY (`Word`)
        //       ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;",
        //     mysqli_real_escape_string($connection, $db_name),
        //     mysqli_real_escape_string($connection, $nameTable)
        // ));
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
            "error" => 'zapisany !!!'
        ));
    } else {
        echo json_encode(array("nick" => $nick, "error" => 'Istnieje już !!!'));
    }
    $connection->close();
}
