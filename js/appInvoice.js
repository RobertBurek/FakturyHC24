export let AppInvoice = class AppInvoice {
	constructor({ invoiceWrapper, nameFileWrapper, whoseCostWrapper }) {
		this.invoiceWrapper = invoiceWrapper;
		this.nameFileWrapper = nameFileWrapper;
		this.whoseCostWrapper = whoseCostWrapper;
	}

	wreteLine(line) {
		console.log(line);
	}

	run(inv, infoInv) {
		// this.wreteLine(inv);
		inv.infoThis();
		infoInv.infoThis();
		infoInv.writeForm(this.whoseCostWrapper);
		// this.wreteLine(infoInv);
		// this.wreteLine("wartość do wypisania");
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
				Nick: localStorage.getItem("name/HC24"),
				NameFile: inputNewInvoiceFile.files[0].name,
			};
			saveInvoiceInBase(dataSave, this.nameFileWrapper);
		});

		let inputNewInvoiceFoto = document.getElementById("newInvoiceFoto");
		inputNewInvoiceFoto.value = "";
		inputNewInvoiceFoto.addEventListener("change", () => {
			document.getElementById("formNewInvoiceFoto").submit();
			console.log(inputNewInvoiceFoto);
			this.invoiceWrapper.src = URL.createObjectURL(
				inputNewInvoiceFoto.files[0]
			);
			console.log(inputNewInvoiceFoto.files[0].name);
			const dataSave = {
				Nick: localStorage.getItem("name/HC24"),
				NameFile: inputNewInvoiceFoto.files[0].name,
			};
			saveInvoiceInBase(dataSave, this.nameFileWrapper);
		});


        function saveInvoiceInBase(dataSave, wrapper) {
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
                    }
                },
                "json"
            ).fail(function () {
                alert("Błąd reakcji z saveInvoiceFile.php");
            });
        }
	}



};
