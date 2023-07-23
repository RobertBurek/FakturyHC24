<?php

$estateRaport = $_POST['EstateRaport'];
$contentRaport = $_POST['ContentRaport'];
$dateStartRaport = strtotime($_POST['DateStartRaport']);
$dateStopRaport = strtotime($_POST['DateStopRaport']);
$newNameFileRaport = "Raport_" . $estateRaport . "_" .strtotime(date("Y-m-d, H:i:s")).".jpg";
$strlenEstateRaport = strlen($estateRaport);


$image = imagecreatefromjpeg('https://hc24.com.pl/FakturyHC24/img/PapierFirmowy.jpg');
// $image = imagecreatefromjpeg('https://hc24.com.pl/FHC24/img/PapierFirmowy.jpg');
// $image = imagecreatefromjpeg('http://localhost/FakturyHC24/img/PapierFirmowy.jpg');
header('Content-Type: image/jpeg');
// https://hc24.com.pl/FHC24/#newscastSection

$i = 300;
$black = imagecolorallocate($image, 0, 0, 0);

$strlenEstateRaport = strlen($estateRaport);
imagettftext($image, 25, 0, 538-(18+$strlenEstateRaport)*8, 240, $black, "tahoma.ttf", 'DZIENNIK PRAC DLA ' . $estateRaport);
imagettftext($image, 20, 0, 320, 280, $black, "tahoma.ttf", 'Zakres od ' . date("d-m-Y", $dateStartRaport)." do ".date("d-m-Y", $dateStopRaport));
$sameDay = "";
$sameName = "";
foreach ($contentRaport as $news) {
    if ($news[6] == 0) {
        if ((strtotime($news[2]) >= $dateStartRaport) && (strtotime($news[2]) <= $dateStopRaport)) { 
            //warunek zakresu dat



            // $pieces = count(explode("\n", $news[3]));
            if ($news[2] != $sameDay) {
                imagettftext($image, 17, 0, 130, $i + 30, $black, "tahoma.ttf", $news[2]);
                $sameName = "";
            } else $i -= 50;
            if ($news[9] != $sameName) imagettftext($image, 15, 0, 150, $i + 60, $black, "tahoma.ttf", 'Technik ' . $news[9] . ' wykonał:');
            else $i -= 30;
            // $pieces = count(explode("\n ", $news[3]));
            $i = $i + 60;
            $newContent = explode("\n", $news[3]);
            foreach ($newContent as $el) {
            imagettftext($image, 12, 0, 170, $i + 20, $black, "tahoma.ttf", "* " . $el."/".$i);
            // imagettftext($image, 12, 0, 170, $i + 20, $black, "tahoma.ttf", "* " . $el."/".strlen($el));
            $i += 20;
            }
            $i += 20;
            // $i += 100;
            // $i += 70 + $pieces * 20;
            $sameDay = $news[2];
            $sameName = $news[9];
// 1300 = i


        } //warunek zakresu dat
    }
}

header('Content-Type: image/jpeg');

imagejpeg($image, "../img/" . $newNameFileRaport);
ImageDestroy($image);
// echo '<img src="PapierFirmowy.JPG">';

echo json_encode(array("color" => 'red', "raportEstate" => $newNameFileRaport, "contentRaport" => $contentRaport));

// header('Location: ../index.php' );
