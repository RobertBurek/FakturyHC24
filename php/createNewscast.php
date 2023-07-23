<?php

$estateRaport = $_POST['EstateRaport'];
$contentRaport = $_POST['ContentRaport'];
$dateStartRaport = strtotime($_POST['DateStartRaport']);
$dateStopRaport = strtotime($_POST['DateStopRaport']);
$newNameFileRaport = "Raport_" . $estateRaport . "_" .strtotime(date("Y-m-d, H:i:s")).".jpg";



$image = imagecreatefromjpeg('https://hc24.com.pl/FakturyHC24/img/PapierFirmowy.jpg');
// $image = imagecreatefromjpeg('https://hc24.com.pl/FHC24/img/PapierFirmowy.jpg');
// $image = imagecreatefromjpeg('http://localhost/FakturyHC24/img/PapierFirmowy.jpg');
header('Content-Type: image/jpeg');
// https://hc24.com.pl/FHC24/#newscastSection

$i = 270;
$black = imagecolorallocate($image, 0, 0, 0);
$blue2 = imagecolorallocate($image, 200, 215, 255);
$blue3 = imagecolorallocate($image, 115, 15, 55);
// imagettftext($image, 90, 500, 500, 'Geeks fo  rGe eks', $blue);
imagettftext($image, 25, 0, 330, 240, $black, "tahoma.ttf", 'RAPORT DLA OSIEDLA ' . $estateRaport);

$sameDay = "";
$sameName = "";
foreach ($contentRaport as $news) {
    if ($news[6] == 0) {
        if ((strtotime($news[2]) >= $dateStartRaport) && (strtotime($news[2]) <= $dateStopRaport)) {

            $pieces = count(explode("\n", $news[3]));
            if ($news[2] != $sameDay) {
                imagettftext($image, 17, 0, 130, $i + 30, $black, "tahoma.ttf", $news[2]);
                $sameName = "";
            } else $i -= 50;
            if ($news[9] != $sameName) imagettftext($image, 15, 0, 150, $i + 50, $black, "tahoma.ttf", 'Technik ' . $news[9] . ' wykonał:');
            else $i -= 20;
            // $pieces = count(explode("\n ", $news[3]));
            imagettftext($image, 12, 0, 170, $i + 70, $black, "tahoma.ttf", $pieces . "*" . $news[3]);
            // $i += 100;
            $i += 70 + $pieces * 20;
            $sameDay = $news[2];
            $sameName = $news[9];
        }
    }
}

header('Content-Type: image/jpeg');

imagejpeg($image, "../img/" . $newNameFileRaport);
ImageDestroy($image);
// echo '<img src="PapierFirmowy.JPG">';

echo json_encode(array("color" => 'red', "raportEstate" => $newNameFileRaport, "contentRaport" => $contentRaport));

// header('Location: ../index.php' );
