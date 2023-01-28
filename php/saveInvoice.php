<?php

$nameTable = $_POST['nameTable'];
$word = $_POST['word'];
$level = $_POST['level'];
$attempt = $_POST['attempt'];
$isCategory = ($_POST['isCategory'] == "true") ? '1' : '0';
$isOnlyWord = ($_POST['isOnlyWord'] == "true") ? '1' : '0';
$points = $_POST['points'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {

    if (
        $connection->query(sprintf(
            "INSERT INTO `%s` (`Word`, `Level`, `Attempt`, `IsCategory`, `IsOnlyWord`, `Points`) VALUES ('%s', '%s', '%s', '%s', '%s', '%s');",
            mysqli_real_escape_string($connection, $nameTable),
            mysqli_real_escape_string($connection, $word),
            mysqli_real_escape_string($connection, $level),
            mysqli_real_escape_string($connection, $attempt),
            mysqli_real_escape_string($connection, $isCategory),
            mysqli_real_escape_string($connection, $isOnlyWord),
            mysqli_real_escape_string($connection, $points)
        ))
    ) {
        $resultLevel = $connection->query(sprintf(
            "SELECT COUNT(*) FROM `%s` WHERE `%s`.`Level` = '%s';",
            mysqli_real_escape_string($connection, $nameTable),
            mysqli_real_escape_string($connection, $nameTable),
            mysqli_real_escape_string($connection, $level)
        ));

        $countLevel = $resultLevel->fetch_assoc();
        echo json_encode(array(
            "result" => $countLevel['COUNT(*)'],
            "level" => $level,
            "error" => 'Zapisano słowo w bazie gracza !!!',
            // "nameTable" => $nameTable,
            // "word" => $word,
            // "attempt" => $attempt,
            // "isCategory" => $isCategory,
            // "isOnlyWord" => $isOnlyWord,
            "points" => $points
        ));
    } else {
        echo json_encode(array("word" => $word, "error" => 'Słowo istniało już w bazie gracza !!!'));
    }

    $connection->close();
}
