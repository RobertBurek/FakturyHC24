<?php


$nick = $_POST['Nick'];
$nextInv = $_POST['NextInv'];
$idInvoice = $_POST['IdInvoice'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
    $nick = htmlentities($nick, ENT_QUOTES, "UTF-8");
    $currentDate = date("Y-m-d H:i:s");

    $result = ($connection->query(sprintf(
        "SELECT * FROM `%s` WHERE `%s`.`IdInvoice` = '%s' AND `%s`.`ItemInvoice` = %s AND `%s`.`OrDel` = 0;",
        mysqli_real_escape_string($connection, $tb_infoinvoices),
        mysqli_real_escape_string($connection, $tb_infoinvoices),
        mysqli_real_escape_string($connection, $idInvoice),
        mysqli_real_escape_string($connection, $tb_infoinvoices),
        mysqli_real_escape_string($connection, $nextInv),
        mysqli_real_escape_string($connection, $tb_infoinvoices)
    )));
    $countResult = $result->fetch_assoc();

    $numberLp = $countResult['Lp'];

    // echo json_encode(array("nick" => $nick, "error" => $numberLp));

        $connection->query(sprintf(
            "UPDATE `%s` SET `OrDel` = '1' WHERE `%s`.`Lp` = %s",
            mysqli_real_escape_string($connection, $tb_infoinvoices),
            mysqli_real_escape_string($connection, $tb_infoinvoices),
            mysqli_real_escape_string($connection, $numberLp),
        ));

    // echo json_encode(array("nick" => $nick, "error" => $numberLp));

        $connection->query(sprintf(
            "UPDATE `%s` SET `WhoDel` = '%s' WHERE `%s`.`Lp` = %s",
            mysqli_real_escape_string($connection, $tb_infoinvoices),
            // mysqli_real_escape_string($connection, "JA"),
            mysqli_real_escape_string($connection, $nick),
            mysqli_real_escape_string($connection, $tb_infoinvoices),
            mysqli_real_escape_string($connection, $numberLp),
        ));

        // echo json_encode(array("nick" => $nick, "error" => $numberLp));

        $connection->query(sprintf(
            "UPDATE `%s` SET `DateDel` = '%s' WHERE `%s`.`Lp` = %s",
            mysqli_real_escape_string($connection, $tb_infoinvoices),
            mysqli_real_escape_string($connection, $currentDate),
            mysqli_real_escape_string($connection, $tb_infoinvoices),
            mysqli_real_escape_string($connection, $numberLp),
        ));

        // echo json_encode(array("nick" => $nick, "error" => $numberLp));

    $connection->close();
}
