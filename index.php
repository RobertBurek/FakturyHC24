<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="img/favicon192_old2.png" sizes="192x192" type="image/png">
    <link rel="icon" href="img/favicon192_old2.png" sizes="192x192" type="image/png">

    <script src="https://kit.fontawesome.com/e5505724c8.js" crossorigin="anonymous"></script>
    <script>
        document.write('<link rel="stylesheet" href="./css/style.css?ver=' + Math.floor(Math.random() * 1000) + '"\>');
    </script>
    <title>FakturyHC24</title>
</head>

<body>

    <nav id="nav" class="nav">
        <div class="container-nav">
            <button class="bars-icon"><i class="fas fa-bars"></i></button>
            <div class="nav-items">
                <a href="#"><img class="logo-picture" src="./img/HC_24_2_big.png" alt="Logo firmy Home Care 24"></a>
                <a id="login" href="#loginSection">Login</a>
                <a href="#invoices">Faktury</a>
                <a id="raport" href="#">Raport</a>
            </div>
        </div>
    </nav>

    <!-- <header class="header">
        <div class="header-bg"></div>
        <div class="header-text">
            <img src="./img/HC_24_2_big.png" alt="Logo Home Care 24">
            <h1>Home <span>Care 24</span></h1>
            <p>Obsługa techniczna nieruchomości</p>
        </div>
    </header> -->
    <section id="loginSection" class="container start shadow hide">
        <!-- <h2 class="section-title">LOGOWANIE</h2> -->
        <div class="logging" name="contacts" logging>
            <label class="dropdown-login hide" logging>Nazwa (login):
                <input type="text" name="nick" placeholder="" logging></label>
            <label class="dropdown-login hide" logging>Imię:
                <input type="text" name="nameUser" placeholder="" logging></label>
            <label class="dropdown-login hide" logging>Nazwisko:
                <input type="text" name="surnameUser" placeholder="" logging></label>
            <label class="dropdown-password hide" logging>Stare hasło:
                <input type="password" name="passwordOld" placeholder="" logging></label>
            <label class="dropdown-password hide" logging>Hasło:
                <input type="password" name="password" placeholder="" logging></label>
            <label id="password2" class="dropdown-password hide" logging>Ponów hasło :
                <input type="password" name="passwordTwo" placeholder="" logging></label>
            <label class="dropdown-login hide" logging>Uprawnienia:
                <input type="text" name="rightUser" placeholder="" logging></label>
            <label class="dropdown-login hide" logging>Osiedle:
                <input type="text" name="newObject" placeholder="" logging></label>
        </div>
        <div id="lower" class="lower">
            <button class="normal reg-log-btn register-btn hide" dropdown>Rejestruj</button>
            <button class="normal reg-log-btn change-btn hide" dropdown>Zmień hasło</button>
            <button class="normal reg-log-btn save-btn hide" dropdown>Zapis</button>
            <!-- <button class="normal reg-log-btn save-btn hide">Zapisz</button> -->
            <button class="normal reg-log-btn login-btn hide" autofocus>Zaloguj</button>
            <!-- <button class="normal reg-log-btn save-btn hide">Zapisz</button> -->
        </div>
        <!-- </div> -->
        <!-- <hr> -->
        <div id="logout" class="lower hide">
            <hr>
            <button class="normal reg-log-btn logout-btn">Wyloguj</button>
        </div>
        <div id="infoError"></div>
    </section>
    <main>
        <section id="invoice" class="invoice container shadow">
            <h2 class="section-title hide" id="fakturaH2" >FAKTURA</h2>
            <p id="nameFile" class="whose-info"></p>
            <img id="invoiceImg" src="" alt="Wczytana faktura">


            <div class="inputs">
                <div class="inputFile">
                    <form id="formNewInvoiceFile" action="./php/saveFile.php" method="post" enctype="multipart/form-data">
                        <button class="source">
                            <i class="fas fa-folder-open"></i>
                            <p>PLIK</p>
                            <input id="newInvoiceFile" type="file" name="plik" />
                        </button>
                    </form>
                </div>

                <div class="inputFoto">
                    <form id="formNewInvoiceFoto" action="./php/saveFile.php" method="post" enctype="multipart/form-data">
                        <button class="source">
                            <i class="fas fa-camera"></i>
                            <p>APARAT</p>
                            <input id="newInvoiceFoto" type="file" capture="environment" accept="image/*" enctype="multipart/form-data" name="plik" />
                        </button>
                    </form>

                </div>
            </div>


        </section>
        <section id="whoseCosts" class="whose container shadow hide">
            <div class="sendMail">
            <button class="normal reg-log-btn sendMail-btn">Wyślij mail</button>
            <h2 class="sendMail-title">Czyje koszty</h2>
            </div>
            <div id="listCostsObject">
            </div>
        </section>
        <!-- <section id="ask-offer" class="container shadow"> -->
        <!-- <section id="" class="container shadow">
            <form method="post" enctype="multipart/form-data">
                    <div>
                      <label for="image_uploads">Nowe faktura</label>
                      <input
                        type="file"
                        id="image_uploads"
                        name="image_uploads"
                         
                        />
                    </div>
                    <div class="preview">
                      <p>No files currently selected for upload</p>
                    </div>
                    <div>
                      <button>Submit</button>
                    </div>
            </form>
        </section> -->
        <br>
        <section id="contact" class="contact container shadow">
            <h2 class="section-title">Kontakt</h2>
            <div class="section-title">
                <h3><i class="fas fa-phone"></i> +48 607 907 022</h3>
                <h3><i class="fas fa-at"></i> robert.burek@hc24.com.pl</h3>
                <br>
                <h3>ul. Nowoursynowska 145D / 96</h3>
                <h3>02-776 Warszawa</h3>
            </div>
        </section>

    </main>

    <footer id="footer" class="footer">
        <div class="footer-text">
            <a href="http://robertburek.pl" target="_blank" rel="noopener noreferrer">
                <p>&copy; 2023 Robert Burek</p>
            </a>
        </div>
    </footer>

    <script src="./js/jquery.min.js"></script>
    <script>
        document.write('<script src="./js/app.js?ver=' + Math.floor(Math.random() * 10000) + '" type="module"\><\/script>');
        // document.write('<script src="./js/dropdown.js?ver=' + Math.floor(Math.random() * 10000) + '" type="module"\><\/script>');
    </script>
</body>

</html>