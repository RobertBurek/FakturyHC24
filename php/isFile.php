<?php

$nameFile = $_POST['NameFile'];

@$pathplik = str_replace("php/isFile.php", "invoiceFiles/" . $nameFile, $_SERVER['SCRIPT_FILENAME']);
// $f = fopen($_FILES['plik']['tmp_name'],"r");
// $f = fopen("./invoiceFiles/".$nazwapliku,"r");
// $dane = fread($f,"./invoiceFiles/".$nazwapliku);
// $f = fopen($pathplik,"r");
// $dane = fread($f,$pathplik);
if (file_exists($pathplik)) {
    $tresc = "Plik istnieje, jest OK !!!\n";
    echo json_encode(array("color" => 'green', "error" => $tresc));
} else {
    $tresc = "Nie ma pliku !!!\n";
    echo json_encode(array("color" => 'red', "error" => $tresc));
}

// header('Location: ' . $_SERVER['HTTP_REFERER'] . '#contact');
// header('Location: index.php' );
