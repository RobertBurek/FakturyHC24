<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/1085229b76.js" crossorigin="anonymous"></script>
    <script>
        document.write('<link rel="stylesheet" href="css/style.css?ver=' + Math.floor(Math.random() * 1000) + '"\>');
    </script>
    <title>FakturyHC24</title>
</head>

<body>

    <form action="./php/sendInvoice.php" method="POST" ENCTYPE="multipart/form-data">
        <p><input name="contentMail"></input>Kilka zdań o sobie</p>
        <p>
            <input type="file" name="plik" />Plik do wysłania (pdf, jpg)
        </p>
        <button type="submit">Wyślij</button>
    </form>

    <script src="./js/jquery.min.js"></script>
</body>

</html>