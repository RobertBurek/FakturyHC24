<?php

$nameUser = $_POST['NameUser'];
$passwordOld = $_POST['PasswordOld'];
$password = $_POST['Password'];
$passwordTwo = $_POST['PasswordTwo'];

require_once "connect.php";

$connection = @new mysqli($host, $db_user, $db_password, $db_name);
if ($connection->connect_errno != 0) {
    echo "Error: " . $connection->connect_errno . " Opis: " . $connection->connect_error;
} else {
    $nameUser = htmlentities($nameUser, ENT_QUOTES, "UTF-8");
    $passwordHashOld = password_hash($passwordOld, PASSWORD_DEFAULT);
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    if ($password == $passwordTwo) {

        if ($result = @$connection->query(sprintf(
            // "SELECT * FROM `users` WHERE Nick='%s'",
            // "SELECT * FROM `users` WHERE `Password`='%s'",
            // "SELECT * FROM `users` WHERE `NameUser`='%s'",
            // mysqli_real_escape_string($connection, $nameUser)
            "SELECT * FROM `users` WHERE `NameUser`='%s'",
            mysqli_real_escape_string($connection, $nameUser)
        ))) {
            $rows_login = $result->num_rows;
            if ($rows_login > 0) {
                $row = $result->fetch_assoc();
                $nick = htmlentities($row['Nick'], ENT_QUOTES, "UTF-8");
                // $nick = htmlentities($nick, ENT_QUOTES, "UTF-8");

                // echo json_encode(array("nick" => $nick, "error" => "Nick jest OK !!!"));

                if (password_verify($passwordOld, $row['Password'])) {
                    // $result->free_result();
                    // echo json_encode(array("nick" => $row['Nick'], "nameUser" => $row['NameUser'], "rightUser" => $row['RightUser']));
    
                    $resultSave = @$connection->query(sprintf(
                        "UPDATE `users` SET `Password` = '%s' WHERE `users`.`Nick` = '%s'",
                        // "UPDATE `users` SET `Password` = '%s' WHERE `users`.`Password` = '%s'",
                        mysqli_real_escape_string($connection, $passwordHash),
                        mysqli_real_escape_string($connection, $nick)
                        // mysqli_real_escape_string($connection, $passwordHashOld)
                    ));
                    echo json_encode(array("nick" => $nick, "error" => "Hasło zmienione !!!"));
    
                    // UPDATE `invoices` SET `NameFile` = '6na455.JPG' WHERE `invoices`.`IdInvoice` = 'robert/2023/02/26/23:31:42';
                
                } 
                // else {
                //     echo json_encode(array("error" => "Błędne hasło OLD !!!"));
                // }
            } else {
                echo json_encode(array("error" => "Błędny użytkowmik !!!"));
            }
        }
    // }






    //     if ($connection->query(sprintf(
    //         "INSERT INTO `users` (`Nick`, `NameUser`, `SurnameUser`, `Password`, `RightUser`) VALUES ('%s', '%s', '%s', '%s', '%s');",
    //         mysqli_real_escape_string($connection, $nick),
    //         mysqli_real_escape_string($connection, $nameUser),
    //         mysqli_real_escape_string($connection, $surnameUser),
    //         mysqli_real_escape_string($connection, $passwordHash),
    //         mysqli_real_escape_string($connection, $rightUser)
    //     ))) {
    //         // $connection->query(sprintf(
    //         //     "CREATE TABLE `%s`.`%s` (
    //         //         `Word` varchar(9) COLLATE utf8_polish_ci NOT NULL,
    //         //         `Level` int(11) NOT NULL,
    //         //         `Attempt` int(11) NOT NULL,
    //         //         `IsCategory` tinyint(1) NOT NULL,
    //         //         `IsOnlyWord` tinyint(1) NOT NULL,
    //         //         `Points` int(11) NOT NULL,
    //         //         PRIMARY KEY (`Word`)
    //         //       ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;",
    //         //     mysqli_real_escape_string($connection, $db_name),
    //         //     mysqli_real_escape_string($connection, $nameTable)
    //         // ));
    //         echo json_encode(array("nick" => $nick, "right" => $rightUser));
    //     } else {
    //         echo json_encode(array("nick" => $nick, "error" => 'Istnieje już taki LOGIN !!!'));
    //     }
    } else {
        echo json_encode(array("nick" => $nick, "error" => 'Hasła się różnią !!!'));
    }

    $connection->close();
}
