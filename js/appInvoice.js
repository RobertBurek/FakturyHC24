export let AppInvoice = class AppInvoice {
	constructor({
		invoiceWrapper,
		nameFileWrapper,
		listCostsWrapper,
		whoseCostsWrapper,
	}) {
		this.invoiceWrapper = invoiceWrapper;
		this.nameFileWrapper = nameFileWrapper;
		this.listCostsWrapper = listCostsWrapper;
		this.whoseCostsWrapper = whoseCostsWrapper;
	}

	writeLine(line) {
		console.log(line);
	}

	run(inv, infoInv) {
	// run(inv, infoInv, listCostsObject) {
		// this.wreteLine(inv);
		// inv.infoThis();

		// infoInv.infoThis();
		// let nextInv = 5;
		// infoInv.writeForm(this.whoseCostWrapper, nextInv);

		// var s=document.getElementById("costsObject");
		// alert('Value przechowuje wartość: '+s.value);
		// alert('selectedIndex zwraca wartość: '+s.selectedIndex);
		// alert('length zwraca wartość: '+s.length);

		// this.writeLine(infoInv);
		// this.writeLine("wartość do wypisania");
		this.invoiceWrapper.src = "invoices/nowaFaktura3.jpg";
		// console.log(this.nameFileWrapper);

		let inputNewInvoiceFile = document.getElementById("newInvoiceFile");
		inputNewInvoiceFile.value = "";
		inputNewInvoiceFile.addEventListener("change", () => {
			document.getElementById("formNewInvoiceFile").submit();
			// inv.listCostsObject = [];
			this.listCostsWrapper.innerText = "";
			// console.log(inputNewInvoiceFile);
			// console.log(this.whoseCostWrapper);
			this.invoiceWrapper.src = URL.createObjectURL(
				inputNewInvoiceFile.files[0]
			);
			// console.log(URL.createObjectURL(inputNewInvoiceFile.files[0]));
			const dataSave = {
				Nick: localStorage.getItem("nick/HC24"),
				NameUser: localStorage.getItem("name/HC24"),
				NameFile: inputNewInvoiceFile.files[0].name,
			};
			saveInvoiceInBase(
				dataSave,
				this.nameFileWrapper,
				this.listCostsWrapper,
				this.whoseCostsWrapper,
				inv,
				// listCostsObject
			);
		});

		let inputNewInvoiceFoto = document.getElementById("newInvoiceFoto");
		inputNewInvoiceFoto.value = "";
		inputNewInvoiceFoto.addEventListener("change", () => {
			// const formNewInvoiceFoto = document.getElementById("formNewInvoiceFoto");
			document.getElementById("formNewInvoiceFoto").submit();
			// inv.listCostsObject = [];
			this.listCostsWrapper.innerText = "";
			// console.log(inputNewInvoiceFoto);
			this.invoiceWrapper.src = URL.createObjectURL(
				inputNewInvoiceFoto.files[0]
			);
			// console.log(inputNewInvoiceFoto.files[0].name);
			const dataSave = {
				Nick: localStorage.getItem("nick/HC24"),
				NameUser: localStorage.getItem("name/HC24"),
				NameFile: inputNewInvoiceFoto.files[0].name,
			};
			saveInvoiceInBase(
				dataSave,
				this.nameFileWrapper,
				this.listCostsWrapper,
				this.whoseCostsWrapper,
				inv,
				// listCostsObject
			);
		});

		function saveInvoiceInBase(
			dataSave,
			wrapper,
			listCostsWrapper,
			whoseCostsWrapper,
			inv,
			// listCostsObject
		) {
			// listCostsObject = [];
			// console.log(dataSave);
			$.post(
				"./php/saveInvoiceFile.php",
				dataSave,
				function (data) {
					if (!data.error) {
						// console.log("Zarejestrowano nową fakturę: " + data.idInvoice);
						inv.infoThis();
					} else {
						// console.log(data.error + " - " + data.idInvoice);
						inv.idInvoice = data.idInvoice;
						inv.nameFile = data.nameFile;
						inv.uploadDate = data.currentDate;
						inv.whoUpload = data.nick;
						// console.log(inv);
						// console.log(wrapper);
						wrapper.innerText = inv.idInvoice;
						document.getElementById("fakturaH2").classList.remove("hide");
						whoseCostsWrapper.classList.remove("hide");
						// zapis po wybraniu osiedla
						inv.listCostsObject = [];
						let nextInv = 1;
						infoInv.writeForm(
							whoseCostsWrapper,
							listCostsWrapper,
							nextInv,
							infoInv,
							inv,
							// listCostsObject
						);
					}
				},
				"json"
			).fail(function () {
				alert("Błąd reakcji z saveInvoiceFile.php");
			});
		}
	}
};
