<?php

$nameUser = $_POST['NameUser'];
$nameFile = $_POST['NameFile'];
// $content = $_POST['ContentMail'];

srand((float)microtime() * 1000000);
$znacznik = md5(uniqid(rand()));

// $nick = htmlentities($nick, ENT_QUOTES, "UTF-8");ENT_SUBSTITUTE
$nick = htmlentities($nick, ENT_SUBSTITUTE, "UTF-8");

// dane o odbiorcy, nadawcy i załączniku
$odbiorca1 = "robert.burek@hc24.com.pl";
$odbiorca2 = "wiktor.smoktunowicz@gmail.com";
// $odbiorca = "robert.burek@hc24.com.pl";
// $odbiorca1 = "robertburek@wp.pl";
$contentTitle = "Allegro dla HC24 od ".$nameUser;
$titleMail = '=?UTF-8?B?'.base64_encode($contentTitle).'?=';
// $nadawca_imie = $nick;
$nickName = str_replace(array('ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'), array('a', 'c', 'e', 'l', 'n', 'o', 's', 'z', 'z'), $nameUser);
$nadawca_imie = $nickName;
// $nadawca_imie = '=?UTF-8?B?'.base64_encode($$nick).'?=';
// $nadawca_email = "appNet HC24";
$nadawca_imie = $nickName." - appNet HC24";
$nadawca_email = "robert.burek@hc24.com.pl";
// $plik = "logo.gif";
// $plik = "add.gif";
// $plik = $_FILES['plik']['name'];
// $plik = $_POST['plik'];
// $typpliku = "image/gif";
// $typpliku = "application/pdf";
$typpliku = "image/jpeg";
// $nazwapliku = "mojelogo.pdf";
// $nazwapliku = $_FILES['plik']['name'];
$nazwapliku = $nameFile;
// $nazwapliku = $plik;
// $content = $_POST['contentMail'];

// treść listu
$tresclistu = '
Dzień dobry, 
w załączniu przesyłam dane sprzedającego z Allegro.

Pozdrawiam
' . $nameUser;

// definicja nagłówków
// $naglowki  = "From: $nadawca_imie <$nadawca_email>\n";
// $naglowki  = "From: $nadawca_imie <$nadawca_email>rn";
$naglowki  = "From: $nadawca_imie <$nadawca_email>\n";
$naglowki .= "MIME-Version: 1.0\n";
$naglowki .= "Content-Type: multipart/mixed;\n";
$naglowki .= "\tboundary=\"___$znacznik==\"";

// nagłówki listu
$tresc = "--___$znacznik==\n";
// $tresc .="Content-Type: text/plain; charset=utf-8\r\n";
$tresc .= "Content-Type: text/plain; charset=utf-8\r\n";
$tresc .= "Content-Transfer-Encoding: 8bit\n";
$tresc .= "\n$tresclistu\n";

// nagłówki i obsługa załącznika
$tresc .= "--___$znacznik==\n";
// $tresc .="Content-Type: $typpliku\n";
$tresc .= "Content-Type: image/jpeg\n";
$tresc .= "Content-Disposition: attachment;\n";
$tresc .= " filename=\"$nazwapliku\"\n";
$tresc .= "Content-Transfer-Encoding: base64\n\n";
@$pathplik = str_replace("php/sendMailAllegro.php", "invoiceFiles/" . $nazwapliku, $_SERVER['SCRIPT_FILENAME']);
// $f = fopen($_FILES['plik']['tmp_name'],"r");
// $f = fopen("./invoiceFiles/".$nazwapliku,"r");
// $dane = fread($f,"./invoiceFiles/".$nazwapliku);
// $f = fopen($pathplik,"r");
// $dane = fread($f,$pathplik);
if (file_exists($pathplik)) {
@$f = fopen($pathplik, "r");
@$dane = fread($f, filesize($pathplik));
@fclose($f);
@$tresc .= chunk_split(base64_encode($dane));
$tresc .= "--___$znacznik==--\n";

// wysłanie listu
@mail($odbiorca1, $titleMail, $tresc, $naglowki);
// @mail($odbiorca2, $titleMail, $tresc, $naglowki);

echo json_encode(array("nick" => $nameUser, "error" => 'zrobione - mail wysłany'));
} else {
    $tresc .= "--___$znacznik==--\n";
    $tresc = "Nie ma pliku !!!\n";
    @mail($odbiorca1, $titleMail, $tresc, $naglowki);
    echo json_encode(array("nick" => $nameUser, "error" => 'NIE zrobione - Nie ma pliku !!!'));
}

// header('Location: ' . $_SERVER['HTTP_REFERER'] . '#contact');
// header('Location: index.php' );
