import { AppInvoice } from "./appInvoice.js";
import { Invoice } from "./invoice.js";
import { Newscast } from "./newscast.js";
import { InfoInvoice } from "./infoInvoice.js";

const selectNameObject = document.getElementById("nameObject");
const selectNameUser = document.getElementById("nameUser");
const selectQuantityInv = document.getElementById("quantityInv");
const selectPeriodTime = document.getElementById("periodTime");
const selectEstate = document.getElementById("estateNews");
const contentNewscast = document.getElementById("contentNews");
const parametersSort = document.getElementById("sortParametrs");
const invoicesNav = document.getElementById("invoices");
const newscastNav = document.getElementById("newscast");
const loggingNav = document.getElementById("login");
const loggingSection = document.getElementById("loginSection");
const invoicesSection = document.getElementById("invoicesSection");
const newscastListSection = document.getElementById("newscastListSection");
const newscastSection = document.getElementById("newscastSection");
const loginBtn = document.querySelector(".login-btn");
const logoutBtn = document.querySelector(".logout-btn");
const changeBtn = document.querySelector(".change-btn");
const sendMailBtn = document.querySelector(".sendMail-btn");
const saveNewsBtn = document.querySelector(".saveNews-btn");
const cancelNewsBtn = document.querySelector(".cancelNews-btn");
const sendMailAllegroBtn = document.querySelector(".sendMailAllegro-btn");
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
const titleInvoceH2 = document.getElementById("invoiceH2");
const invoceSection = document.getElementById("invoiceSection");
const whoseCosts = document.getElementById("whoseCosts");
const invoiceImg = document.getElementById("invoiceImg");
const nameFile = document.getElementById("nameFile");
const dateControl = document.querySelector('input[type="datetime-local"]');
let estateCurently = localStorage.getItem("estate/HC24");

function returnCurrentlyDate() {
	const dC = new Date(); //dateCurrently
	return (
		dC.getFullYear() +
		"-" +
		returnFormatDate(dC.getMonth() + 1) +
		"-" +
		returnFormatDate(dC.getDate()) +
		"T" +
		returnFormatDate(dC.getHours()) +
		":" +
		returnFormatDate(dC.getMinutes())
		// +
		// ":" +
		// returnFormatDate(dC.getSeconds())
	);

	function returnFormatDate(value) {
		return value < 10 ? "0" + value : value;
	}
}
dateControl.value = returnCurrentlyDate();

function convertDateNews(dateNews) {
	return (
		dateNews.substr(8, 2) +
		"-" +
		dateNews.substr(5, 2) +
		"-" +
		dateNews.substr(0, 4)
	);
}

let listCostsObject = [];

let ListEstates = [];
$.post(
	"./php/loadEstates.php",
	// dataNews,
	function (data) {
		// ListEstates = data;
		data.forEach((el) => {
			ListEstates.push(el[1]);
		});
		selectEstate.innerHTML = createSelectList(ListEstates);
		// console.log(ListEstates);
	},
	"json"
).fail(function () {
	// ListEstates[0] = "Wybierz";
	ListEstates[0] = "Al. Krakowska 291";
	ListEstates[1] = "Budrysów 11/13";
	ListEstates[2] = "Cybernetyki 4a";
	ListEstates[3] = "Cybernetyki 6";
	ListEstates[4] = "Dzielna 78";
	ListEstates[5] = "Grochowska 78";
	ListEstates[6] = "Kapelanów AK 1";
	ListEstates[7] = "Krzyżówki 36";
	ListEstates[8] = "Lucerny 93";
	ListEstates[9] = "Postępu 12";
	ListEstates[10] = "Polna 3";
	ListEstates[11] = "Promienna 33";
	ListEstates[12] = "Skoroszewska 4";
	ListEstates[13] = "Tobruku 38";
	ListEstates[14] = "Ziemowita 4";
	ListEstates[15] = "Ziemowita 4a";
	ListEstates[16] = "Wilanowska 105";
	selectEstate.innerHTML = createSelectList(ListEstates);
	// console.log(ListEstates);
	// alert("Błąd reakcji z loadNewscast.php");
});

function createSelectList(valueList) {
	let selectList = "";
	if (
		localStorage.getItem("estate/HC24") == "" ||
		!localStorage.getItem("estate/HC24")
	) {
		selectList += `<option>Wybierz</option>`;
	}
	valueList.forEach((el) => {
		if (el == estateCurently) {
			selectList += `<option selected>${el}</option>`;
		} else {
			selectList += `<option>${el}</option>`;
		}
	});
	return selectList;
}

let listNews = [];

function loadListNewscastStart() {
	if (
		localStorage.getItem("estate/HC24") != "" &&
		localStorage.getItem("estate/HC24")
	) {
		// selectEstate.innerHTML += `<option selected>${localStorage.getItem(
		// 	"estate/HC24"
		// )}</option>`;
		const dataNews = {
			EstateNews: localStorage.getItem("estate/HC24"),
		};
		console.log(dataNews);
		$.post(
			"./php/loadNewscast.php",
			dataNews,
			function (data) {
				listNews = data;
				createViewListNewscast(listNews);
				// console.log(data);
				// dateControl.value = returnCurrentlyDate();
				// console.log(dateControl.value);
				// console.log(returnCurrentlyDate());
				// contentNewscast.value = "";
			},
			"json"
		).fail(function () {
			alert("Błąd reakcji z loadNewscast.php");
		});
	}
	// else {
	// 	selectEstate.innerHTML += '<option selected>Wybierz</option>';
	// }
}
loadListNewscastStart();

let dateInBaseListInvoices;
let nextValueQuantity = 0;
let paramNameObject = "WSZYSTKIE";
let paramNameUser = "WSZYSCY";
let paramQuantityInv = 10000000;
let paramPeriodTime = "Ostatni tydzień";

function hidingAll() {
	titleInvoceH2.classList.add("hide");
	whoseCosts.classList.add("hide");
	invoiceSection.classList.add("hide");
	invoicesSection.classList.add("hide");
	newscastListSection.classList.add("hide");
	loggingSection.classList.add("hide");
	// labelNick.classList.add("hide");
	// labelPassword.classList.add("hide");
	// loginBtn.classList.add("hide");
	// labelNick.classList.remove("hide");
	// labelNameUser.classList.remove("hide");
	// labelSurnameUser.classList.remove("hide");
	// labelPassword.classList.remove("hide");
	// labelPasswordOld.classList.remove("hide");
	// labelPasswordTwo.classList.remove("hide");
	// labelRightUser.classList.remove("hide");
	// labelNewObject.classList.remove("hide");
	// registerBtn.classList.remove("hide");
	// changeBtn.classList.remove("hide");
	// sendMailAllegroBtn.classList.remove("hide");
	// divLogout.classList.remove("hide");
	newscastSection.classList.add("hide");
	parametersSort.classList.add("hide");
	invoicesSection.innerHTML = "";
	nameFile.innerHTML = "";
	titleInvoceH2.classList.add("hide");
	invoiceImg.src = "invoices/nowaFaktura3.jpg";
}

selectNameObject.onchange = function () {
	nextValueQuantity = 0;
	paramNameObject = this.value;
	// paramNameObject = this.value == "WSZYSTKIE" ? "" : this.value;
	console.log(paramNameObject);
	// listCostsAgain(
	// 	"start",
	// 	paramNameObject,
	// 	paramNameUser,
	// 	paramQuantityInv,
	// 	paramPeriodTime
	// );
	createViewListInvoices(
		dateInBaseListInvoices,
		paramNameObject,
		paramNameUser,
		paramQuantityInv,
		paramPeriodTime,
		"start"
	);
};

selectNameUser.onchange = function () {
	nextValueQuantity = 0;
	paramNameUser = this.value;
	console.log(paramNameUser);
	// listCostsAgain(
	// 	"start",
	// 	paramNameObject,
	// 	paramNameUser,
	// 	paramQuantityInv,
	// 	paramPeriodTime
	// );
	createViewListInvoices(
		dateInBaseListInvoices,
		paramNameObject,
		paramNameUser,
		paramQuantityInv,
		paramPeriodTime,
		"start"
	);
};

selectQuantityInv.onchange = function () {
	nextValueQuantity = 0;
	paramQuantityInv =
		this.value == "WSZYSTKIE" ? dateInBaseListInvoices.length : this.value;
	// paramQuantityInv = this.value;
	console.log(paramQuantityInv);
	// listCostsAgain(
	// 	"start",
	// 	paramNameObject,
	// 	paramNameUser,
	// 	paramQuantityInv,
	// 	paramPeriodTime
	// );
	createViewListInvoices(
		dateInBaseListInvoices,
		paramNameObject,
		paramNameUser,
		paramQuantityInv,
		paramPeriodTime,
		"start"
	);
};

selectPeriodTime.onchange = function () {
	nextValueQuantity = 0;
	paramPeriodTime = this.value;
	console.log(paramPeriodTime);
	// listCostsAgain(
	// 	"start",
	// 	paramNameObject,
	// 	paramNameUser,
	// 	paramQuantityInv,
	// 	paramPeriodTime
	// );
	createViewListInvoices(
		dateInBaseListInvoices,
		paramNameObject,
		paramNameUser,
		paramQuantityInv,
		paramPeriodTime,
		"start"
	);
};

selectEstate.onchange = function () {
	localStorage.setItem("estate/HC24", this.value);
	console.log(localStorage.getItem("estate/HC24"));
	news.estateNews = this.value;
	console.log(news.estateNews);
	newscastListSection.innerHTML = "";
	loadListNewscastStart();
	createViewListNewscast(listNews);
};

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
		titleInvoceH2.classList.add("hide");
		whoseCosts.classList.add("hide");
		invoceSection.classList.add("hide");
		loggingSection.classList.remove("hide");
		labelNick.classList.remove("hide");
		labelPassword.classList.remove("hide");
		loginBtn.classList.remove("hide");
		loggingNav.innerHTML = localStorage.getItem("name/HC24");
	} else {
		invoceSection.classList.remove("hide");
		loggingSection.classList.add("hide");
		loggingNav.innerHTML = "Login";
	}
}
checkingParameters();

function getRights() {
	loggingNav.innerHTML = localStorage.getItem("name/HC24");
	switch (localStorage.getItem("right/HC24")) {
		case "Pracownik": {
			selectNameUser.disabled = true;
			return "P";
			break;
		}
		case "Administrator": {
			selectNameUser.disabled = false;
			return "A";
			break;
		}
		case "Księgowy": {
			return "K";
			break;
		}
		case "Szef":
			return "S";
			break;
		default: {
			loggingNav.innerHTML = "Login";
			return "N";
		}
	}
}
let rights = getRights();

function showElements() {
	labelNick.classList.add("hide");
	labelPasswordOld.classList.remove("hide");
	labelPassword.classList.remove("hide");
	labelPasswordTwo.classList.remove("hide");
	changeBtn.classList.remove("hide");
	divLogout.classList.remove("hide");
	loginBtn.classList.add("hide");
	sendMailAllegroBtn.classList.add("hide");
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
				labelPassword.classList.remove("hide");
				labelPasswordOld.classList.remove("hide");
				labelPasswordTwo.classList.remove("hide");
				labelRightUser.classList.remove("hide");
				labelNewObject.classList.remove("hide");
				registerBtn.classList.remove("hide");
				changeBtn.classList.remove("hide");
				sendMailAllegroBtn.classList.remove("hide");
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
		console.log("loginNav - nie działa poprawnie.");
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
				if (data.error) {
					divInfoError.innerHTML = `(${data.error})`;
				} else {
					// console.log("Zalogowano nick: " + data.nick);
					// console.log("Zalogowano imie: " + data.nameUser);
					loggingSection.classList.add("hide");
					localStorage.setItem("nick/HC24", data.nick);
					localStorage.setItem("name/HC24", data.nameUser);
					localStorage.setItem("right/HC24", data.rightUser);
					if (data.rightUser == "Administrator")
						sendMailAllegroBtn.classList.remove("hide");
					rights = getRights();
					checkingParameters();
					loggingNav.innerHTML = data.nameUser;
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

// dziennik zapis
try {
	saveNewsBtn.addEventListener("click", () => {
		const dataNews = {
			EstateNews: localStorage.getItem("estate/HC24"),
			ContentNews: contentNewscast.value,
			DateNews: convertDateNews(dateControl.value),
			WhoSave: localStorage.getItem("nick/HC24"),
			IsDel: 0,
			WhoDel: "",
			DateDel: "",
			AuthorNews: localStorage.getItem("name/HC24")
		};
		// console.log(dataNews);
		$.post(
			"./php/saveNewscast.php",
			dataNews,
			function (data) {
				listNews = data;
				createViewListNewscast(listNews);
				console.log(data);
				// dateControl.value = returnCurrentlyDate();
				console.log(dateControl.value);
				console.log(returnCurrentlyDate());
				contentNewscast.value = "";
			},
			"json"
		).fail(function () {
			alert("Błąd reakcji z saveNewscast.php");
		});
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("saveNewsBtn - nie jest zdefiniowany.");
	}
}
// dziennik zapis

function isParamQuantityInv() {
	if (nextValueQuantity < paramQuantityInv) {
		nextValueQuantity += 1;
		// flagSort = true;
		return true;
	} else {
		return false;
	}
}

// sortowanie
function sortForParams(
	element,
	paramNameObject,
	paramNameUser,
	paramQuantityInv,
	paramPeriodTime
) {
	let flagSort = false;
	let stringElement = element.toString().concat("WSZYSTKIE").concat("WSZYSCY");
	console.log(stringElement);
	if (
		stringElement.includes(paramNameObject) &&
		stringElement.includes(paramNameUser)
	) {
		flagSort = isParamQuantityInv();
	}
	return flagSort;
}
// sortowanie

//lista kosztów ponownie
function listCostsAgain(
	positionInvoice,
	paramNameObject,
	paramNameUser,
	paramQuantityInv,
	paramPeriodTime
) {
	invoicesSection.innerHTML = "";
	const dataLoadInv = {
		Nick: localStorage.getItem("nick/HC24"),
		Right: localStorage.getItem("right/HC24"),
		Quantity: paramQuantityInv,
	};
	console.log(dataLoadInv);
	$.post(
		"./php/loadInvoices.php",
		dataLoadInv,
		function (data) {
			if (data.error) {
				console.log(`(${data.error})`);
			} else {
				nextValueQuantity = 0;
				dateInBaseListInvoices = data.reverse();
				console.log(dateInBaseListInvoices);
				createViewListInvoices(
					data.reverse(),
					paramNameObject,
					paramNameUser,
					paramQuantityInv,
					paramPeriodTime,
					positionInvoice
				);
			}
		},
		"json"
	).fail(function () {
		alert("Błąd reakcji z loadInvoices.php");
	});
	setTimeout(() => {
		window.location.hash = positionInvoice;
	}, 1300);
}
//lista kosztów ponownie

// faktury
try {
	invoicesNav.addEventListener("click", () => {
		if (invoicesNav.innerHTML != "Faktury") {
			invoicesNav.innerHTML = "Faktury";
			hidingAll();
			invoiceSection.classList.remove("hide");
			// invoicesSection.classList.toggle("hide");
			// parametersSort.classList.toggle("hide");
			invoicesSection.innerHTML = "";
			nameFile.innerHTML = "";
			titleInvoceH2.classList.add("hide");
			invoiceImg.src = "invoices/nowaFaktura3.jpg";
		} else {
			hidingAll();
			invoicesNav.innerHTML = "Nowa Faktura";
			// invoiceSection.classList.toggle("hide");
			invoicesSection.classList.remove("hide");
			parametersSort.classList.remove("hide");
			whoseCosts.classList.add("hide");
			listCostsAgain(
				"start",
				paramNameObject,
				paramNameUser,
				paramQuantityInv,
				paramPeriodTime
			);
		}
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("invoicesNav - nie działa poprawnie.");
	}
}
// faktury

// dziennik nav
try {
	newscastNav.addEventListener("click", () => {
		hidingAll();
		newscastSection.classList.remove("hide");
		newscastListSection.classList.remove("hide");
		loadListNewscastStart();
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("newscastNav - nie działa poprawnie.");
	}
}
// dziennik nav

// rejestracja
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
		$.post(
			"./php/register.php",
			dataRegister,
			function (data) {
				console.log("Zarejestrowano nowego pracownika: " + data.nick);
				console.log("Opis: " + data.error);
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
		$.post(
			"./php/change.php",
			dataLogin,
			function (data) {
				if (data.error) {
					divInfoError.innerHTML = `(${data.error})`;
				} else {
					loggingSection.classList.add("hide");
					rights = getRights();
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


//usuwanie News
function deleteNewsBase(
	idNews,
	whoDelNews
) {
	const dataDelNews = {
		WhoDel: whoDelNews,
		IdNews: idNews,
		EstateNews: localStorage.getItem("estate/HC24")
	};
	console.log(dataDelNews);
	$.post(
		"./php/deleteNews.php",
		dataDelNews,
		function (data) {
			// listNews = data;
			// createViewListNewscast(listNews);
			// console.log(data);
			loadListNewscastStart();
			// dateControl.value = returnCurrentlyDate();
			// console.log(dateControl.value);
			// console.log(returnCurrentlyDate());
			// contentNewscast.value = "";
		},
		"json"
	).fail(function () {
		alert("Błąd reakcji z deleteNews.php");
	});
	// setTimeout(() => {
	// 	window.location.hash = positionInvoice;
	// }, 1300);
}
//usuwanie News



// widok dziennika
function createViewListNewscast(listNews) {
	{
		newscastListSection.innerHTML = "";
		console.log(listNews);
		let lastDay = "00-00-0000";
		listNews.forEach((oneNews) => {
			if (
				oneNews[6] != 1 ||
				localStorage.getItem("right/HC24") == "Administrator"
				)
			{
				console.log("piszę pojedynczy wpis");
				console.log(oneNews);
				// } else {
				// if (licznik == 5) break;
				// licznik +=1;
				// console.log(inv);
				// let contentCostsObject = "";
				// let contentMail = "";
				// inv[7].reverse().forEach((el) => {
				// inv[7].forEach((el) => {
				// 	if (el[2] == "red") {
				// 		contentCostsObject += `<p class="invCost" style="color: lightsalmon;text-decoration: line-through;"> ${el[0]} - ${el[1]}</p>`;
				// 		contentMail +=
				// 			"pozycja nr " +
				// 			el[0] +
				// 			"  dla osiedla  " +
				// 			el[1] +
				// 			" - usunięta, \r\n";
				// 	} else {
				// 		contentCostsObject += `<p class="invCost" style="color: ${el[2]};"> ${el[0]} - ${el[1]}</p>`;
				// 		contentMail +=
				// 			"pozycja nr " + el[0] + "  dla osiedla  " + el[1] + ", \r\n";
				// 	}
				// });
				let new_line = document.createElement("div");
				new_line.classList.add("newsDiv");
				if (oneNews[6] == "1") new_line.classList.add("newsDel");

				let miniMenuDiv = document.createElement("div");
				miniMenuDiv.classList.add("miniMenuNews");
				miniMenuDiv.disabled = true;

				// let imageNewscast = document.getElementById(oneNews[0]);
				// imageNewscast.classList.toggle("hide");

				// let sendAgain = document.createElement("div");
				// sendAgain.innerHTML = `<form class="mailAgainForm" action="php/sendInvoiceMail.php" method="POST">
				// 				<input type="text" name="NameUser" value=${localStorage.getItem(
				// 					"name/HC24"
				// 				)} hidden >
				// 				<input type="text" name="NameFile" value="${inv[1]}" hidden >
				// 				<textarea type="text" name="ContentMail" hidden>${contentMail}</textarea>
				// 				<input class="inputNews" type="submit" value="WYŚLI MAIL">
				// 				</form>`;

				let corectDivNew = document.createElement("div");
				corectDivNew.classList.add("mailAgainForm");
				let corectInputNews = document.createElement("input");

				corectInputNews.addEventListener("click", () => {
					console.log("poprawianie wpisu czynności !!!");
					// let quantityInfoInv = 1;

					// let invNew = new Invoice({});
					// invNew.idInvoice = inv[0];
					// invNew.nameFile = inv[1];
					// invNew.uploadDate = inv[2];
					// invNew.whoUpload = inv[3];
					// invNew.listCostsObject = new Array(0);
					// console.log(invNew);

					// let imageNewscast = document.getElementById(oneNews[0]);
					// imageNewscast.classList.toggle("hide");

					// let textNews = document.createElement("textarea");
					// textNews.classList.add("titleNewCosts");
					// textNews.value = oneNews[3];
					// imageNewscast.appendChild(textNews);
					// let newCostsList = document.createElement("div");
					// imageNewscast.appendChild(newCostsList);

					// let infoNewInv = new InfoInvoice({});
					// infoNewInv.nick = invNew.whoUpload;
					// infoNewInv.idInvoice = invNew.idInvoice;
					// infoNewInv.numberInv = quantityInfoInv;
					// infoNewInv.whoSaved = localStorage.getItem("nick/HC24");
					// infoNewInv.dateSaved = "";
					// infoNewInv.whoDelete = "";
					// infoNewInv.building = "Brak";
					// invNew.listCostsObject.push(infoNewInv);
					// infoNewInv.writeForm(newCostsList, quantityInfoInv, invNew, false);

					// sendAgain.classList.add("hide");
					deleteInputNews.classList.add("hide");
					corectInputNews.classList.add("hide");

					let saveCancelDiv = document.createElement("div");
					saveCancelDiv.classList.add("miniMenuNews");

					let saveCorect = document.createElement("div");
					saveCorect.innerHTML = "ZAPISZ";
					saveCorect.classList.add("inputNews");
					saveCorect.addEventListener("click", () => {
						console.log("zapisałem");
						// console.log(invNew);
						// invNew.deleteInfoInvoices(inv[7]);
						// console.log(positionInvoice);
						// invoicesSection.innerHTML = "";
						// setTimeout(() => {
						// 	listCostsAgain(
						// 		"#miniMenu/" + inv[0],
						// 		paramNameObject,
						// 		paramNameUser,
						// 		paramQuantityInv,
						// 		paramPeriodTime
						// 	);
						// }, 1000);
					});

					let cancelCorect = document.createElement("div");
					cancelCorect.innerHTML = "ANULUJ";
					cancelCorect.classList.add("inputNews");
					cancelCorect.addEventListener("click", () => {
						console.log("anulowałem");
						// sendAgain.classList.remove("hide");
						// deleteInvoice.classList.remove("hide");
						// corectInputNews.classList.remove("hide");
						// imageInvoice.classList.add("hide");
						// titleNewCostsList.remove();
						// newCostsList.remove();
						// saveCancelDiv.remove();
					});

					saveCancelDiv.append;
					saveCancelDiv.append(saveCorect);
					saveCancelDiv.append(cancelCorect);
					// imageNewscast.append(saveCancelDiv);
				});
				corectInputNews.classList.add("inputNews");
				corectInputNews.setAttribute("type", "submit");
				corectInputNews.setAttribute("value", "POPRAW");
				corectInputNews.disabled = true;

				if (localStorage.getItem("right/HC24") == "Pracownik")
					corectInputNews.disabled = true;

				corectDivNew.appendChild(corectInputNews);

				let deleteInputNews = document.createElement("div");
				let deleteDiv = document.createElement("div");
				deleteDiv.classList.add("mailAgainForm");
				let deleteInput = document.createElement("input");

				deleteInput.addEventListener("click", () => {
					// let invNew = new Invoice({});
					// invNew.idInvoice = inv[0];
					// invNew.nameFile = inv[1];
					// invNew.uploadDate = inv[2];
					// invNew.whoUpload = inv[3];
					// invNew.listCostsObject = new Array(0);
					// console.log(invNew);

					// let imageNewscast = document.getElementById(inv[0]);
					// imageNewscast.classList.toggle("hide");

					// let titleDeleteInv = document.createElement("p");
					// titleDeleteInv.classList.add("titleNewCosts");
					// titleDeleteInv.innerHTML = `Napewno chcesz usunąć tę fakturę?`;
					// imageNewscast.appendChild(titleDeleteInv);

					// sendAgain.classList.add("hide");
					// deleteInvoice.classList.add("hide");
					// corectInputNews.classList.add("hide");

					let deleteCancelDiv = document.createElement("div");
					deleteCancelDiv.classList.add("miniMenuNews");

					let deleteInv = document.createElement("div");
					deleteInv.innerHTML = "USUŃ";
					deleteInv.classList.add("inputNews");
					deleteInv.disabled = true;
					deleteInv.addEventListener("click", () => {
						console.log("usunąłem");
						// console.log(invNew);
						// invNew.deleteInvoice();
						// console.log(positionInvoice);
						// setTimeout(() => {
						// 	listCostsAgain(
						// 		"#miniMenu/" + inv[0],
						// 		paramNameObject,
						// 		paramNameUser,
						// 		paramQuantityInv,
						// 		paramPeriodTime
						// 	);
						// }, 1000);
					});

					let cancelCorect = document.createElement("div");
					cancelCorect.innerHTML = "ANULUJ";
					cancelCorect.classList.add("inputNews");
					cancelCorect.disabled = true;
					cancelCorect.addEventListener("click", () => {
						console.log("anulowałem");
						// sendAgain.classList.remove("hide");
						// deleteInvoice.classList.remove("hide");
						// corectInputNews.classList.remove("hide");
						// imageNewscast.classList.add("hide");
						// titleDeleteInv.remove();
						// deleteCancelDiv.remove();
					});

					deleteCancelDiv.append;
					deleteCancelDiv.append(deleteInv);
					deleteCancelDiv.append(cancelCorect);
					imageNewscast.append(deleteCancelDiv);
				});
				deleteInput.classList.add("inputNews");
				deleteInput.setAttribute("type", "submit");
				deleteInput.setAttribute("value", "USUŃ");
				deleteInput.disabled = true;
				if (localStorage.getItem("right/HC24") == "Pracownik")
					deleteInput.disabled = true;

				deleteInputNews.appendChild(deleteInput);

				if (lastDay != oneNews[2].substr(0, 10)) {
					new_line.innerHTML += `<p class="newsName">${oneNews[2].substr(
						0,
						10
					)}</p>`;
					lastDay = oneNews[2].substr(0, 10);
				}

				// <section id="${oneNews[0]}" class="invoice container hide">
				// <textarea rows="2" cols="20" >${oneNews[2]}</textarea>
				// </section>`;

				// let textNews = document.createElement("textarea");

				// let textNews = document.createElement("div");

				// textNews.setAttribute("type", "TEXT");
				// <textarea oninput="auto_grow(this)"></textarea>

				let authorNews = document.createElement("p");
				if (oneNews[6] == "1") authorNews.classList.add("newsDel");
				authorNews.classList.add("authorNewscast");
				authorNews.innerText = oneNews[9] + ' wykonał: ';
				authorNews.disabled = true;
				new_line.appendChild(authorNews);


				let textNews = document.createElement("p");
				if (oneNews[6] == "1") textNews.classList.add("newsDel");
				textNews.classList.add("contentNewscast");
				// textNews.classList.add("divTextarea");

				// const rowsNews = oneNews[3].split("\n").length;
				textNews.disabled = true;
				// textNews.rows = rowsNews < 1 ? 3 : rowsNews + 1;
				// textNews.value = oneNews[3];
				textNews.innerText = oneNews[3];
				new_line.appendChild(textNews);


				let menuNews = document.createElement("div");
				menuNews.classList.add("menuNews");
				let divNewsEdit = document.createElement("div");
				divNewsEdit.innerHTML = `<i class="fas fa-pencil"></i>`;
				divNewsEdit.addEventListener("click", () => {
					console.log("Pokazałem popEdit");
					// deleteCancelNews.classList.remove("hide");
					// deleteCancelNews.classList.add("miniMenuNews");
					menuNews.classList.remove("menuNews");
					menuNews.classList.add("hide");
					// console.log(invNew);
					// invNew.deleteInfoInvoices(inv[7]);
					// console.log(positionInvoice);
					// invoicesSection.innerHTML = "";
					// setTimeout(() => {
					// 	listCostsAgain(
					// 		"#miniMenu/" + inv[0],
					// 		paramNameObject,
					// 		paramNameUser,
					// 		paramQuantityInv,
					// 		paramPeriodTime
					// 	);
					// }, 1000);
				});
				let divNewsDel = document.createElement("div");
				divNewsDel.innerHTML = `<i class="fas fa-trash"></i>`;
				divNewsDel.addEventListener("click", () => {
					console.log("Pokazałem menu usuwania");
					deleteCancelNews.classList.remove("hide");
					deleteCancelNews.classList.add("miniMenuNews");
					menuNews.classList.remove("menuNews");
					menuNews.classList.add("hide");
					// console.log(invNew);
					// invNew.deleteInfoInvoices(inv[7]);
					// console.log(positionInvoice);
					// invoicesSection.innerHTML = "";
					// setTimeout(() => {
					// 	listCostsAgain(
					// 		"#miniMenu/" + inv[0],
					// 		paramNameObject,
					// 		paramNameUser,
					// 		paramQuantityInv,
					// 		paramPeriodTime
					// 	);
					// }, 1000);
				});
				if (oneNews[6] != "1") menuNews.appendChild(divNewsEdit);
				if (oneNews[6] != "1") menuNews.appendChild(divNewsDel);

				// ----------------------------------------------------------

				let deleteCancelNews = document.createElement("div");
				deleteCancelNews.classList.add("hide");
				// deleteCancelNews.classList.add("miniMenuNews");
				// deleteCancelNews.classList.add("hide");

				let deleteNews = document.createElement("div");
				deleteNews.innerHTML = "USUŃ";
				deleteNews.classList.add("inputNews");
				deleteNews.addEventListener("click", () => {
					console.log("Usunąłem News: "+oneNews[0]+" przez "+localStorage.getItem("nick/HC24"));
					new_line.classList.add("hide");
					deleteNewsBase(oneNews[0], localStorage.getItem("nick/HC24"));

					// console.log(invNew);
					// invNew.deleteInfoInvoices(inv[7]);
					// console.log(positionInvoice);
					// invoicesSection.innerHTML = "";
					// setTimeout(() => {
					// 	listCostsAgain(
					// 		"#miniMenu/" + inv[0],
					// 		paramNameObject,
					// 		paramNameUser,
					// 		paramQuantityInv,
					// 		paramPeriodTime
					// 	);
					// }, 1000);
				});

				let cancelNews = document.createElement("div");
				cancelNews.innerHTML = "ANULUJ";
				cancelNews.classList.add("inputNews");
				cancelNews.addEventListener("click", () => {
					console.log("anulowałem");
					deleteCancelNews.classList.add("hide");
					deleteCancelNews.classList.remove("miniMenuNews");
					menuNews.classList.add("menuNews");
					menuNews.classList.remove("hide");
				});

				
				deleteCancelNews.append(deleteNews);
				deleteCancelNews.append(cancelNews);
				deleteCancelNews.classList.add("hide");
				new_line.append(deleteCancelNews);
				// deleteCancelNews.classList.add("hide");

				// ----------------------------------------------------------


				// menuNews.innerHTML = `<i class="fas fa-pencil"></i> <i class="fas fa-trash"></i>`;
				authorNews.disabled = true;
				new_line.appendChild(menuNews);


				let anchorInvoice = document.createElement("div");
				anchorInvoice.classList.add("anchorInvoice");
				anchorInvoice.id = "newscast/" + oneNews[0];
				miniMenuDiv.appendChild(corectDivNew);
				miniMenuDiv.appendChild(deleteInputNews);

				newscastListSection.appendChild(anchorInvoice);
				newscastListSection.appendChild(new_line);
				// newscastListSection.appendChild(miniMenuDiv);

				// let lineSeparator = document.createElement("hr");
				// lineSeparator.classList.add("lineListInv");
				// invoicesSection.appendChild(lineSeparator);
			}
		});
	}
}
// widok dziennika

// widok listy faktur
function createViewListInvoices(
	dataInBase,
	paramNameObject,
	paramNameUser,
	paramQuantityInv,
	paramPeriodTime,
	positionInvoice
) {
	invoicesSection.innerHTML = "";
	console.log(dataInBase);
	dataInBase.forEach((inv) => {
		if (
			// inv[4] == 1 &&
			// localStorage.getItem("right/HC24") == "Pracownik"
			sortForParams(
				inv,
				paramNameObject,
				paramNameUser,
				paramQuantityInv,
				paramPeriodTime
			)
		) {
			console.log("piszę linie faktury");
			// } else {
			// if (licznik == 5) break;
			// licznik +=1;
			// console.log(inv);
			let contentCostsObject = "";
			let contentMail = "";
			// inv[7].reverse().forEach((el) => {
			inv[7].forEach((el) => {
				if (el[2] == "red") {
					contentCostsObject += `<p class="invCost" style="color: lightsalmon;text-decoration: line-through;"> ${el[0]} - ${el[1]}</p>`;
					contentMail +=
						"pozycja nr " +
						el[0] +
						"  dla osiedla  " +
						el[1] +
						" - usunięta, \r\n";
				} else {
					contentCostsObject += `<p class="invCost" style="color: ${el[2]};"> ${el[0]} - ${el[1]}</p>`;
					contentMail +=
						"pozycja nr " + el[0] + "  dla osiedla  " + el[1] + ", \r\n";
				}
			});
			let new_line = document.createElement("div");
			new_line.classList.add("invDiv");
			if (inv[4] == "1") new_line.classList.add("invDel");

			let miniMenuDiv = document.createElement("div");
			miniMenuDiv.classList.add("miniMenu");

			let sendAgain = document.createElement("div");
			sendAgain.innerHTML = `<form class="mailAgainForm" action="php/sendInvoiceMail.php" method="POST">
							<input type="text" name="NameUser" value=${localStorage.getItem(
								"name/HC24"
							)} hidden >
							<input type="text" name="NameFile" value="${inv[1]}" hidden >
							<textarea type="text" name="ContentMail" hidden>${contentMail}</textarea>
							<input class="inputSubmit" type="submit" value="WYŚLI MAIL">
							</form>`;

			let corectDiv = document.createElement("div");
			corectDiv.classList.add("mailAgainForm");
			let corectInput = document.createElement("input");

			corectInput.addEventListener("click", () => {
				let quantityInfoInv = 1;

				let invNew = new Invoice({});
				invNew.idInvoice = inv[0];
				invNew.nameFile = inv[1];
				invNew.uploadDate = inv[2];
				invNew.whoUpload = inv[3];
				invNew.listCostsObject = new Array(0);
				console.log(invNew);

				let imageInvoice = document.getElementById(inv[0]);
				imageInvoice.classList.toggle("hide");

				let titleNewCostsList = document.createElement("p");
				titleNewCostsList.classList.add("titleNewCosts");
				titleNewCostsList.innerHTML = `Nowe przypisanie kosztów:`;
				imageInvoice.appendChild(titleNewCostsList);
				let newCostsList = document.createElement("div");
				imageInvoice.appendChild(newCostsList);

				let infoNewInv = new InfoInvoice({});
				infoNewInv.nick = invNew.whoUpload;
				infoNewInv.idInvoice = invNew.idInvoice;
				infoNewInv.numberInv = quantityInfoInv;
				infoNewInv.whoSaved = localStorage.getItem("nick/HC24");
				infoNewInv.dateSaved = "";
				infoNewInv.whoDelete = "";
				infoNewInv.building = "Brak";
				invNew.listCostsObject.push(infoNewInv);
				infoNewInv.writeForm(newCostsList, quantityInfoInv, invNew, false);

				sendAgain.classList.add("hide");
				deleteInvoice.classList.add("hide");
				corectInput.classList.add("hide");

				let saveCancelDiv = document.createElement("div");
				saveCancelDiv.classList.add("miniMenu");

				let saveCorect = document.createElement("div");
				saveCorect.innerHTML = "ZAPISZ";
				saveCorect.classList.add("inputSubmit");
				saveCorect.addEventListener("click", () => {
					console.log("zapisałem");
					console.log(invNew);
					invNew.deleteInfoInvoices(inv[7]);
					console.log(positionInvoice);
					invoicesSection.innerHTML = "";
					setTimeout(() => {
						listCostsAgain(
							"#miniMenu/" + inv[0],
							paramNameObject,
							paramNameUser,
							paramQuantityInv,
							paramPeriodTime
						);
						// createViewListInvoices(
						// 	dateInBaseListInvoices,
						// 	paramNameObject,
						// 	paramNameUser,
						// 	paramQuantityInv,
						// 	paramPeriodTime,
						// 	"#miniMenu/" + inv[0]
						// );
					}, 1000);
				});

				let cancelCorect = document.createElement("div");
				cancelCorect.innerHTML = "ANULUJ";
				cancelCorect.classList.add("inputSubmit");
				cancelCorect.addEventListener("click", () => {
					console.log("anulowałem");
					sendAgain.classList.remove("hide");
					deleteInvoice.classList.remove("hide");
					corectInput.classList.remove("hide");
					imageInvoice.classList.add("hide");
					titleNewCostsList.remove();
					newCostsList.remove();
					saveCancelDiv.remove();
				});

				saveCancelDiv.append;
				saveCancelDiv.append(saveCorect);
				saveCancelDiv.append(cancelCorect);
				imageInvoice.append(saveCancelDiv);
			});
			corectInput.classList.add("inputSubmit");
			corectInput.setAttribute("type", "submit");
			corectInput.setAttribute("value", "POPRAW KOSZTY");
			if (localStorage.getItem("right/HC24") == "Pracownik")
				corectInput.disabled = true;

			corectDiv.appendChild(corectInput);

			let deleteInvoice = document.createElement("div");
			let deleteDiv = document.createElement("div");
			deleteDiv.classList.add("mailAgainForm");
			let deleteInput = document.createElement("input");

			deleteInput.addEventListener("click", () => {
				let invNew = new Invoice({});
				invNew.idInvoice = inv[0];
				invNew.nameFile = inv[1];
				invNew.uploadDate = inv[2];
				invNew.whoUpload = inv[3];
				invNew.listCostsObject = new Array(0);
				console.log(invNew);

				let imageInvoice = document.getElementById(inv[0]);
				imageInvoice.classList.toggle("hide");

				let titleDeleteInv = document.createElement("p");
				titleDeleteInv.classList.add("titleNewCosts");
				titleDeleteInv.innerHTML = `Napewno chcesz usunąć tę fakturę?`;
				imageInvoice.appendChild(titleDeleteInv);

				sendAgain.classList.add("hide");
				deleteInvoice.classList.add("hide");
				corectInput.classList.add("hide");

				let deleteCancelDiv = document.createElement("div");
				deleteCancelDiv.classList.add("miniMenu");

				let deleteInv = document.createElement("div");
				deleteInv.innerHTML = "USUŃ";
				deleteInv.classList.add("inputSubmit");
				deleteInv.addEventListener("click", () => {
					console.log("usunąłem");
					console.log(invNew);
					invNew.deleteInvoice();
					console.log(positionInvoice);
					setTimeout(() => {
						listCostsAgain(
							"#miniMenu/" + inv[0],
							paramNameObject,
							paramNameUser,
							paramQuantityInv,
							paramPeriodTime
						);
					}, 1000);
				});

				let cancelCorect = document.createElement("div");
				cancelCorect.innerHTML = "ANULUJ";
				cancelCorect.classList.add("inputSubmit");
				cancelCorect.addEventListener("click", () => {
					console.log("anulowałem");
					sendAgain.classList.remove("hide");
					deleteInvoice.classList.remove("hide");
					corectInput.classList.remove("hide");
					imageInvoice.classList.add("hide");
					titleDeleteInv.remove();
					deleteCancelDiv.remove();
				});

				deleteCancelDiv.append;
				deleteCancelDiv.append(deleteInv);
				deleteCancelDiv.append(cancelCorect);
				imageInvoice.append(deleteCancelDiv);
			});
			deleteInput.classList.add("inputSubmit");
			deleteInput.setAttribute("type", "submit");
			deleteInput.setAttribute("value", "USUŃ FAKTURĘ");
			if (localStorage.getItem("right/HC24") == "Pracownik")
				deleteInput.disabled = true;

			deleteInvoice.appendChild(deleteInput);

			new_line.innerHTML +=
				`<p class="invName">F: ${inv[0]}</p>
						
						<section id="${inv[0]}" class="invoice container hide">
						<img id="invoiceImg" src="invoiceFiles/${inv[1]}" alt=" Brak pliku dla tej faktury Home Care 24">
						</section>
						
						
						` +
				contentCostsObject +
				`<p class="invFile" style="text-overflow: ellipsis;">Plik: <a href="./invoiceFiles/${inv[1]}" target="_blank" class="newOkn" style="color: ${inv[8]}">${inv[1]}</a></p>`;
			// `<hr class="lineListInv">`;

			let anchorInvoice = document.createElement("div");
			anchorInvoice.classList.add("anchorInvoice");
			anchorInvoice.id = "miniMenu/" + inv[0];
			miniMenuDiv.appendChild(sendAgain);
			miniMenuDiv.appendChild(corectDiv);
			miniMenuDiv.appendChild(deleteInvoice);

			invoicesSection.appendChild(anchorInvoice);
			invoicesSection.appendChild(miniMenuDiv);
			// invoicesSection.prepend(new_line);
			invoicesSection.appendChild(new_line);
			let lineSeparator = document.createElement("hr");
			lineSeparator.classList.add("lineListInv");
			invoicesSection.appendChild(lineSeparator);
			// invoicesSection.innerHTML +=  `<hr class="lineListInv">`;
			// invoicesSection.prepend(miniMenuDiv);
			// invoicesSection.appendChild(miniMenuDiv);
			// invoicesSection.prepend(anchorInvoice);
			// invoicesSection.appendChild(anchorInvoice);
		}
	});
}
// widok listy faktur

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
		sendMailAllegroBtn.classList.add("hide");
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

// wysyłanie faktury mailem
try {
	sendMailBtn.addEventListener("click", () => {
		// console.log(listCostsObject);
		let content = "";
		if (!inv.idInvoice) {
			content += "Nie ma faktury !!! \r\n";
			// console.log("nie ma faktury");
			// console.log(inv.listCostsObject);
		} else {
			// console.log("JEEEEST");
			// console.log(inv.idInvoice);
			// console.log(inv.listCostsObject);
			// listCostsObject = [];

			inv.listCostsObject.forEach((invElement) => {
				// console.log(invElement.building);
				// console.log(invElement.numberInv);
				content +=
					"pozycja nr " +
					invElement.numberInv +
					"  dla osiedla  " +
					invElement.building +
					",\r\n";
			});
		}
		// console.log(content);
		const dataMail = {
			NameUser: localStorage.getItem("name/HC24"),
			// NameUser: localStorage.getItem("nick/HC24"),
			NameFile: inv.nameFile,
			ContentMail: content,
		};
		// console.log(dataMail);
		$.post(
			"./php/sendInvoiceMail.php",
			dataMail,
			function (data) {
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
				// console.log("to jest wysłane: " + data.nick);
				// console.log("error: " + data.error);
				console.log("Info: " + data.error);
				// console.log("Wysłał maila: " + data.nick);
				whoseCosts.classList.add("hide");
				listCostsObjectDiv.innerHTML = "";
				titleInvoceH2.classList.add("hide");
				nameFile.innerHTML = "";
				invoiceImg.src = "invoices/nowaFaktura3.jpg";
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
			},
			"json"
		).fail(function () {
			alert("Błąd reakcji z sendInvoiceMail.php");
		});
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("sendMailBtn - nie jest zdefiniowany.");
	}
}
// wysyłanie faktury mailem

// wysyłanie maila z Allegro
try {
	sendMailAllegroBtn.addEventListener("click", () => {
		const dataMail = {
			NameUser: localStorage.getItem("name/HC24"),
			NameFile: inv.nameFile,
		};
		// console.log(dataMail);
		$.post(
			"./php/sendMailAllegro.php",
			dataMail,
			function (data) {
				// console.log("Info: " + data.error);
				// console.log("Wysłał maila: " + data.nick);
				whoseCosts.classList.add("hide");
				listCostsObjectDiv.innerHTML = "";
				titleInvoceH2.classList.add("hide");
				nameFile.innerHTML = "";
				invoiceImg.src = "invoices/nowaFaktura3.jpg";
			},
			"json"
		).fail(function () {
			alert("Błąd reakcji z sendInvoiceMail.php");
		});
	});
} catch (e) {
	if (e instanceof ReferenceError) {
		console.log("sendMailBtn - nie jest zdefiniowany.");
	}
}
// wysyłanie maila z Allegro

// główny moduł
const app = new AppInvoice({
	invoiceWrapper: invoiceImg,
	nameFileWrapper: nameFile,
	listCostsWrapper: listCostsObjectDiv,
	whoseCostsWrapper: whoseCosts,
});

let inv = new Invoice({});
let news = new Newscast({});
inv.listCostsObject = listCostsObject;
let infoInv = new InfoInvoice({});

app.run(inv, infoInv);
