<?php

// @$pathplik = str_replace("php/saveInvoiceFile.php", "invoiceFiles/" . $_FILES['plik']['name'], $_SERVER['SCRIPT_FILENAME']);
// @move_uploaded_file($_FILES['plik']['tmp_name'], $pathplik);

$nick = $_POST['Nick'];
$nameUser = $_POST['NameUser'];
$nameFile = $_POST['NameFile'];
// $nameFile = $_FILES['plik']['name'];


require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
    $nick = htmlentities($nick, ENT_QUOTES, "UTF-8");
    $nameUser = htmlentities($nameUser, ENT_QUOTES, "UTF-8");
    // $nameUser = str_replace(array('ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'), array('a', 'c', 'e', 'l', 'n', 'o', 's', 'z', 'z'), $nameUser);
    $currentDate = date("Y-m-d H:i:s");
    $currentYear = date("Y/m/d");
    $currentTime = date("H:i:s");
    // $currentName = date("YmdHis");
    $idInvoice = str_replace(' ', '', strtolower($nick) . "/" . $currentYear . "/" . $currentTime);
    // $enlargement = strstr($nameFile, ".");
    // $newNameFile = $nameUser . $currentName . $enlargement;


    if ($connection->query(sprintf(
        "INSERT INTO `%s` (`IdInvoice`, `NameFile`, `UploadDate`, `WhoUpload`) VALUES ('%s', '%s', '%s', '%s');",
        mysqli_real_escape_string($connection, $tb_invoices),
        mysqli_real_escape_string($connection, $idInvoice),
        mysqli_real_escape_string($connection, $nameFile),
        mysqli_real_escape_string($connection, $currentDate),
        mysqli_real_escape_string($connection, $nick)
    ))) {
        echo json_encode(array(
            "error" => 'Zapisem fakturę do bazy !!!',
            "idInvoice" => $idInvoice,
            "nameFile" => $nameFile,
            "currentDate" => $currentDate,
            "nick" => $nick
        ));
        // sleep(3000);
        // @$pathFileOld = str_replace("php/saveInvoiceFile.php", "invoiceFiles/" . $nameFile, $_SERVER['SCRIPT_FILENAME']);
        // @$pathFileNew = str_replace("php/saveInvoiceFile.php", "invoiceFiles/" . $newNameFile, $_SERVER['SCRIPT_FILENAME']);
        // rename($pathFileOld, $pathFileNew);
    }

    $connection->close();
}
// usleep(3000000);
// time_sleep_until(time()+3);
// @$pathFileOld = str_replace("php/saveInvoiceFile.php", "invoiceFiles/" . $nameFile, $_SERVER['SCRIPT_FILENAME']);
// @$pathFileNew = str_replace("php/saveInvoiceFile.php", "invoiceFiles/" . $newNameFile, $_SERVER['SCRIPT_FILENAME']);
// rename($pathFileOld, $pathFileNew);
