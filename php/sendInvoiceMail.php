<?php

$nick = $_POST['Nick'];
$nameFile = $_POST['NameFile'];
$content = $_POST['contentMail'];

srand((float)microtime() * 1000000);
$znacznik = md5(uniqid(rand()));

// $nick = htmlentities($nick, ENT_QUOTES, "UTF-8");ENT_SUBSTITUTE
$nick = htmlentities($nick, ENT_SUBSTITUTE, "UTF-8");

// dane o odbiorcy, nadawcy i załączniku
$odbiorca = "robert.burek@hc24.com.pl";
// $odbiorca = "robertburek@wp.pl";
$contentTitle = "Faktura HC24 od ".$nick;
$titleMail = '=?UTF-8?B?'.base64_encode($contentTitle).'?=';
// $nadawca_imie = $nick;
$nick = str_replace(array('ą', 'ć', 'ę', 'ł', 'ń', 'ó', 'ś', 'ź', 'ż'), array('a', 'c', 'e', 'l', 'n', 'o', 's', 'z', 'z'), $nick);
$nadawca_imie = $nick;
// $nadawca_imie = '=?UTF-8?B?'.base64_encode($$nick).'?=';
// $nadawca_email = "appNet HC24";
$nadawca_imie = $nick." - appNet HC24";
$nadawca_email = "robertburek@wp.pl";
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
Dzień dobry, w załączniu faktura HC24.
Wydatkowane środki należy przypisać:
' . $content . '

Pozdrawiam
' . $nick;

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
@$pathplik = str_replace("php/sendInvoiceMail.php", "invoiceFiles/" . $nazwapliku, $_SERVER['SCRIPT_FILENAME']);
// $f = fopen($_FILES['plik']['tmp_name'],"r");
// $f = fopen("./invoiceFiles/".$nazwapliku,"r");
// $dane = fread($f,"./invoiceFiles/".$nazwapliku);
// $f = fopen($pathplik,"r");
// $dane = fread($f,$pathplik);
@$f = fopen($pathplik, "r");
@$dane = fread($f, filesize($pathplik));
@fclose($f);
@$tresc .= chunk_split(base64_encode($dane));
$tresc .= "--___$znacznik==--\n";

// wysłanie listu
@mail($odbiorca, $titleMail, $tresc, $naglowki);

echo json_encode(array("nick" => $nick, "error" => 'zrobione - mail wysłany'));

// header('Location: ' . $_SERVER['HTTP_REFERER'] . '#contact');
// header('Location: index.php' );
