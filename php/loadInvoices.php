<?php

$nick = $_POST['Nick'];
// $quantity = $_POST['Quantity'];
$right = $_POST['Right'];

require_once "connect.php";

switch ($right) {
	case "Administrator":
		// $sqlQuery = "SELECT * FROM `".$tb_invoices."` ORDER BY UploadDate DESC LIMIT %s;";
		$sqlQuery = "SELECT * FROM `".$tb_invoices."` ORDER BY UploadDate DESC;";
	  break;
	case "Pracownik":
		// $sqlQuery = "SELECT * FROM `".$tb_invoices."` WHERE `WhoUpload`='".$nick."' AND `IsDel`= 0 ORDER BY UploadDate DESC LIMIT %s;";
		$sqlQuery = "SELECT * FROM `".$tb_invoices."` WHERE `WhoUpload`='".$nick."' AND `IsDel`= 0 ORDER BY UploadDate DESC;";
		// $sqlQuery = "SELECT * FROM `".$tb_invoices."` WHERE `WhoUpload`='".$nick."' ORDER BY UploadDate DESC LIMIT %s;";
	  break;
	case "Szef":
		// $sqlQuery = "SELECT * FROM `".$tb_invoices."` ORDER BY UploadDate DESC LIMIT %s;";
		$sqlQuery = "SELECT * FROM `".$tb_invoices."` ORDER BY UploadDate DESC";
	  break;
	  case "Księgowy":
		// $sqlQuery = "SELECT * FROM `".$tb_invoices."` ORDER BY UploadDate DESC LIMIT %s;";
		$sqlQuery = "SELECT * FROM `".$tb_invoices."` ORDER BY UploadDate DESC;";
		break;
	// default:
	// $sqlQuery = "SELECT * FROM `".$tb_invoices."` WHERE `WhoUpload`='".$nick."' ORDER BY UploadDate DESC LIMIT %s;";
  }


// $sqlQuery = ($nick !== "ALL") ? "SELECT * FROM `".$tb_invoices."` WHERE `WhoUpload`='".$nick."' ORDER BY UploadDate DESC LIMIT %s;" : "SELECT * FROM `".$tb_invoices."` ORDER BY UploadDate DESC LIMIT %s;";


$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
	echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
	$nick = htmlentities($nick, ENT_QUOTES, "UTF-8");
	if ($result = @$connection->query(
		// sprintf(
		// "SELECT * FROM `invoices` WHERE `WhoUpload`='%s' ORDER BY UploadDate DESC LIMIT %s;",
		// "SELECT * FROM `invoices` WHERE `WhoUpload`='rburek' ORDER BY UploadDate DESC LIMIT %s;",
		$sqlQuery
		// mysqli_real_escape_string($connection, $nick),
		// mysqli_real_escape_string($connection, $quantity)
	// )
	)) {
		$invoices = [];
		while ($row = $result->fetch_row()) {
			@$pathplik = str_replace("php/loadInvoices.php", "invoiceFiles/" . $row[1], $_SERVER['SCRIPT_FILENAME']);
			if (file_exists($pathplik)) {
				$colorFile = 'lime';
			} else {
				$colorFile = 'red';
			}
			if ($resultInfo = @$connection->query(sprintf(
				// "SELECT * FROM `%s` WHERE `Idinvoice`='%s';",
				// "SELECT * FROM `%s` WHERE `Idinvoice`='%s' ORDER BY `ItemInvoice` DESC, `OrDel` DESC;",
				"SELECT * FROM `%s` WHERE `Idinvoice`='%s' ORDER BY `OrDel` DESC, `ItemInvoice` DESC;",
				mysqli_real_escape_string($connection, $tb_infoinvoices),
				mysqli_real_escape_string($connection, $row[0])
			))) {
				$infoInvoices = [];
				while($rowInfo = $resultInfo->fetch_row()){
					if ($rowInfo[8]==0)	$infoLine = [$rowInfo[4], $rowInfo[3], 'yellow'];
					else $infoLine = [$rowInfo[4], $rowInfo[3], 'red'];
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
