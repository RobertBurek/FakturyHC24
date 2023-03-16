import { AppInvoice } from "./appInvoice.js";
import { Invoice } from "./invoice.js";
import { InfoInvoice } from "./infoInvoice.js";

const loggingNav = document.getElementById("login");
const loggingSection = document.getElementById("loginSection");
const loginBtn = document.querySelector(".login-btn");
const logoutBtn = document.querySelector(".logout-btn");
const changeBtn = document.querySelector(".change-btn");
const sendMailBtn = document.querySelector(".sendMail-btn");
const divLogout = document.getElementById("logout");
const divInfoError = document.getElementById("infoError");
const registerBtn = document.querySelector(".register-btn");
const inputNick = document.querySelector("[name='nick']");
const inputNameUser = document.querySelector("[name='nameUser']");
const inputSurnameUser = document.querySelector("[name='surnameUser']");
const inputPasswordOld = document.querySelector("[name='passwordOld']");
const inputPassword = document.querySelector("[name='password']");
const inputPasswordTwo = document.querySelector("[name='passwordTwo']");
const inputRightUser = document.querySelector("[name='rightUser']");
const inputNewObject = document.querySelector("[name='newObject']");
const labelNameUser = inputNameUser.parentElement;
const labelNick = inputNick.parentElement;
const labelPassword = inputPassword.parentElement;
const labelSurnameUser = inputSurnameUser.parentElement;
const labelPasswordOld = inputPasswordOld.parentElement;
const labelPasswordTwo = inputPasswordTwo.parentElement;
const labelRightUser = inputRightUser.parentElement;
const labelNewObject = inputNewObject.parentElement;
const listCostsObjectDiv = document.getElementById("listCostsObject");
const titleInvoceH2 = document.getElementById("fakturaH2");
const invoce = document.getElementById("invoice");
const whoseCosts = document.getElementById("whoseCosts");

let listCostsObject = [];
// console.log(labelNameUser);

// localStorage.setItem("right/HC24", "Administrator");
// localStorage.setItem("right/HC24", "Pracownik");
// localStorage.setItem("right/HC24", "Księgowy");
// localStorage.setItem("right/HC24", "Szef");
// localStorage.setItem("right/HC24", "");
// localStorage.setItem("name/HC24", "Robert");
// localStorage.setItem("name/HC24", "Ktoś");
// localStorage.setItem("name/HC24", "");

function checkingParameters() {
	if (
		localStorage.getItem("name/HC24") == "" ||
		!localStorage.getItem("name/HC24")
	) {
		// loggingNav.innerHTML = "Login";
		titleInvoceH2.classList.add("hide");
		whoseCosts.classList.add("hide");
		invoce.classList.add("hide");
		loggingSection.classList.remove("hide");
		labelNick.classList.remove("hide");
		labelPassword.classList.remove("hide");
		loginBtn.classList.remove("hide");
		loggingNav.innerHTML = localStorage.getItem("name/HC24");
	} else {
		// titleInvoceH2.classList.remove("hide");
		whoseCosts.classList.remove("hide");
		invoce.classList.remove("hide");
		loggingSection.classList.add("hide");
		loggingNav.innerHTML = "Login";
	}
}
checkingParameters();
function getRights() {
	loggingNav.innerHTML = localStorage.getItem("name/HC24");
	switch (localStorage.getItem("right/HC24")) {
		case "Pracownik":
			return "P";
			break;
		case "Administrator":
			return "A";
			break;
		case "Księgowy":
			return "K";
			break;
		case "Szef":
			return "S";
			break;
		default: {
			loggingNav.innerHTML = "Login";
			// titleInvoceH2.classList.add("hide");
			// invoce.classList.add("hide");
			return "N";
		}
	}
}
let rights = getRights();
// console.log(rights);

function showElements() {
	labelNick.classList.add("hide");
	labelPasswordOld.classList.remove("hide");
	labelPassword.classList.remove("hide");
	labelPasswordTwo.classList.remove("hide");
	changeBtn.classList.remove("hide");
	divLogout.classList.remove("hide");
	loginBtn.classList.add("hide");
}

// logowanie
try {
	loggingNav.addEventListener("click", () => {
		divInfoError.innerHTML = ``;
		loggingSection.classList.toggle("hide");

		switch (rights) {
			case "P":
				showElements();
				break;
			case "A":
				labelNick.classList.remove("hide");
				labelNameUser.classList.remove("hide");
				labelSurnameUser.classList.remove("hide");
				labelPasswordOld.classList.remove("hide");
				labelPasswordTwo.classList.remove("hide");
				labelRightUser.classList.remove("hide");
				labelNewObject.classList.remove("hide");
				registerBtn.classList.remove("hide");
				changeBtn.classList.remove("hide");
				// saveBtn.classList.remove("hide");
				divLogout.classList.remove("hide");
				break;
			case "K":
				showElements();
				break;
			case "S":
				showElements();
				break;
			case "N":
				labelNick.classList.remove("hide");
				labelPassword.classList.remove("hide");
				loginBtn.classList.remove("hide");
				break;
			default: {
			}
		}
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("login - nie działa poprawnie.");
	}
}

try {
	loginBtn.addEventListener("click", () => {
		const dataLogin = {
			Nick: inputNick.value,
			Password: inputPassword.value,
		};
		$.post(
			"./php/login.php",
			dataLogin,
			function (data) {
				// loggingDivInfo.classList.add("dropdown-active");
				if (data.error) {
					console.log("Opis: " + data.error);
					// let div = document.createElement("div");
					divInfoError.innerHTML = `(${data.error})`;
					// loggingSection.append(div);
					// div.innerHTML=`<div class="dropdown-note" dropdown style="color:red;"> (${data.error})</div>`;
					// div.append(`${data.error}`);
					// loggingBtn.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
					//     Logowanie <div class="dropdown-note" dropdown style="color:red;"> (${data.error})</div>`;
				} else {
					// 	resultsDiv.classList.remove("hide");
					// 	contactsDiv.classList.add("hide");
					console.log("Zalogowano nick: " + data.nick);
					console.log("Zalogowano imie: " + data.nameUser);
					console.log("O prawach: " + data.rightUser);
					console.log("Opis: " + data.error);
					loggingSection.classList.add("hide");
					localStorage.setItem("nick/HC24", data.nick);
					localStorage.setItem("name/HC24", data.nameUser);
					localStorage.setItem("right/HC24", data.rightUser);
					// loggingNav.innerHTML = data.nameUser;
					// infoInv.whoSaved = data.nick;
					// inv.whoUpload = data.nick;
					// alert("wszystko powinno być OK - login.php");
					rights = getRights();
					checkingParameters();
					loggingNav.innerHTML = data.nameUser;
					// 	localStorage.setItem("nameTable/JTS", data.nameTable);
					// 	loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
					//     Witaj ${data.nick} ! <div class="dropdown-note" dropdown> (twoje wyniki) </div>`;
					// 	appGame.saveScore();
					// 	$.getScript("app/readScores.js").done(function () {
					// 		console.log(
					// 			`Odczyt wyników gracza: ${localStorage.getItem(
					// 				"nick/JTS"
					// 			)}   - readScores.js`
					// 		);
					// 	});
					// } else {
					// 	loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
					//     Logowanie <div class="dropdown-note" dropdown style="color:red;"> (${data.error})</div>`;
					// }
				}
			},
			"json"
		).fail(function () {
			alert("Błąd reakcji z login.php");
		});
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("loginBtn - nie jest zdefiniowany.");
	}
}
// logowanie

// rejestracja
// try {
// 	registerBtn.addEventListener("click", () => {
// 		registerBtn.classList.add("hide");
// 		changeBtn.classList.remove("hide");
// 		password2.classList.remove("hide");
// 		console.log("Podaj jeszcze raz hasło !!!");
// 	});
// } catch (e) {
// 	if (e instanceof ReferenceError) {
// 		console.log("registerBtn - nie jest zdefiniowany.");
// 	}
// }
// const changeBtn = document.querySelector(".change-btn");
try {
	registerBtn.addEventListener("click", () => {
		const dataRegister = {
			Nick: inputNick.value,
			NameUser: inputNameUser.value,
			SurnameUser: inputSurnameUser.value,
			Password: inputPassword.value,
			PasswordTwo: inputPasswordTwo.value,
			RightUser: inputRightUser.value,
		};
		console.log(dataRegister);
		$.post(
			"./php/register.php",
			dataRegister,
			function (data) {
				// loggingDivInfo.classList.add("dropdown-active");
				// if (!data.error) {
				// 	resultsDiv.classList.remove("hide");
				// 	contactsDiv.classList.add("hide");
				console.log("Zarejestrowano nowego pracownika: " + data.nick);
				console.log("Opis: " + data.error);
				// 	localStorage.setItem("nick/JTS", data.nick);
				// 	localStorage.setItem("nameTable/JTS", data.nameTable);
				// 	loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
				//     Witaj ${data.nick} ! <div class="dropdown-note" dropdown> (twoje wyniki) </div>`;
				// 	appGame.saveScore();
				// 	$.getScript("app/readScores.js").done(function () {
				// 		console.log(
				// 			`Odczyt wyników gracza: ${localStorage.getItem(
				// 				"nick/JTS"
				// 			)}   - readScores.js`
				// 		);
				// 	});
				// } else {
				// 	loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
				//     Logowanie <div class="dropdown-note" dropdown style="color:red;"> (${data.error})</div>`;
				// }
				alert("powinno być OK - register.php");
			},
			"json"
		).fail(function () {
			alert("Błąd reakcji z register.php");
		});
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("registerBtn - nie jest zdefiniowany.");
	}
}
// rejestracja

// zmiana hasła
try {
	changeBtn.addEventListener("click", () => {
		const dataLogin = {
			NameUser: localStorage.getItem("name/HC24"),
			Nick: localStorage.getItem("nick/HC24"),
			PasswordOld: inputPasswordOld.value,
			Password: inputPassword.value,
			PasswordTwo: inputPasswordTwo.value,
		};
		// console.log(dataLogin);
		$.post(
			"./php/change.php",
			dataLogin,
			function (data) {
				// loggingDivInfo.classList.add("dropdown-active");
				if (data.error) {
					console.log("Opis: " + data.error);
					console.log("Nick: " + data.nick);
					// let div = document.createElement("div");
					divInfoError.innerHTML = `(${data.error})`;
					// loggingSection.append(div);
					// div.innerHTML=`<div class="dropdown-note" dropdown style="color:red;"> (${data.error})</div>`;
					// div.append(`${data.error}`);
					// loggingBtn.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
					//     Logowanie <div class="dropdown-note" dropdown style="color:red;"> (${data.error})</div>`;
				} else {
					// 	resultsDiv.classList.remove("hide");
					// 	contactsDiv.classList.add("hide");
					console.log("Zalogowano nick: " + data.nick);
					console.log("Zalogowano imie: " + data.nameUser);
					console.log("O prawach: " + data.rightUser);
					console.log("Opis: " + data.error);
					loggingSection.classList.add("hide");
					// localStorage.setItem("name/HC24", data.nameUser);
					// localStorage.setItem("right/HC24", data.rightUser);
					// loggingNav.innerHTML = data.nameUser;
					// alert("wszystko powinno być OK - login.php");
					rights = getRights();
					// 	localStorage.setItem("nameTable/JTS", data.nameTable);
					// 	loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
					//     Witaj ${data.nick} ! <div class="dropdown-note" dropdown> (twoje wyniki) </div>`;
					// 	appGame.saveScore();
					// 	$.getScript("app/readScores.js").done(function () {
					// 		console.log(
					// 			`Odczyt wyników gracza: ${localStorage.getItem(
					// 				"nick/JTS"
					// 			)}   - readScores.js`
					// 		);
					// 	});
					// } else {
					// 	loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
					//     Logowanie <div class="dropdown-note" dropdown style="color:red;"> (${data.error})</div>`;
					// }
				}
			},
			"json"
		).fail(function () {
			alert("Błąd reakcji z change.php");
		});
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("changeBtn - nie jest zdefiniowany.");
	}
}
// zmiana hasła

// czyszczenie danych
function cleanData() {
	listCostsObjectDiv.innerHTML = "";
	location.reload(true);
}
// czyszczenie danych

// wylogowanie
try {
	logoutBtn.addEventListener("click", () => {
		localStorage.setItem("name/HC24", "");
		localStorage.setItem("right/HC24", "");
		loggingSection.classList.toggle("hide");
		labelNick.classList.add("hide");
		labelNameUser.classList.add("hide");
		labelSurnameUser.classList.add("hide");
		labelPassword.classList.add("hide");
		labelPasswordOld.classList.add("hide");
		labelPasswordTwo.classList.add("hide");
		labelRightUser.classList.add("hide");
		labelNewObject.classList.add("hide");
		loginBtn.classList.add("hide");
		divLogout.classList.add("hide");
		changeBtn.classList.add("hide");
		registerBtn.classList.add("hide");
		rights = getRights();
		cleanData();
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("logoutBtn - nie jest zdefiniowany.");
	}
}
// wylogowanie

// formularz
// try {
// logoutBtn.addEventListener("click", () => {
// 	localStorage.setItem("name/HC24", "");
// 	localStorage.setItem("right/HC24", "");
// 	loggingSection.classList.toggle("hide");
// 	labelNameUser.classList.add("hide");
// 	labelSurnameUser.classList.add("hide");
// 	labelPassword.classList.add("hide");
// 	labelPasswordOld.classList.add("hide");
// 	labelPasswordTwo.classList.add("hide");
// 	labelRightUser.classList.add("hide");
// 	labelNewObject.classList.add("hide");
// 	loginBtn.classList.add("hide");
// 	divLogout.classList.add("hide");
// 	changeBtn.classList.add("hide");
// 	registerBtn.classList.add("hide");
// 	rights = getRights();
// });
// } catch (e) {
// 	if (e instanceof ReferenceError) {
// 		console.log("logoutBtn - nie jest zdefiniowany.");
// 	}
// }
// formularz

// wysyłanie maila
try {
	sendMailBtn.addEventListener("click", () => {
		console.log(listCostsObject);
		if(!inv.idInvoice) {
			console.log("nie ma faktury");
		} else {
			console.log("JEEEEST");
			console.log(inv.idInvoice);

		}
		// 		const dataLogin = {
		// 			Nick: inputNick.value,
		// 			Password: inputPassword.value,
		// 		};
		// 		$.post(
		// 			"./php/login.php",
		// 			dataLogin,
		// 			function (data) {
		// 				// loggingDivInfo.classList.add("dropdown-active");
		// 				if (data.error) {
		// 					console.log("Opis: " + data.error);
		// 					// let div = document.createElement("div");
		// 					divInfoError.innerHTML = `(${data.error})`;
		// 					// loggingSection.append(div);
		// 					// div.innerHTML=`<div class="dropdown-note" dropdown style="color:red;"> (${data.error})</div>`;
		// 					// div.append(`${data.error}`);
		// 					// loggingBtn.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
		// 					//     Logowanie <div class="dropdown-note" dropdown style="color:red;"> (${data.error})</div>`;
		// 				} else {
		// 					// 	resultsDiv.classList.remove("hide");
		// 					// 	contactsDiv.classList.add("hide");
		// 					console.log("Zalogowano nick: " + data.nick);
		// 					console.log("Zalogowano imie: " + data.nameUser);
		// 					console.log("O prawach: " + data.rightUser);
		// 					console.log("Opis: " + data.error);
		// 					loggingSection.classList.add("hide");
		// 					localStorage.setItem("nick/HC24", data.nick);
		// 					localStorage.setItem("name/HC24", data.nameUser);
		// 					localStorage.setItem("right/HC24", data.rightUser);
		// 					loggingNav.innerHTML = data.nameUser;
		// 					// infoInv.whoSaved = data.nick;
		// 					// inv.whoUpload = data.nick;
		// 					// alert("wszystko powinno być OK - login.php");
		// 					rights = getRights();
		// 					// 	localStorage.setItem("nameTable/JTS", data.nameTable);
		// 					// 	loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
		// 					//     Witaj ${data.nick} ! <div class="dropdown-note" dropdown> (twoje wyniki) </div>`;
		// 					// 	appGame.saveScore();
		// 					// 	$.getScript("app/readScores.js").done(function () {
		// 					// 		console.log(
		// 					// 			`Odczyt wyników gracza: ${localStorage.getItem(
		// 					// 				"nick/JTS"
		// 					// 			)}   - readScores.js`
		// 					// 		);
		// 					// 	});
		// 					// } else {
		// 					// 	loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
		// 					//     Logowanie <div class="dropdown-note" dropdown style="color:red;"> (${data.error})</div>`;
		// 					// }
		// 				}
		// 			},
		// 			"json"
		// 		).fail(function () {
		// 			alert("Błąd reakcji z login.php");
		// 		});
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("sendMailBtn - nie jest zdefiniowany.");
	}
}
// wysyłanie maila

// główny moduł
const app = new AppInvoice({
	invoiceWrapper: document.getElementById("invoiceImg"),
	nameFileWrapper: document.getElementById("nameFile"),
	whoseCostWrapper: listCostsObjectDiv,
});

let inv = new Invoice({});
let infoInv = new InfoInvoice({});

app.run(inv, infoInv, listCostsObject);
