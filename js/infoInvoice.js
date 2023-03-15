export let InfoInvoice = class InfoInvoice {
	constructor({
		idInvoice,
		building,
		numberInv,
		whoSaved,
		isItSaved,
		dateSaved,
		isItSent,
		whoseInv,
		isItDelete,
		whoDelete,
		dateDelete,
	}) {
		this.idInvoice = idInvoice;
		this.building = building;
		this.numberInv = numberInv;
		this.whoSaved = whoSaved;
		this.isItSaved = isItSaved;
		this.dateSaved = dateSaved;
		this.isItSent = isItSent;
		this.whoseInv = whoseInv;
		this.isItDelete = isItDelete;
		this.whoDelete = whoDelete;
		this.dateDelete = dateDelete;
	}

	writeLine(line) {
		console.log(line);
	}

	infoThis() {
		console.log(
			"building: " +
				this.building +
				", whoSaved: " +
				this.whoSaved +
				", isItSent: " +
				this.isItSent +
				", whoseInv: " +
				this.whoseInv
		);
	}

	saveInfoInvoices() {}

	writeForm(whoseCostWrapper, nextInv, infoInv, inv, listCostsObject) {
		// this.infoThis();
		// console.log(whoseCostWrapper);
		// console.log(nextInv);
		// console.log(infoInv);
		// console.log(inv);
		let my_form = document.createElement("FORM");
		my_form.innerHTML =
			"<p>" +
			"<label>" +
			"	Pozycja " +
			nextInv +
			" na fakturze:" +
			'	<select id="mySelect" name="costsObject" class="selectEnabled">' +
			"		<option>Brak</option>" +
			"		<option>Budrysów 11/13</option>" +
			"		<option>Cybernetyli 4a</option>" +
			"		<option>Cybernetyki 6</option>" +
			"		<option>Dzielna 78</option>" +
			"		<option>Grochowska 105</option>" +
			"		<option>Kapelanów AK 1</option>" +
			"		<option>Lucerny 93</option>" +
			"		<option>KOSZTY HC24</option>" +
			"		<option>Postępu 12</option>" +
			"		<option>Polna 3</option>" +
			"		<option>Promienna 33</option>" +
			"		<option>Skoroszewska 4</option>" +
			"		<option>Ziemowita 4</option>" +
			"		<option>Ziemowita 4a</option>" +
			"		<option>Wilanowska 105</option>" +
			"	</select>" +
			"</label>" +
			"</p>";
		my_form.name = "myForm" + nextInv;
		// my_form.method = "POST";
		// my_form.action = "./php/saveInfoInvoces.php";
		// whoseCostWrapper.appendChild(my_form);
		// whoseCostWrapper.prepend(my_form);
		whoseCostWrapper.prepend(my_form);
		document.getElementById("mySelect").onchange = function () {
			this.building = document.getElementById("mySelect").value;
			console.log(this.building);
			this.disabled = true;
			this.classList.remove("selectEnabled");
			this.classList.add("selectDisabled");

			// console.log(localStorage.getItem("name/HC24"));
			// console.log(localStorage.getItem("nick/HC24"));
			// console.log(localStorage.getItem("right/HC24"));
			// nextInv += 1;
			const dataInvoce = {
				Building: this.building,
				Nick: localStorage.getItem("nick/HC24"),
				IdInvoice: inv.idInvoice,
				NextInv: nextInv,
			};
			console.log(dataInvoce);
			nextInv += 1;
			// console.log(inv);
			// console.log(inv.idInvoice);
			$.post(
				"./php/saveInfoInvoces.php",
				dataInvoce,
				function (data) {
					console.log(`Zapisano fakturę poz.${data.numberInv}: ` + data.error);
					console.log(data);

					// listCostsObject.push(
						let newInfoInvoce = new InfoInvoice('','','','','','','','','','','');
							newInfoInvoce.idInvoice = data.idInvoice,
							newInfoInvoce.building = data.building,
							newInfoInvoce.numberInv = data.numberInv,
							newInfoInvoce.whoSaved = data.whoSaved,
							newInfoInvoce.isItSaved = data.isItSaved,
							newInfoInvoce.dateSaved = data.dateSaved,
							newInfoInvoce.isItSent = data.isItSent,
							newInfoInvoce.whoseInv = data.whoseInv,
							newInfoInvoce.isItDelete = data.isItDelete,
							newInfoInvoce.whoDelete = data.whoDelete,
							newInfoInvoce.dateDelete = data.dateDelete
						// );
					// );
					console.log(newInfoInvoce);
					listCostsObject.push(newInfoInvoce);
					console.log(listCostsObject);

					infoInv.writeForm(
						whoseCostWrapper,
						nextInv,
						infoInv,
						inv,
						listCostsObject
					);

					// nextInv += 1;

					// 		console.log("Opis: " + data.error);
					// 		// 	localStorage.setItem("nick/JTS", data.nick);
					// 		// 	localStorage.setItem("nameTable/JTS", data.nameTable);
					// 		// 	loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
					// 		//     Witaj ${data.nick} ! <div class="dropdown-note" dropdown> (twoje wyniki) </div>`;
					// 		// 	appGame.saveScore();
					// 		// 	$.getScript("app/readScores.js").done(function () {
					// 		// 		console.log(
					// 		// 			`Odczyt wyników gracza: ${localStorage.getItem(
					// 		// 				"nick/JTS"
					// 		// 			)}   - readScores.js`
					// 		// 		);
					// 		// 	});
					// 		// } else {
					// 		// 	loggingButton.innerHTML = `<i class="fas fa-sign-in-alt" dropdown></i>
					// 		//     Logowanie <div class="dropdown-note" dropdown style="color:red;"> (${data.error})</div>`;
					// 		// }
					// 		alert("powinno być OK - saveInfoInvoces.php");
				},
				"json"
			).fail(function () {
				alert("Błąd reakcji z saveInfoInvoces.php");
			});
		};
	}
};
