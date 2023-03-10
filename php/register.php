<?php

$nick = $_POST['Nick'];
$password = $_POST['Password'];
$passwordTwo = $_POST['PasswordTwo'];
$nameUser = $_POST['NameUser'];
$surnameUser = $_POST['SurnameUser'];
$rightUser = $_POST['RightUser'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
    $nick = htmlentities($nick, ENT_QUOTES, "UTF-8");
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

if ($password==$passwordTwo){

    if ($connection->query(sprintf(
        "INSERT INTO `users` (`Nick`, `NameUser`, `SurnameUser`, `Password`, `RightUser`) VALUES ('%s', '%s', '%s', '%s', '%s');",
        mysqli_real_escape_string($connection, $nick),
        mysqli_real_escape_string($connection, $nameUser),
        mysqli_real_escape_string($connection, $surnameUser),
        mysqli_real_escape_string($connection, $passwordHash),
        mysqli_real_escape_string($connection, $rightUser)
    ))) {
        // $connection->query(sprintf(
        //     "CREATE TABLE `%s`.`%s` (
        //         `Word` varchar(9) COLLATE utf8_polish_ci NOT NULL,
        //         `Level` int(11) NOT NULL,
        //         `Attempt` int(11) NOT NULL,
        //         `IsCategory` tinyint(1) NOT NULL,
        //         `IsOnlyWord` tinyint(1) NOT NULL,
        //         `Points` int(11) NOT NULL,
        //         PRIMARY KEY (`Word`)
        //       ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;",
        //     mysqli_real_escape_string($connection, $db_name),
        //     mysqli_real_escape_string($connection, $nameTable)
        // ));
        echo json_encode(array("nick" => $nick, "right" => $rightUser, "error" => 'zapisany !!!'));
    } else {
        echo json_encode(array("nick" => $nick, "error" => 'Istnieje już taki LOGIN !!!'));
    }
} else {
    echo json_encode(array("nick" => $nick, "error" => 'Hasła się różnią !!!'));
}

    $connection->close();
}

