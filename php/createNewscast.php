<?php

$image = imagecreatefromjpeg('https://hc24.com.pl/FHC24/PapierFirmowy.JPG');
header('Content-Type: image/jpeg');
// https://hc24.com.pl/FHC24/#newscastSection

$r = 0;
$g = 0;
$b = 0;
$blue1 = imagecolorallocate($image, 200, 155, 120);
$blue2 = imagecolorallocate($image, 200, 215, 255);
$blue3 = imagecolorallocate($image, 115, 15, 55);
// imagettftext($image, 90, 500, 500, 'Geeks fo  rGe eks', $blue);
ImageString($image, 300, 100, 140, 'Geeks gfg gf  f  fdgfd fo  rGe eks', $blue1);
ImageString($image, 200, 110, 190, 'eveve vrvrt trbrbrtb brb btrybty bytytb ', $blue2);
ImageString($image, 100, 120, 240, 'Kkdckcr vvelvero k kr g k k kkk fg dl lgf fgl gf ', $blue3);
header('Content-Type: image/jpeg');

imagejpeg($image, "../PapierFirmowy.JPG");
ImageDestroy($image);
// echo '<img src="PapierFirmowy.JPG">';

header('Location: ../index.php' );
