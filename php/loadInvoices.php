<?php

$nick = $_POST['Nick'];
$quantity = $_POST['Quantity'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
	echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
	$nick = htmlentities($nick, ENT_QUOTES, "UTF-8");
	if ($result = @$connection->query(sprintf(
		"SELECT * FROM `invoices` WHERE `WhoUpload`='%s' ORDER BY UploadDate DESC LIMIT %s;",
		mysqli_real_escape_string($connection, $nick),
		mysqli_real_escape_string($connection, $quantity)
	))) {
		$invoices = [];
		while ($row = $result->fetch_row()) {
			if ($resultInfo = @$connection->query(sprintf(
				"SELECT * FROM `infoinvoices` WHERE `Idinvoice`='%s';",
				mysqli_real_escape_string($connection, $row[0])
			))) {
				$infoInvoices = [];
				while($rowInfo = $resultInfo->fetch_row()){
					$infoLine = [$rowInfo[4],$rowInfo[3]];
					// array_push($infoInvoices,$rowInfo);
					array_push($infoInvoices,$infoLine);
				}
				array_push($row,$infoInvoices);
			}
			array_push($invoices, $row);
		}
		echo json_encode($invoices);
	}
	$connection->close();
}
