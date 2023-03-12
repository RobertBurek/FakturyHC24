<?php

// @$pathplik = str_replace("php/saveInvoiceFile.php", "invoiceFiles/" . $_FILES['plik']['name'], $_SERVER['SCRIPT_FILENAME']);
// @move_uploaded_file($_FILES['plik']['tmp_name'], $pathplik);

$nick = $_POST['Nick'];
$nameUser = $_POST['NameUser'];
$nameFile = $_POST['NameFile'];


require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
    $nick = htmlentities($nick, ENT_QUOTES, "UTF-8");
    $nameUser = htmlentities($nameUser, ENT_QUOTES, "UTF-8");
    $currentDate = date("Y-m-d H:i:s");
    $currentYear = date("Y/m/d");
    $currentTime = date("H:i:s");
    $idInvoice = str_replace(' ', '', strtolower($nameUser) . "/" . $currentYear . "/" . $currentTime);


    if ($connection->query(sprintf(
        "INSERT INTO `invoices` (`IdInvoice`, `NameFile`, `UploadDate`, `WhoUpload`) VALUES ('%s', '%s', '%s', '%s');",
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
        "nick" => $nick));
    }

    $connection->close();
}
