export let AppInvoice = class AppInvoice {
	constructor({ invoiceWrapper, nameFileWrapper, whoseCostWrapper }) {
		this.invoiceWrapper = invoiceWrapper;
		this.nameFileWrapper = nameFileWrapper;
		this.whoseCostWrapper = whoseCostWrapper;
	}

	writeLine(line) {
		console.log(line);
	}

	run(inv, infoInv, listCostsObject) {
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
		this.invoiceWrapper.src = "invoices/nowaFaktura2.jpg";
		console.log(this.nameFileWrapper);

		let inputNewInvoiceFile = document.getElementById("newInvoiceFile");
		inputNewInvoiceFile.value = "";
		inputNewInvoiceFile.addEventListener("change", () => {
			document.getElementById("formNewInvoiceFile").submit();
			console.log(inputNewInvoiceFile);
			// console.log(this.whoseCostWrapper);
			this.invoiceWrapper.src = URL.createObjectURL(
				inputNewInvoiceFile.files[0]
			);
			console.log(URL.createObjectURL(inputNewInvoiceFile.files[0]));
			const dataSave = {
				Nick: localStorage.getItem("nick/HC24"),
				NameUser: localStorage.getItem("name/HC24"),
				NameFile: inputNewInvoiceFile.files[0].name,
			};
			saveInvoiceInBase(dataSave, this.nameFileWrapper, this.whoseCostWrapper, inv, listCostsObject);
		});

		let inputNewInvoiceFoto = document.getElementById("newInvoiceFoto");
		inputNewInvoiceFoto.value = "";
		inputNewInvoiceFoto.addEventListener("change", () => {
			document.getElementById("formNewInvoiceFoto").submit();
			// console.log(inputNewInvoiceFoto);
			this.invoiceWrapper.src = URL.createObjectURL(
				inputNewInvoiceFoto.files[0]
			);
			console.log(inputNewInvoiceFoto.files[0].name);
			const dataSave = {
				Nick: localStorage.getItem("nick/HC24"),
				NameUser: localStorage.getItem("name/HC24"),
				NameFile: inputNewInvoiceFoto.files[0].name,
			};
			saveInvoiceInBase(dataSave, this.nameFileWrapper, this.whoseCostWrapper, inv, listCostsObject);
		});


        function saveInvoiceInBase(dataSave, wrapper, whoseCostWrapper, inv, listCostsObject) {
            $.post(
                "./php/saveInvoiceFile.php",
                dataSave,
                function (data) {
                    if (!data.error) {
                        console.log("Zarejestrowano nową fakturę: " + data.idInvoice);
						inv.infoThis();
                    } else {
                        console.log(data.error + " - " + data.idInvoice);
						inv.idInvoice = data.idInvoice;
						inv.nameFile = data.nameFile;
						inv.uploadDate = data.currentDate;
						inv.whoUpload = data.nick;
						console.log(inv);
						console.log(wrapper);
						wrapper.innerText = inv.idInvoice;
				// zapis po wybraniu osiedla
						let nextInv = 1;
						infoInv.writeForm(whoseCostWrapper, nextInv, infoInv, inv, listCostsObject);
                    }
                },
                "json"
            ).fail(function () {
                alert("Błąd reakcji z saveInvoiceFile.php");
            });
        }
	}



};
