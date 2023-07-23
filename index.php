<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="hydraulik, elektryk, monter, konserwator, usługi konserwatorskie, serwis techniczny nieruchomości">
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
                <a id="invoices" href="#invoicesSection">Faktury</a>
                <a id="newscast" href="#newscastSection">Dziennik</a>
                <a id="raport" href="#">Raport</a>
            </div>
        </div>
    </nav>

    <section id="loginSection" class="container start shadow hide">
        <div class="logging" name="contacts">
            <label class="dropdown-login hide">Nazwa (login):
                <input type="text" name="nick" placeholder=""></label>
            <label class="dropdown-login hide">Imię:
                <input type="text" name="nameUser" placeholder=""></label>
            <label class="dropdown-login hide">Nazwisko:
                <input type="text" name="surnameUser" placeholder=""></label>
            <label class="dropdown-password hide">Stare hasło:
                <input type="password" name="passwordOld" placeholder=""></label>
            <label class="dropdown-password hide">Hasło:
                <input type="password" name="password" placeholder=""></label>
            <label id="password2" class="dropdown-password hide">Ponów hasło :
                <input type="password" name="passwordTwo" placeholder=""></label>
            <label class="dropdown-login hide">Uprawnienia:
                <input type="text" name="rightUser" placeholder=""></label>
            <label class="dropdown-login hide">Osiedle:
                <input type="text" name="newObject" placeholder=""></label>
        </div>
        <div id="lower" class="lower">
            <button class="normal reg-log-btn register-btn hide">Rejestruj</button>
            <button class="normal reg-log-btn change-btn hide">Zmień hasło</button>
            <button class="normal reg-log-btn save-btn hide">Zapis</button>
            <button class="normal reg-log-btn login-btn hide">Zaloguj</button>
        </div>
        <div id="logout" class="lower hide">
            <hr>
            <button class="normal reg-log-btn logout-btn">Wyloguj</button>
        </div>
        <div id="infoError"></div>
    </section>
    <main>
        <section id="invoiceSection" class="invoice container shadow hide">
            <h2 class="section-title hide" id="invoiceH2">FAKTURA</h2>
            <p id="nameFile" class="whose-info"></p>
            <img id="invoiceImg" src="" alt="Wczytana faktura Home Care 24">


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
            <div class="sendMail ">
                <button class="normal reg-log-btn sendMail-btn">Wyślij mail</button>
                <button class="normal reg-log-btn sendMailAllegro-btn hide">Wyślij Allegro</button>
                <h2 class="sendMail-title">Czyje koszty</h2>
            </div>
            <div id="listCostsObject">
            </div>
        </section>

        <section id="sortParametrs" class="invoices container shadow hide">
            <p class="sortParam">
                <label class="sortLabel">Osiedle:
                    <select id="nameObject" name="nameObject" class="selectEnabled">
                        <option>WSZYSTKIE</option>
                        <!-- <option>Al. Krakowska 291</option> -->
                        <option>Al. Krak 291 - GARAŻ</option>
                        <option>Al. Krak 291 - CZ.WSPÓLNE</option>
                        <option>Budrysów 11/13</option>
                        <option>Cybernetyki 4a</option>
                        <option>Cybernetyki 6</option>
                        <option>Dzielna 78</option>
                        <option>Grochowska 78</option>
                        <option>Kapelanów AK 1</option>
                        <option>Krzyżówki 36</option>
                        <option>Lucerny 93</option>
                        <option>KOSZTY HC24</option>
                        <option>Postępu 12</option>
                        <option>Polna 3</option>
                        <option>Promienna 33</option>
                        <option>Skoroszewska 4</option>
                        <option>Tobruku 38</option>
                        <option>Ziemowita 4</option>
                        <option>Ziemowita 4a</option>
                        <option>Wilanowska 105</option>
                    </select>
                </label>
            </p>
            <p class="sortParam">
                <label class="sortLabel">Pracownik:
                    <select id="nameUser" name="nameUser" class="selectEnabled">
                        <option>WSZYSCY</option>
                        <option value="jbiadun">Biaduń Jarosław</option>
                        <option value="rburek">Burek Robert</option>
                        <option value="rkordonski">Kordoński Robert</option>
                        <option value="pmichalak">Michalak Przemysław</option>
                        <option value="jmodrzejewska">Modrzejewska Julia</option>
                        <option value="pnapres">Napres Piotr</option>
                        <option value="kpaciorek">Paciorek Krzysztof</option>
                        <option value="rszymczyk">Szymczyk Radosław</option>
                        <option value="twojciechowski">Wojciechowski Tomasz</option>
                        <option value="szmuda">Żmuda Sylwester</option>
                    </select>
                </label>
            </p>
            <p class="sortParam">
                <label class="sortLabel">Ilość:
                    <select id="quantityInv" name="quantityInv" class="selectEnabled">
                        <option>WSZYSTKIE</option>
                        <option>2</option>
                        <option>5</option>
                        <option>10</option>
                        <option>20</option>
                        <option>50</option>
                        <option>100</option>
                        <option>200</option>
                        <option>400</option>
                    </select>
                </label>
            </p>
            <p class="sortParam">
                <label class="sortLabel">Okres:
                    <select id="periodTime" name="periodTime" class="selectEnabled" disabled>
                        <option>Od początku</option>
                        <option>Dzisiaj</option>
                        <option>Od wczoraj</option>
                        <option>Ostatni tydzień</option>
                        <option>Ostatni mieisąc</option>
                        <option>Ostatni rok</option>
                        <option>Inny okres</option>
                    </select>
                </label>
            </p>
        </section>

        <section id="invoicesSection" class="invoices container shadow hide">
        </section>

        <section id="newscastSection" class="newscast container shadow hide">
            <h2 class="section-title" id="invoiceH2">DZIENNIK PRAC</h2>
            <p class="sortParam">
                <label class="sortLabel">Osiedle:
                    <select id="estateNews" name="estateNews" class="selectEnabled">
                        <!-- Lista nieruchomości -->
                    </select>
                </label>
            </p>
            <p class="sortParam">
                <label class="sortLabel">Data i czas:
                    <input id="dateNewscast" class="dateNewscast" type="datetime-local">
                </label>
            </p>
            <textarea placeholder="Wykonane czynności ..." class="contentNewscast" rows="7" cols="20" id="contentNews" name="contentNews"></textarea>
            <div class="lowerNews">
                <button class="normal reg-log-btn saveNews-btn">Zapisz</button>
                <button class="normal reg-log-btn cancelNews-btn">Anuluj</button>
            </div>
        </section>

        <section id="raportSection" class="raport container shadow hide">
            <h2 class="section-title" id="invoiceH2">DZIENNIK ZA OKRES</h2>
            <!-- <p class="sortParam">
                <label class="sortLabel">Osiedle:
                    <select id="estateRaport" name="estateRaport" class="selectEnabled">
                       
                    </select>
                </label>
            </p> -->

            <p class="rangeRaport">
                <label class="sortLabel">OD: 
                    <input  id="dateStartRaport" class="dateRaport" type="date">
                </label>
                <label class="sortLabel">DO: 
                    <input  id="dateStopRaport" class="dateRaport" type="date">
                </label>
            </p>
            <!-- <p id="nameFile" class="whose-info"></p> -->
            <hr>
            <img id="raportImg" class="hide" src="img/PapierFirmowy.jpg" width="100%" alt="Raport dla danego osiedla">
            <div class="lowerNews">
                <button class="normal reg-log-btn generateRaport-btn">Generuj</button>
                <button class="normal reg-log-btn cancelRaport-btn">Anuluj</button>
                <button class="normal reg-log-btn sendRaport-btn hide">Wyślij</button>
            </div>
        </section>

        <section id="newscastListSection" class="invoices container shadow hide">
        </section>

        



        <!-- <div id="newscastPop" class="newscastsPop container shadow shadowPop hide">
            <h2 class="section-title" id="invoiceH2">Poprawienie wpisu w dzienniku</h2>
            <p class="sortParam">
                <label class="sortLabel">Osiedle:
                    <select id="estateNews" name="estateNews" class="selectEnabled">
                    </select>
                </label>
            </p>
            <p class="sortParam">
                <label class="sortLabel">Data i czas:
                    <input id="dateNewscast" class="dateNewscast" type="datetime-local">
                </label>
            </p>
            <textarea placeholder="Wykonane czynności ..." class="contentNewscast" rows="5" cols="20" id="contentNews" name="contentNews"></textarea>
            <div class="lowerNews">
                <button class="normal reg-log-btn saveNewsPop-btn">Popraw</button>
                <button class="normal reg-log-btn delNewsPop-btn">Usuń</button>
                <button class="normal reg-log-btn cancelNewsPop-btn">Anuluj</button>
            </div>
        </div> -->

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
    </script>
</body>

</html>