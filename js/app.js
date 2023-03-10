import { AppInvoice } from "./appInvoice.js";
import { Invoice } from "./invoice.js";
import { InfoInvoice } from "./infoInvoice.js";

const loggingNav = document.getElementById("login");
const loggingSection = document.getElementById("loginSection");
const loggingBtn = document.querySelector(".login-btn");
const logoutBtn = document.querySelector(".logout-btn");
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
const labelNameUser = inputNameUser.parentElement;
const labelSurnameUser = inputSurnameUser.parentElement;
const labelPasswordOld = inputPasswordOld.parentElement;
const labelPasswordTwo = inputPasswordTwo.parentElement;
const labelRightUser = inputRightUser.parentElement;
// console.log(labelNameUser);

// localStorage.setItem("right/HC24", "Administrator");
// localStorage.setItem("right/HC24", "Pracownik");
// localStorage.setItem("right/HC24", "Księgowy");
// localStorage.setItem("right/HC24", "Szef");
// localStorage.setItem("right/HC24", "");
// localStorage.setItem("name/HC24", "Robert");
// localStorage.setItem("name/HC24", "");

function getRights() {
	// if (localStorage.getItem("right/HC24") == "Administrator") {
	// 	// labelNameUser.classList.remove("hide");
	// 	// labelSurnameUser.classList.remove("hide");
	// 	// labelPasswordOld.classList.remove("hide");
	// 	// labelPasswordTwo.classList.remove("hide");
	// 	// labelRightUser.classList.remove("hide");
	// 	// registerBtn.classList.remove("hide");
	// 	return "A";
	// } else if (localStorage.getItem("right/HC24") == "Księgowy") {
	// 	return "K";
	// } else return localStorage.getItem("right/HC24") == "Pracownik" ? "P" : "N";

	switch (localStorage.getItem("right/HC24")) {
		case "Administrator":
			return "A";
			break;
		case "Księgowy":
			return "K";
			break;
		case "Pracownik":
			return "P";
			break;
		case "Szef":
			return "S";
			break;
		default:
			return "N";
	}
}
let rights = getRights();
console.log(rights);

if (rights == "N") loggingNav.innerHTML = "Login";
else loggingNav.innerHTML = localStorage.getItem("name/HC24");

// wylogowanie
try {
	logoutBtn.addEventListener("click", () => {
		labelNameUser.classList.add("hide");
		labelSurnameUser.classList.add("hide");
		labelPasswordOld.classList.add("hide");
		labelPasswordTwo.classList.add("hide");
		labelRightUser.classList.add("hide");
		registerBtn.classList.add("hide");
		loggingSection.classList.toggle("hide");
		divLogout.classList.add("hide");
		console.log("Wylogowano gracza: " + localStorage.getItem("name/HC24"));
		loggingSection.classList.add("hide");
		localStorage.setItem("name/HC24", "");
		localStorage.setItem("right/HC24", "");
		loggingNav.innerHTML = "Login";
		rights = getRights();
		console.log(rights);
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("logoutBtn - nie jest zdefiniowany.");
	}
}
// wylogowanie

// logowanie
try {
	loggingNav.addEventListener("click", () => {
		labelNameUser.classList.add("hide");
		labelSurnameUser.classList.add("hide");
		labelPasswordOld.classList.add("hide");
		labelPasswordTwo.classList.add("hide");
		labelRightUser.classList.add("hide");
		registerBtn.classList.add("hide");
		// console.log("loggingNav");
		// loggingSection.classList.remove("hide");
		loggingSection.classList.toggle("hide");
		divInfoError.innerHTML=``;
		if (rights == "A") {
			labelNameUser.classList.remove("hide");
			labelSurnameUser.classList.remove("hide");
			labelPasswordOld.classList.remove("hide");
			labelPasswordTwo.classList.remove("hide");
			labelRightUser.classList.remove("hide");
			registerBtn.classList.remove("hide");
			divLogout.classList.remove("hide");
		}
		if (rights == "P") {
			// labelNameUser.classList.remove("hide");
			// labelSurnameUser.classList.remove("hide");
			labelPasswordOld.classList.remove("hide");
			labelPasswordTwo.classList.remove("hide");
			// labelRightUser.classList.remove("hide");
			registerBtn.classList.remove("hide");
			divLogout.classList.remove("hide");
		}
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("login - nie działa poprawnie.");
	}
}

try {
	loggingBtn.addEventListener("click", () => {
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
					divInfoError.innerHTML=`(${data.error})`;
					// loggingSection.append(div);
					// div.innerHTML=`<div class="dropdown-note" dropdown style="color:red;"> (${data.error})</div>`;
					// div.append(`${data.error}`);
					// loggingBtn.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
					//     Logowanie <div class="dropdown-note" dropdown style="color:red;"> (${data.error})</div>`;
				} else {
					// 	resultsDiv.classList.remove("hide");
					// 	contactsDiv.classList.add("hide");
					console.log("Zalogowano gracza: " + data.nick);
					console.log("Zalogowano gracza: " + data.nameUser);
					console.log("O prawach: " + data.rightUser);
					console.log("Opis: " + data.error);
					loggingSection.classList.add("hide");
					localStorage.setItem("name/HC24", data.nameUser);
					localStorage.setItem("right/HC24", data.rightUser);
					loggingNav.innerHTML = data.nameUser;
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
// 		saveBtn.classList.remove("hide");
// 		password2.classList.remove("hide");
// 		console.log("Podaj jeszcze raz hasło !!!");
// 	});
// } catch (e) {
// 	if (e instanceof ReferenceError) {
// 		console.log("registerBtn - nie jest zdefiniowany.");
// 	}
// }
// const saveBtn = document.querySelector(".save-btn");
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

// główny moduł
const app = new AppInvoice({
	invoiceWrapper: document.getElementById("invoiceImg"),
	nameFileWrapper: document.getElementById("nameFile"),
	whoseCostWrapper: document.getElementById("whose"),
});

let inv = new Invoice({});
let infoInv = new InfoInvoice({});

app.run(inv, infoInv);
