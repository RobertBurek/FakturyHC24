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
		listSelect,
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
		this.listSelect = listSelect;
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

	saveInfoInvoices() {
		const dataInvoice = {
			Building: this.building,
			Nick: this.whoSaved,
			IdInvoice: this.idInvoice,
			NextInv: this.numberInv,
		};
		// console.log(dataInvoice);
		$.post(
			"./php/saveInfoInvoices.php",
			dataInvoice,
			function (data) {
				// console.log(`Zapisano fakturę poz.${data.numberInv}: ` + data.error);
				console.log(data);
				// let newInfoInvoice = new InfoInvoice({});
				// newInfoInvoice.idInvoice = data.idInvoice;
				// newInfoInvoice.building = data.building;
				// newInfoInvoice.numberInv = data.numberInv;
				// newInfoInvoice.whoSaved = data.whoSaved;
				// newInfoInvoice.isItSaved = data.isItSaved;
				// newInfoInvoice.dateSaved = data.dateSaved;
				// newInfoInvoice.isItSent = data.isItSent;
				// newInfoInvoice.whoseInv = data.whoseInv;
				// newInfoInvoice.isItDelete = data.isItDelete;
				// newInfoInvoice.whoDelete = data.whoDelete;
				// newInfoInvoice.dateDelete = data.dateDelete;
				// console.log(newInfoInvoice);
				// inv.listCostsObject.push(newInfoInvoice);
				// console.log(inv.listCostsObject);
			},
			"json"
		).fail(function () {
			alert("Błąd reakcji z saveInfoInvoces.php");
		});
	}

	infoAllegro() {
		// this.listSelect.onchange = function () {
		// console.log(positionInfo+"/"+listCostsObject.length);
		const newInfoInvFlag = infoInv.building == "Brak" ? true : false;
		const currentValueSelect = document.getElementById(nameSelect).value;
		infoInv.building = currentValueSelect;
		const elementAbsence = document.getElementById("absence");
		elementAbsence.classList.add("hide");
		// console.log(infoInv);
		// this.disabled = true;
		// this.classList.remove("selectEnabled");
		// this.classList.add("selectDisabled");
		inv.listCostsObject[positionInfo - 1] = infoInv;
		if (inBase) infoInv.saveInfoInvoices();

		// console.log(inv.listCostsObject);
		// console.log(quantityInfoInv + "/" + inv.listCostsObject.length);
		// console.log(newInfoInvFlag);
		if (quantityInfoInv == inv.listCostsObject.length && newInfoInvFlag) {
			quantityInfoInv = quantityInfoInv + 1;
			newInfoInv.numberInv = quantityInfoInv;
			newInfoInv.writeForm(
				// whoseCostsWrapper,
				listCostsWrapper,
				quantityInfoInv,
				inv,
				inBase
			);

			// console.log(newInfoInv);
		}
	}

	writeForm(
		// whoseCostsWrapper,
		listCostsWrapper,
		quantityInfoInv,
		inv,
		inBase
	) {
		// console.log(this);
		// console.log(quantityInfoInv);
		// console.log(quantityInfoInv + "/" + inv.listCostsObject.length);
		let infoInv = this;
		let newInfoInv = new InfoInvoice({});
		newInfoInv.building = "Brak";
		newInfoInv.idInvoice = infoInv.idInvoice;
		newInfoInv.nick = infoInv.nick;
		newInfoInv.whoSaved = infoInv.whoSaved;
		newInfoInv.whoseInv = infoInv.whoseInv;
		this.listSelect = creatListSelect(this.numberInv, this.idInvoice);
		listCostsWrapper.prepend(this.listSelect);

		const nameSelect = this.idInvoice + "/mySelect/" + this.numberInv;
		const positionInfo = this.numberInv;

		this.listSelect.onchange = function () {
			// console.log(positionInfo+"/"+listCostsObject.length);
			const newInfoInvFlag = infoInv.building == "Brak" ? true : false;
			const currentValueSelect = document.getElementById(nameSelect).value;
			infoInv.building = currentValueSelect;
			const elementAbsence = document.getElementById("absence");
			elementAbsence.classList.add("hide");
			// console.log(infoInv);
			// this.disabled = true;
			// this.classList.remove("selectEnabled");
			// this.classList.add("selectDisabled");
			inv.listCostsObject[positionInfo - 1] = infoInv;
			if (inBase) infoInv.saveInfoInvoices();

			// console.log(inv.listCostsObject);
			// console.log(quantityInfoInv + "/" + inv.listCostsObject.length);
			// console.log(newInfoInvFlag);
			if (quantityInfoInv == inv.listCostsObject.length && newInfoInvFlag) {
				quantityInfoInv = quantityInfoInv + 1;
				newInfoInv.numberInv = quantityInfoInv;
				newInfoInv.writeForm(
					// whoseCostsWrapper,
					listCostsWrapper,
					quantityInfoInv,
					inv,
					inBase
				);

				// console.log(newInfoInv);
			}

			// }
		};

		function creatListSelect(nextInv, idInvoice) {
			let my_form = document.createElement("FORM");
			my_form.innerHTML =
				"<p>" +
				"<label>" +
				"	Pozycja " +
				nextInv +
				" na fakturze:" +
				'	<select id="' +
				idInvoice +
				"/mySelect/" +
				nextInv +
				'" name="costsObject" class="selectEnabled">' +
				'		<option id="absence">Brak</option>' +
				"		<option>Al. Krakowska 291</option>" +
				"		<option>Budrysów 11/13</option>" +
				"		<option>Cybernetyli 4a</option>" +
				"		<option>Cybernetyki 6</option>" +
				"		<option>Dzielna 78</option>" +
				"		<option>Grochowska 78</option>" +
				"		<option>Kapelanów AK 1</option>" +
				"		<option>Krzyżówki 36</option>" +
				"		<option>Lucerny 93</option>" +
				'		<option style="color:yellow;">KOSZTY HC24</option>' +
				"		<option>Postępu 12</option>" +
				"		<option>Polna 3</option>" +
				"		<option>Promienna 33</option>" +
				"		<option>Skoroszewska 4</option>" +
				"		<option>Tobruku 38</option>" +
				"		<option>Ziemowita 4</option>" +
				"		<option>Ziemowita 4a</option>" +
				"		<option>Wilanowska 105</option>" +
				"	</select>" +
				"</label>" +
				"</p>";
			my_form.name = "myForm" + nextInv;
			return my_form;
		}
	}
};

// ----------------------STARA WERSJA---------------------------

// // writeForm(whoseCostsWrapper, listCostsWrapper, nextInv, infoInv, inv, listCostsObject) {
// 	writeForm(whoseCostsWrapper, listCostsWrapper, nextInv, infoInv, inv) {
// 		if (nextInv == 1) {
// 			const dataInvoice = {
// 				Building: "KOSZTY HC24",
// 				Nick: localStorage.getItem("nick/HC24"),
// 				IdInvoice: inv.idInvoice,
// 				NextInv: 0,
// 			};
// 			// console.log(dataInvoice);
// 			$.post(
// 				"./php/saveInfoInvoices.php",
// 				dataInvoice,
// 				function (data) {
// 					// console.log(`Zapisano fakturę poz.${data.numberInv}: ` + data.error);
// 					// console.log(data);
// 					let newInfoInvoice = new InfoInvoice({});
// 					newInfoInvoice.idInvoice = data.idInvoice;
// 					newInfoInvoice.building = data.building;
// 					newInfoInvoice.numberInv = data.numberInv;
// 					newInfoInvoice.whoSaved = data.whoSaved;
// 					newInfoInvoice.isItSaved = data.isItSaved;
// 					newInfoInvoice.dateSaved = data.dateSaved;
// 					newInfoInvoice.isItSent = data.isItSent;
// 					newInfoInvoice.whoseInv = data.whoseInv;
// 					newInfoInvoice.isItDelete = data.isItDelete;
// 					newInfoInvoice.whoDelete = data.whoDelete;
// 					newInfoInvoice.dateDelete = data.dateDelete;
// 					// console.log(newInfoInvoice);
// 					inv.listCostsObject.push(newInfoInvoice);
// 					// console.log(inv.listCostsObject);
// 				},
// 				"json"
// 			).fail(function () {
// 				alert("Błąd reakcji z saveInfoInvoces.php");
// 			});
// 		}

// 		let my_form = document.createElement("FORM");
// 		my_form.innerHTML =
// 			"<p>" +
// 			"<label>" +
// 			"	Pozycja " +
// 			nextInv +
// 			" na fakturze:" +
// 			'	<select id="mySelect" name="costsObject" class="selectEnabled">' +
// 			"		<option>Brak</option>" +
// 			"		<option>Al. Krakowska 291</option>" +
// 			"		<option>Budrysów 11/13</option>" +
// 			"		<option>Cybernetyli 4a</option>" +
// 			"		<option>Cybernetyki 6</option>" +
// 			"		<option>Dzielna 78</option>" +
// 			"		<option>Grochowska 78</option>" +
// 			"		<option>Kapelanów AK 1</option>" +
// 			"		<option>Krzyżówki 36</option>" +
// 			"		<option>Lucerny 93</option>" +
// 			'		<option style="color: yellow;">KOSZTY HC24</option>' +
// 			"		<option>Postępu 12</option>" +
// 			"		<option>Polna 3</option>" +
// 			"		<option>Promienna 33</option>" +
// 			"		<option>Skoroszewska 4</option>" +
// 			"		<option>Tobruku 38</option>" +
// 			"		<option>Ziemowita 4</option>" +
// 			"		<option>Ziemowita 4a</option>" +
// 			"		<option>Wilanowska 105</option>" +
// 			"	</select>" +
// 			"</label>" +
// 			"</p>";
// 		my_form.name = "myForm" + nextInv;
// 		listCostsWrapper.prepend(my_form);
// 		document.getElementById("mySelect").onchange = function () {
// 			this.building = document.getElementById("mySelect").value;
// 			// console.log(this.building);
// 			this.disabled = true;
// 			this.classList.remove("selectEnabled");
// 			this.classList.add("selectDisabled");
// 			const dataInvoice = {
// 				Building: this.building,
// 				Nick: localStorage.getItem("nick/HC24"),
// 				IdInvoice: inv.idInvoice,
// 				NextInv: nextInv,
// 			};
// 			// console.log(dataInvoice);
// 			nextInv += 1;
// 			$.post(
// 				"./php/saveInfoInvoices.php",
// 				dataInvoice,
// 				function (data) {
// 					// console.log(`Zapisano fakturę poz.${data.numberInv}: ` + data.error);
// 					// console.log(data);
// 					let newInfoInvoice = new InfoInvoice({});
// 					newInfoInvoice.idInvoice = data.idInvoice;
// 					newInfoInvoice.building = data.building;
// 					newInfoInvoice.numberInv = data.numberInv;
// 					newInfoInvoice.whoSaved = data.whoSaved;
// 					newInfoInvoice.isItSaved = data.isItSaved;
// 					newInfoInvoice.dateSaved = data.dateSaved;
// 					newInfoInvoice.isItSent = data.isItSent;
// 					newInfoInvoice.whoseInv = data.whoseInv;
// 					newInfoInvoice.isItDelete = data.isItDelete;
// 					newInfoInvoice.whoDelete = data.whoDelete;
// 					newInfoInvoice.dateDelete = data.dateDelete;
// 					// console.log(newInfoInvoice);
// 					if (data.numberInv == 1) inv.listCostsObject[0]=newInfoInvoice;
// 					else inv.listCostsObject.push(newInfoInvoice);
// 					// console.log(inv.listCostsObject);

// 					infoInv.writeForm(
// 						whoseCostsWrapper,
// 						listCostsWrapper,
// 						nextInv,
// 						infoInv,
// 						inv,
// 						// listCostsObject
// 					);
// 				},
// 				"json"
// 			).fail(function () {
// 				alert("Błąd reakcji z saveInfoInvoces.php");
// 			});
// 		};
// 	}
