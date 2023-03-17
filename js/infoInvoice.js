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
		if (nextInv == 1) {
			const dataInvoice = {
				Building: "KOSZTY HC24",
				Nick: localStorage.getItem("nick/HC24"),
				IdInvoice: inv.idInvoice,
				NextInv: nextInv,
			};
			console.log(dataInvoice);
			$.post(
				"./php/saveInfoInvoices.php",
				dataInvoice,
				function (data) {
					console.log(`Zapisano fakturę poz.${data.numberInv}: ` + data.error);
					console.log(data);
					let newInfoInvoice = new InfoInvoice({});
					newInfoInvoice.idInvoice = data.idInvoice;
					newInfoInvoice.building = data.building;
					newInfoInvoice.numberInv = data.numberInv;
					newInfoInvoice.whoSaved = data.whoSaved;
					newInfoInvoice.isItSaved = data.isItSaved;
					newInfoInvoice.dateSaved = data.dateSaved;
					newInfoInvoice.isItSent = data.isItSent;
					newInfoInvoice.whoseInv = data.whoseInv;
					newInfoInvoice.isItDelete = data.isItDelete;
					newInfoInvoice.whoDelete = data.whoDelete;
					newInfoInvoice.dateDelete = data.dateDelete;
					console.log(newInfoInvoice);
					listCostsObject.push(newInfoInvoice);
					console.log(listCostsObject);
				},
				"json"
			).fail(function () {
				alert("Błąd reakcji z saveInfoInvoces.php");
			});
		}

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
		whoseCostWrapper.prepend(my_form);
		document.getElementById("mySelect").onchange = function () {
			this.building = document.getElementById("mySelect").value;
			console.log(this.building);
			this.disabled = true;
			this.classList.remove("selectEnabled");
			this.classList.add("selectDisabled");
			const dataInvoice = {
				Building: this.building,
				Nick: localStorage.getItem("nick/HC24"),
				IdInvoice: inv.idInvoice,
				NextInv: nextInv,
			};
			console.log(dataInvoice);
			nextInv += 1;
			$.post(
				"./php/saveInfoInvoices.php",
				dataInvoice,
				function (data) {
					console.log(`Zapisano fakturę poz.${data.numberInv}: ` + data.error);
					console.log(data);
					let newInfoInvoice = new InfoInvoice({});
					newInfoInvoice.idInvoice = data.idInvoice;
					newInfoInvoice.building = data.building;
					newInfoInvoice.numberInv = data.numberInv;
					newInfoInvoice.whoSaved = data.whoSaved;
					newInfoInvoice.isItSaved = data.isItSaved;
					newInfoInvoice.dateSaved = data.dateSaved;
					newInfoInvoice.isItSent = data.isItSent;
					newInfoInvoice.whoseInv = data.whoseInv;
					newInfoInvoice.isItDelete = data.isItDelete;
					newInfoInvoice.whoDelete = data.whoDelete;
					newInfoInvoice.dateDelete = data.dateDelete;
					console.log(newInfoInvoice);
					if (data.numberInv == 1) listCostsObject[0]=newInfoInvoice;
					else listCostsObject.push(newInfoInvoice);
					console.log(listCostsObject);

					infoInv.writeForm(
						whoseCostWrapper,
						nextInv,
						infoInv,
						inv,
						listCostsObject
					);
				},
				"json"
			).fail(function () {
				alert("Błąd reakcji z saveInfoInvoces.php");
			});
		};
	}
};
