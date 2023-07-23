<?php

$estateRaport = $_POST['EstateRaport'];
$contentRaport = $_POST['ContentRaport'];
// $dateStartRaport =  explode('-', $_POST['DateStartRaport']);
// $dateStopRaport =  explode('-', $_POST['DateStopRaport']);
// $dateStartRaport = $_POST['DateStartRaport'];
// $dateStopRaport = $_POST['DateStopRaport'];
$dateStartRaport = strtotime($_POST['DateStartRaport']);
$dateStopRaport = strtotime($_POST['DateStopRaport']);
$idFile = strtotime(date("Y-m-d, H:i:s"));
// foreach ($contentRaport as $news) {

// }


$image = imagecreatefromjpeg('https://hc24.com.pl/FakturyHC24/img/PapierFirmowy.jpg');
// $image = imagecreatefromjpeg('https://hc24.com.pl/FHC24/img/PapierFirmowy.jpg');
// $image = imagecreatefromjpeg('http://localhost/FakturyHC24/img/PapierFirmowy.jpg');
header('Content-Type: image/jpeg');
// https://hc24.com.pl/FHC24/#newscastSection

$r = 0;
$g = 0;
$b = 0;
$i = 270;
$black = imagecolorallocate($image, 0, 0, 0);
$blue2 = imagecolorallocate($image, 200, 215, 255);
$blue3 = imagecolorallocate($image, 115, 15, 55);
// imagettftext($image, 90, 500, 500, 'Geeks fo  rGe eks', $blue);
imagettftext($image, 25, 0, 330, 240, $black, "tahoma.ttf", (strtotime($dateStopRaport)-strtotime($dateStartRaport)).'RAPORT DLA OSIEDLA ' . $estateRaport);
// ImageString($image, 1200, 400, 240, 'RAPORT DLA OSIEDLA '.$estateNews, $black);


// ImageString($image, 200, 110, 270, $contentRaport[0][2], $black);
// ImageString($image, 200, 110, 300, $contentRaport[0][9], $black);
// ImageString($image, 200, 110, 330, $contentRaport[0][3], $black);
$sameDay = "";
$sameName = "";
foreach ($contentRaport as $news) {
    if ($news[6] == 0) {
        if ((strtotime($news[2]) >= $dateStartRaport) && (strtotime($news[2]) <= $dateStopRaport)) {

            $pieces = count(explode("\n", $news[3]));
            if ($news[2] != $sameDay) {
                imagettftext($image, 17, 0, 130, $i + 30, $black, "tahoma.ttf", $news[2]." ".strtotime($dateStartRaport)-strtotime($news[2]));
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

// ImageString($image, 100, 120, 370, 'Kkdckcr vvelvero k kr g k k kkk fg dl lgf fgl gf ', $black);
header('Content-Type: image/jpeg');
$newNAmeFileRAport = "Raport_" . $estateRaport . "_" .$idFile.".jpg";

imagejpeg($image, "../img/" . $newNAmeFileRAport);
ImageDestroy($image);
// echo '<img src="PapierFirmowy.JPG">';

echo json_encode(array("color" => 'red', "raportEstate" => $newNAmeFileRAport, "contentRaport" => $contentRaport));

// header('Location: ../index.php' );
