import { AppInvoice } from "./appInvoice.js";
import { Invoice } from "./invoice.js";
import { InfoInvoice } from "./infoInvoice.js";



// logowanie
const loggingNav = document.getElementById("login");
try {
	loggingNav.addEventListener("click", () => {
		console.log("loggingNav");
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("loginBtn - nie jest zdefiniowany.");
	}
}
const loggingButton = document.getElementById("logging");
try {
	loginBtn.addEventListener("click", () => {
		const dataLogin = { Nick: inputNick.value, Password: inputPassword.value };
		$.post(
			"./php/login.php",
			dataLogin,
			function (data) {
				loggingDivInfo.classList.add("dropdown-active");
				if (!data.error) {
					resultsDiv.classList.remove("hide");
					contactsDiv.classList.add("hide");
					console.log("Zalogowano gracza: " + data.nick);
					localStorage.setItem("nick/JTS", data.nick);
					localStorage.setItem("nameTable/JTS", data.nameTable);
					loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
                    Witaj ${data.nick} ! <div class="dropdown-note" dropdown> (twoje wyniki) </div>`;
					appGame.saveScore();
					$.getScript("app/readScores.js").done(function () {
						console.log(
							`Odczyt wyników gracza: ${localStorage.getItem(
								"nick/JTS"
							)}   - readScores.js`
						);
					});
				} else {
					loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
                    Logowanie <div class="dropdown-note" dropdown style="color:red;"> (${data.error})</div>`;
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
const registerBtn = document.querySelector(".register-btn");
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