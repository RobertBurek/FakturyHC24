<?php


$nick = $_POST['Nick'];
// $nameFile = $_POST['NameFile'];
$idInvoice = $_POST['IdInvoice'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
    $nick = htmlentities($nick, ENT_QUOTES, "UTF-8");
    $currentDate = date("Y-m-d H:i:s");

    // UPDATE `invoices_test` SET `IsDel` = '1' WHERE `invoices_test`.`IdInvoice` = 'rburek/2023/05/21/12:12:03';
    // UPDATE `%s` SET `IsDel` = '1' WHERE `%s`.`IdInvoice` = %s;

    // $result = ($connection->query(sprintf(
    //     "SELECT * FROM `%s` WHERE `%s`.`IdInvoice` = '%s' AND `%s`.`ItemInvoice` = %s AND `%s`.`OrDel` = 0;",
    //     mysqli_real_escape_string($connection, $tb_infoinvoices),
    //     mysqli_real_escape_string($connection, $tb_infoinvoices),
    //     mysqli_real_escape_string($connection, $idInvoice),
    //     mysqli_real_escape_string($connection, $tb_infoinvoices),
    //     mysqli_real_escape_string($connection, $nextInv),
    //     mysqli_real_escape_string($connection, $tb_infoinvoices)
    // )));
    // $countResult = $result->fetch_assoc();

    // $numberLp = $countResult['Lp'];

    // echo json_encode(array("nick" => $nick, "error" => $numberLp));

        $connection->query(sprintf(
            "UPDATE `%s` SET `isDel` = '1' WHERE `%s`.`IdInvoice` = '%s'",
            mysqli_real_escape_string($connection, $tb_invoices),
            mysqli_real_escape_string($connection, $tb_invoices),
            mysqli_real_escape_string($connection, $idInvoice),
        ));

    // echo json_encode(array("nick" => $nick, "error" => $numberLp));

        $connection->query(sprintf(
            "UPDATE `%s` SET `WhoDelete` = '%s' WHERE `%s`.`IdInvoice` = '%s'",
            mysqli_real_escape_string($connection, $tb_invoices),
            // mysqli_real_escape_string($connection, "JA"),
            mysqli_real_escape_string($connection, $nick),
            mysqli_real_escape_string($connection, $tb_invoices),
            mysqli_real_escape_string($connection, $idInvoice),
        ));

        // echo json_encode(array("nick" => $nick, "error" => $numberLp));

        $connection->query(sprintf(
            "UPDATE `%s` SET `DateDelete` = '%s' WHERE `%s`.`IdInvoice` = '%s'",
            mysqli_real_escape_string($connection, $tb_invoices),
            mysqli_real_escape_string($connection, $currentDate),
            mysqli_real_escape_string($connection, $tb_invoices),
            mysqli_real_escape_string($connection, $idInvoice),
        ));

        echo json_encode(array("nick" => $nick, "error" => $currentDate));

    $connection->close();
}
