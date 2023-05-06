export let Invoice = class Invoice {
	constructor({ idInvoice, nameFile, uploadDate, whoUpload, listCostsObject}) {
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

	deleteInfoInvoices(listCosts) {
		listCosts.forEach(costs => {
			const dataDelInfoInvoice = {
				// Building: this.building,
				Nick: this.whoUpload,
				IdInvoice: this.idInvoice,
				NextInv: costs[0],
			};
			// console.log(dataDelInfoInvoice);
			$.post(
				"./php/deleteInfoInvoices.php",
				dataDelInfoInvoice,
				function () {
					console.log(`Usunięto pozycję kosztów z faktury `);
					// console.log(data);
				}
			).fail(function () {
				alert("Błąd reakcji z deleteInfoInvoices.php");
			});
		});
	}
};
