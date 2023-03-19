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
};
