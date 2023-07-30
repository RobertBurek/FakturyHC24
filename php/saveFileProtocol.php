<?php
// $nameFile = $_POST['NameFile'];
// $max_rozmiar = 1024*1024;
if (is_uploaded_file($_FILES['plik']['tmp_name'])) {
    // if ($_FILES['plik']['size'] < $max_rozmiar) {
    // $currentDate = date("dmY");
    // $currentH = date("H");
    // $currentI = date("I");
    // $currentS = date("s");
    // $enlargement = strstr($_FILES['plik']['name'], ".");
    // $newNameFile = $currentDate.$currentH.$currentI.$currentS.$enlargement;
    // $_FILES['plik']['name'] = $newNameFile;
    @$pathplik = str_replace("php/saveFileProtocol.php", "protocolFiles/" . $_FILES['plik']['name'], $_SERVER['SCRIPT_FILENAME']);
    @move_uploaded_file($_FILES['plik']['tmp_name'], $pathplik);
    // if (move_uploaded_file($_FILES['plik']['tmp_name'], $pathplik)) 
    // echo json_encode(array("error" => 'Zapisem fakturę do bazy !!!'));
    // echo "<p style=\"color:green\">Jest OK!</p>";
    // else 
    // echo json_encode(array("error" => 'Błąd zapisu faktury w bazie !!!'));
    // echo "<p style=\"color:red\">Nie udało się zaoisać pliku!</p>";
}

@header('Location: ../index.php');
@header("HTTP/1.0 204 No Content");