<?php

$nameUser = $_POST['NameUser'];
$nameFile = $_POST['NameFile'];
$content = $_POST['ContentMail'];

require_once "connect.php";

srand((float)microtime() * 1000000);
$znacznik = md5(uniqid(rand()));

$nick = htmlentities($nick, ENT_SUBSTITUTE, "UTF-8");

$odbiorca1 = "robert.burek@hc24.com.pl";
$odbiorca2 = "ksiegowosc@hc24.com.pl";
$odbiorca3 = "ksiegowoschomecare24@wp.pl";
$contentTitle = "Faktura HC24 od " . $nameUser;
$titleMail = '=?UTF-8?B?' . base64_encode($contentTitle) . '?=';
// $titleMail = ''.base64_encode($contentTitle);
$nickName = str_replace(array('ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'), array('a', 'c', 'e', 'l', 'n', 'o', 's', 'z', 'z'), $nameUser);
$nadawca_imie = $nickName;
$nadawca_imie = $nickName . " - appNet HC24";
$nadawca_email = "robert.burek@hc24.com.pl";
$typpliku = "image/jpeg";

$contentLetter = '
Dzień dobry, w załączniu faktura HC24.
Wydatkowane środki należy przypisać:
' . $content .
    '
Pozdrawiam
' . $nameUser;

$unsentLetter .= "Nie ma pliku: " . $nameFile . "\n" .
    "Mail nie wysłany !!!\n" .
    'Faktura dotyczyła kosztów:
' . $content .
    '
Pozdrawiam
' . $nameUser;

$naglowki  = "From: $nadawca_imie <$nadawca_email>\n";
$naglowki .= "MIME-Version: 1.0\n";
$naglowki .= "Content-Type: multipart/mixed;\n";
$naglowki .= "\tboundary=\"___$znacznik==\"";

$tresc = "--___$znacznik==\n";
$tresc .= "Content-Type: text/plain; charset=utf-8\r\n";
$tresc .= "Content-Transfer-Encoding: 8bit\n";

@$pathplik = str_replace("php/sendInvoiceMail.php", "invoiceFiles/" . $nameFile, $_SERVER['SCRIPT_FILENAME']);
while(true){
    if (file_exists($pathplik)) {
        $tresc .= "\n$contentLetter\n";
        $tresc .= "--___$znacznik==\n";
        $tresc .= "Content-Type: image/jpeg\n";
        $tresc .= "Content-Disposition: attachment;\n";
        $tresc .= " filename=\"$nameFile\"\n";
        $tresc .= "Content-Transfer-Encoding: base64\n\n";
    
        @$f = fopen($pathplik, "r");
        @$dane = fread($f, filesize($pathplik));
        @fclose($f);
        @$tresc .= chunk_split(base64_encode($dane));
        $tresc .= "--___$znacznik==--\n";
    
        @mail($odbiorca1, $titleMail, $tresc, $naglowki);
        if ($all_mails) {
            @mail($odbiorca2, $titleMail, $tresc, $naglowki);
            @mail($odbiorca3, $titleMail, $tresc, $naglowki);
        }
        echo json_encode(array("nick" => $nameUser, "error" => 'zrobione - mail wysłany'));
        break;
    }
}