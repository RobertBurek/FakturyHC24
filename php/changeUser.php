<?php

$changeNick = $_POST['ChangeNick'];

switch ($changeNick) {
    case 'robertB':
        echo json_encode(array("nick" => 'rburek', "nameUser" => 'Robert', "rightUser" => 'Administrator'));
        break;
    case 'robertK':
        echo json_encode(array("nick" => 'rkordonski', "nameUser" => 'Robert', "rightUser" => 'Administrator'));
        break;
    case 'przemekM':
        echo json_encode(array("nick" => 'pmichalak', "nameUser" => 'Przemysław', "rightUser" => 'Administrator'));
        break;
    case 'sylwekZ':
        echo json_encode(array("nick" => 'szmuda', "nameUser" => 'Sylwester', "rightUser" => 'Administrator'));
        break;
    case 'grzesiekS':
        echo json_encode(array("nick" => 'gsiedlecki', "nameUser" => 'Grzegorz', "rightUser" => 'Administrator'));
        break;
}
