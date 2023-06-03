export let Invoice = class Invoice {
	constructor({ idInvoice, nameFile, uploadDate, whoUpload, listCostsObject }) {
		this.idInvoice = idInvoice;
		this.nameFile = nameFile;
		this.uploadDate = uploadDate;
		this.whoUpload = whoUpload;
		this.listCostsObject = listCostsObject;
	}

	writeLine(line) {
		console.log(line);
	}

	infoThis() {
		console.log(
			"idInvoice: " +
				this.idInvoice +
				", nameFile: " +
				this.nameFile +
				", uploadDate: " +
				this.uploadDate +
				", whoUpload: " +
				this.whoUpload +
				", listCostsObject: " +
				this.listCostsObject
		);
	}

	saveNewListInfoInvoices() {
		this.listCostsObject.forEach((newInfoInv) => {
			let dataSaveNewInfoInvoice = {
				IdInvoice: newInfoInv.idInvoice,
				Building: newInfoInv.building,
				ItemInvoice: newInfoInv.numberInv,
				Nick: newInfoInv.whoSaved,
				// DateSave: newInfoInv.DateSave,
				WhoSaved: localStorage.getItem("nick/HC24"),
			};
			if (dataSaveNewInfoInvoice.Building == "Brak")
				dataSaveNewInfoInvoice.Building = "KOSZTY HC24";
			console.log(dataSaveNewInfoInvoice);
			$.post(
				"./php/saveNewInfoInvoices.php",
				dataSaveNewInfoInvoice,
				function () {
					console.log(`zapisałem nowe pozycje kosztów fakturze!!! `);
					// console.log(data);
				}
			).fail(function () {
				alert("Błąd reakcji z saveNewInfoInvoices.php");
			});
		});
	}

	deleteInfoInvoices(listCosts) {
		// const deletedInfoInv = new Promise((resolve, reject) => {
		// 	console.log("robie promese");
		listCosts.forEach((costs) => {
			const dataDelInfoInvoice = {
				// Building: this.building,
				Nick: this.whoUpload,
				// Nick: localStorage.getItem("nick/HC24"),
				IdInvoice: this.idInvoice,
				NextInv: costs[0],
			};
			console.log(dataDelInfoInvoice);
			$.post("./php/deleteInfoInvoices.php", dataDelInfoInvoice, function () {
				console.log(`Usunięto pozycję kosztów z faktury `);
				// console.log(data);
			}).fail(function () {
				alert("Błąd reakcji z deleteInfoInvoices.php");
			});
		});
		// resolve("Jest OK !!!");
		// });

		// deletedInfoInv.then(result => {
			// console.log("jestem po");

			setTimeout(() => { 
				this.saveNewListInfoInvoices();
			}, 500);
		// this.saveNewListInfoInvoices();
		// console.log(result)
		// });
	}

	deleteInvoice() {
		// const deletedInfoInv = new Promise((resolve, reject) => {
		// 	console.log("robie promese");
		// listCosts.forEach((costs) => {
			const dataDelInvoice = {
				// Building: this.building,
				Nick: this.whoUpload,
				// Nick: localStorage.getItem("nick/HC24"),
				IdInvoice: this.idInvoice,
				// NextInv: costs[0],
			};
			console.log(dataDelInvoice);
			$.post("./php/deleteInvoice.php", dataDelInvoice, function (data) {
				console.log(`Usunięto fakturę !!! `);
				console.log(data);
			}).fail(function () {
				alert("Błąd reakcji z deleteInfoInvoices.php");
			});
		// });
		// resolve("Jest OK !!!");
		// });

		// deletedInfoInv.then(result => {
			// console.log("jestem po");

			// setTimeout(() => { 
			// 	this.saveNewListInfoInvoices();
			// }, 500);
		// this.saveNewListInfoInvoices();
		// console.log(result)
		// });
	}
};
