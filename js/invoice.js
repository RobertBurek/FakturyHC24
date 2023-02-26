export let Invoice = class Invoice {
	constructor({ idInvoice, nameFile, uploadDate, whoUpload }) {
		this.idInvoice = idInvoice;
		this.nameFile = nameFile;
		this.uploadDate = uploadDate;
		this.whoUpload = whoUpload;
	}

	wreteLine(line) {
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
				this.whoUpload
		);
	}
};
