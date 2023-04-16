<?php

$nameUser = $_POST['NameUser'];
$nick = $_POST['Nick'];
$passwordOld = $_POST['PasswordOld'];
$password = $_POST['Password'];
$passwordTwo = $_POST['PasswordTwo'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
    $nick = htmlentities($nick, ENT_QUOTES, "UTF-8");
    $passwordHashOld = password_hash($passwordOld, PASSWORD_DEFAULT);
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    if ($password == $passwordTwo) {
        if ($result = @$connection->query(sprintf(
            "SELECT * FROM `%s` WHERE `Nick`='%s'",
            mysqli_real_escape_string($connection, $tb_users),
            mysqli_real_escape_string($connection, $nick)
        ))) {
            $rows_login = $result->num_rows;
            if ($rows_login > 0) {
                $row = $result->fetch_assoc();
                // $nick = htmlentities($row['Nick'], ENT_QUOTES, "UTF-8");
                if (password_verify($passwordOld, $row['Password'])) {
                    $resultSave = @$connection->query(sprintf(
                        "UPDATE `%s` SET `Password` = '%s' WHERE `users`.`Nick` = '%s'",
                        mysqli_real_escape_string($connection, $tb_users),
                        mysqli_real_escape_string($connection, $passwordHash),
                        mysqli_real_escape_string($connection, $nick)
                    ));
                    echo json_encode(array("nick" => $nick, "error" => "Hasło zmienione !!!"));
                } else {
                    echo json_encode(array("error" => "Błędne stare hasło !!!"));
                }
            } else {
                echo json_encode(array("error" => "Błędny użytkowmik !!!"));
            }
        }
    } else {
        echo json_encode(array("nick" => $nick, "error" => 'Hasła się różnią !!!'));
    }
    $connection->close();
}
