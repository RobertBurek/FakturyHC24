export let Protocol = class Protocol {
	constructor({ idProtocol, nameFile, uploadDate, whoUpload, protocolWrapper }) {
		this.idProtocol = idProtocol;
		this.nameFile = nameFile;
		this.uploadDate = uploadDate;
		this.whoUpload = whoUpload;
		this.protocolWrapper = protocolWrapper;
	}

	writeLine(line) {
		console.log(line);
	}

	infoThis() {
		console.log(
			"idProtocol: " +
				this.idProtocol +
				", nameFile: " +
				this.nameFile +
				", uploadDate: " +
				this.uploadDate +
				", whoUpload: " +
				this.whoUpload +
				", listCostsObject: " +
				this.protocolWrapper
		);
	}

	deleteProtocol() {
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
			$.post("./php/deleteProtocol.php", dataDelInvoice, function (data) {
				console.log(`Usunięto protokół!!! `);
				console.log(data);
			}).fail(function () {
				alert("Błąd reakcji z deleteProtocol.php");
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

	run() {
		this.protocolWrapper.src = "protocols/nowyProtokol3.jpg";
		// console.log(this.nameFileWrapper);

		let inputNewProtocolFile = document.getElementById("newProtocolFile");
		inputNewProtocolFile.value = "";
		inputNewProtocolFile.addEventListener("change", () => {
			document.getElementById("formNewProtocolFile").submit();
			// inv.listCostsObject = [];
			// this.listCostsWrapper.innerText = "";
			// console.log(inputNewInvoiceFile);
			// console.log(this.whoseCostWrapper);
			this.protocolWrapper.src = URL.createObjectURL(
				inputNewProtocolFile.files[0]
			);
			// console.log(URL.createObjectURL(inputNewInvoiceFile.files[0]));
			const dataSave = {
				Nick: localStorage.getItem("nick/HC24"),
				NameUser: localStorage.getItem("name/HC24"),
				NameFile: inputNewProtocolFile.files[0].name,
			};
            console.log(dataSave);
			saveProtocolInBase(
				dataSave,
				this.nameFileWrapper,
				this.protocolWrapper,
				// this
				// listCostsObject
			);
		});

		function saveProtocolInBase(
			dataSave,
			wrapper,
			// pro
			// listCostsObject
		) {
			// listCostsObject = [];
			// console.log(dataSave);
			$.post(
				"./php/saveProtocolFile.php",
				dataSave,
				function (data) {
					if (!data.error) {
						// console.log("Zarejestrowano nową fakturę: " + data.idInvoice);
						// pro.infoThis();
						this.infoThis();
					} else {
						// console.log(data.error + " - " + data.idInvoice);
						// pro.idProtocol = data.idProtocol;
						// pro.nameFile = data.nameFile;
						// pro.uploadDate = data.currentDate;
						// pro.whoUpload = data.nick;
						this.idProtocol = data.idProtocol;
						this.nameFile = data.nameFile;
						this.uploadDate = data.currentDate;
						this.whoUpload = data.nick;
						// console.log(inv);
						// console.log(wrapper);
						// wrapper.innerText = pro.idProtocol;
						wrapper.innerText = data.idProtocol;
						document.getElementById("protocolH2").classList.remove("hide");
						// whoseCostsWrapper.classList.remove("hide");
					}
				},
				"json"
			).fail(function () {
				alert("Błąd reakcji z saveProtocolFile.php");
			});
		}
	}




};
