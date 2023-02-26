import { AppInvoice } from "./appInvoice.js";
import { Invoice } from "./invoice.js";
import { InfoInvoice } from "./infoInvoice.js";

const loggingNav = document.getElementById("login");
const loggingSection = document.getElementById("loginSection");
const loggingBtn = document.querySelector(".login-btn");
const registerBtn = document.querySelector(".register-btn");

// localStorage.setItem("right/HC24", "Administrator");
// localStorage.setItem("right/HC24", "Pracownik");
// localStorage.setItem("right/HC24", "Księgowy");
localStorage.setItem("right/HC24", "");
localStorage.setItem("name/HC24", "Robert");

function getRights () {
	if (localStorage.getItem("right/HC24")=="Administrator") {
		return "A";
	} else if (localStorage.getItem("right/HC24")=="Księgowy") {
		return "K";
	} else return (localStorage.getItem("right/HC24")=="Pracownik")? "P":"N";
}
let rights =getRights();
// console.log(rights);

if (rights=="N") loggingNav.innerHTML="Login";
else loggingNav.innerHTML=localStorage.getItem("name/HC24");


// logowanie

try {
	loggingNav.addEventListener("click", () => {

		console.log("loggingNav");
		// loggingSection.classList.remove("hide");
		loggingSection.classList.toggle("hide");
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("login - nie działa poprawnie.");
	}
}

try {
	loginBtn.addEventListener("click", () => {
		const dataLogin = { 
			Nick: document.querySelector("[name='nick']").value, // inputNick.value,
			Password: document.querySelector("[name='password']").value, // inputPassword.value,
			// Nick: inputNick.value, Password: inputPassword.value 
		};
		$.post(
			"./php/login.php",
			dataLogin,
			function (data) {
				// loggingDivInfo.classList.add("dropdown-active");
				// if (!data.error) {
				// 	resultsDiv.classList.remove("hide");
				// 	contactsDiv.classList.add("hide");
					console.log("Zalogowano gracza: " + data.nick);
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
			Nick: document.querySelector("[name='nick']").value, // inputNick.value,
			Name: document.querySelector("[name='name']").value, // inputName.value,
			Surname: document.querySelector("[name='surname']").value, //inputSurname.value,
			Password: document.querySelector("[name='password']").value, // inputPassword.value,
			Password2: document.querySelector("[name='password2']").value, // inputPassword2.value,
			Right: document.querySelector("[name='right']").value, // inputRight.value,
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