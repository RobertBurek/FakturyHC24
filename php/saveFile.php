<?php
// $max_rozmiar = 1024*1024;
if (is_uploaded_file($_FILES['plik']['tmp_name'])) {
    // if ($_FILES['plik']['size'] < $max_rozmiar) {
        @$pathplik=str_replace("php/saveFile.php","invoiceFiles/".$_FILES['plik']['name'],$_SERVER['SCRIPT_FILENAME']);
        @move_uploaded_file($_FILES['plik']['tmp_name'],$pathplik);
    }
// }
@header('Location: ../index.php');
@header("HTTP/1.0 204 No Content");
