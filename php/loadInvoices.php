<?php

$nick = $_POST['Nick'];
$quantity = $_POST['Quantity'];

require_once "connect.php";


$sqlQuery = ($nick !== "ALL") ? "SELECT * FROM `".$tb_invoices."` WHERE `WhoUpload`='".$nick."' ORDER BY UploadDate DESC LIMIT %s;" : "SELECT * FROM `".$tb_invoices."` ORDER BY UploadDate DESC LIMIT %s;";


$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
	echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
	$nick = htmlentities($nick, ENT_QUOTES, "UTF-8");
	if ($result = @$connection->query(sprintf(
		// "SELECT * FROM `invoices` WHERE `WhoUpload`='%s' ORDER BY UploadDate DESC LIMIT %s;",
		// "SELECT * FROM `invoices` WHERE `WhoUpload`='rburek' ORDER BY UploadDate DESC LIMIT %s;",
		$sqlQuery,
		// mysqli_real_escape_string($connection, $nick),
		mysqli_real_escape_string($connection, $quantity)
	))) {
		$invoices = [];
		while ($row = $result->fetch_row()) {
			@$pathplik = str_replace("php/loadInvoices.php", "invoiceFiles/" . $row[1], $_SERVER['SCRIPT_FILENAME']);
			if (file_exists($pathplik)) {
				$colorFile = 'lime';
			} else {
				$colorFile = 'red';
			}
			if ($resultInfo = @$connection->query(sprintf(
				"SELECT * FROM `%s` WHERE `Idinvoice`='%s';",
				mysqli_real_escape_string($connection, $tb_infoinvoices),
				mysqli_real_escape_string($connection, $row[0])
			))) {
				$infoInvoices = [];
				while($rowInfo = $resultInfo->fetch_row()){
					$infoLine = [$rowInfo[4],$rowInfo[3]];
					// array_push($infoInvoices,$rowInfo);
					array_push($infoInvoices,$infoLine);
				}
				array_push($row,$infoInvoices);
				array_push($row,$colorFile);
			}
			array_push($invoices, $row);
		}
		echo json_encode($invoices);
	}
	$connection->close();
}
