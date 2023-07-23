<?php

$estateRaport = $_POST['EstateRaport'];
$contentRaport = $_POST['ContentRaport'];
$dateStartRaport = strtotime($_POST['DateStartRaport']);
$dateStopRaport = strtotime($_POST['DateStopRaport']);
$newNameFileRaport = "Dziennik Prac " . $estateRaport . "_" . strtotime(date("Y-m-d, H:i:s"));
$strlenEstateRaport = strlen($estateRaport);

$sameDay = "";
$sameName = "";
$images = [];
$images[0] = imagecreatefromjpeg('https://hc24.com.pl/FakturyHC24/img/PapierFirmowy.jpg');
$black = imagecolorallocate($images[0], 0, 0, 0);
$strlenEstateRaport = strlen($estateRaport);
imagettftext($images[0], 25, 0, 538 - (18 + $strlenEstateRaport) * 8, 240, $black, "tahoma.ttf", 'DZIENNIK PRAC DLA ' . $estateRaport);
imagettftext($images[0], 20, 0, 320, 280, $black, "tahoma.ttf", 'Zakres od ' . date("d-m-Y", $dateStartRaport) . " do " . date("d-m-Y", $dateStopRaport));
$i = 300;
$page = 1;
// $lastPage = 1;

foreach ($contentRaport as $news) {
    if ($news[6] == 0) {
        // nie usunięte

        // if ($page == $lastPage && $page != 1) {
        // $images[$page] = imagecreatefromjpeg('https://hc24.com.pl/FakturyHC24/img/PapierFirmowy.jpg');
        // $image = imagecreatefromjpeg('https://hc24.com.pl/FHC24/img/PapierFirmowy.jpg');
        // $image = imagecreatefromjpeg('http://localhost/FakturyHC24/img/PapierFirmowy.jpg');
        // header('Content-Type: image/jpeg');
        // https://hc24.com.pl/FHC24/#newscastSection
        // $lastPage += 1;
        // $black = imagecolorallocate($image, 0, 0, 0);
        // }


        // $black = imagecolorallocate($image, 0, 0, 0);
        // if ($page == 1) {
            // $i = 300;
            // $strlenEstateRaport = strlen($estateRaport);
            // imagettftext($images[$page], 25, 0, 538 - (18 + $strlenEstateRaport) * 8, 240, $black, "tahoma.ttf", 'DZIENNIK PRAC DLA ' . $estateRaport);
            // imagettftext($images[$page], 20, 0, 320, 280, $black, "tahoma.ttf", 'Zakres od ' . date("d-m-Y", $dateStartRaport) . " do " . date("d-m-Y", $dateStopRaport));
            // $page += 1;
        // } else {
            // $i = 200;
            // $lastPage += 1;
        // }

        // foreach ($contentRaport as $news) {
        //     if ($news[6] == 0) {
        if ((strtotime($news[2]) >= $dateStartRaport) && (strtotime($news[2]) <= $dateStopRaport)) {
            //warunek zakresu dat



            // $pieces = count(explode("\n", $news[3]));
            if ($news[2] != $sameDay) {
                imagettftext($images[$page-1], 17, 0, 130, $i + 30, $black, "tahoma.ttf", $news[2]);
                $sameName = "";
            } else $i -= 50;
            if ($news[9] != $sameName) imagettftext($images[$page-1], 15, 0, 150, $i + 60, $black, "tahoma.ttf", 'Technik ' . $news[9] . ' wykonał:');
            else $i -= 30;
            // $pieces = count(explode("\n ", $news[3]));
            $i = $i + 60;
            $newContent = explode("\n", $news[3]);
            foreach ($newContent as $el) {
                imagettftext($images[$page-1], 12, 0, 170, $i + 20, $black, "tahoma.ttf", "* " . $el . "/" . $i);
                // imagettftext($image, 12, 0, 170, $i + 20, $black, "tahoma.ttf", "* " . $el."/".strlen($el));
                $i += 20;
            }
            $i += 20;
            // $i += 100;
            // $i += 70 + $pieces * 20;
            $sameDay = $news[2];
            $sameName = $news[9];
            // 1300 = i
            if ($i >= 1260) {
                $i = 200;
                header('Content-Type: image/jpeg');
                imagejpeg($images[$page - 1], "../img/" . $newNameFileRaport . " str_" . $page . ".jpg");
                // sleep(3);
                ImageDestroy($images[$page - 1]);
                $images[$page] = imagecreatefromjpeg('https://hc24.com.pl/FakturyHC24/img/PapierFirmowy.jpg');
                // sleep(3);
                $page += 1;
                // $i = 200;
            }
        } //warunek zakresu dat
    } // nie usunięte
}

header('Content-Type: image/jpeg');
imagejpeg($images[$page - 1], "../img/" . $newNameFileRaport . " str_" . $page . ".jpg");
ImageDestroy($images[$page - 1]);

echo json_encode(array("color" => 'red', "raportEstate" => $newNameFileRaport . " str_1.jpg", "contentRaport" => $contentRaport));

// header('Location: ../index.php' );
