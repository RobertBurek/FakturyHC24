export let Newscast = class Newscast {
	constructor({ idNews, estateNews, contentNews, dateNews, whoSave, saveDate, isDel, whoDel, dateDel  }) {
		this.idNews = idNews;
		this.estateNews = estateNews;
		this.contentNews = contentNews;
		this.dateNews = dateNews;
        this.whoSave = whoSave;
		this.saveDate = saveDate;
		this.isDel = isDel;
		this.whoDel = whoDel;
		this.dateDel = dateDel;
	}

	infoThis() {
		console.log(
			"idNews: " +
			this.idNews +
			", estateNews: " +
			this.estateNews +
			", contentNews: " +
			this.contentNews +
			", dateNews: " +
			this.dateNews +
            ", whoSave: " +
			this.whoSave +
			", saveDate: " +
			this.saveDate +
			", isDel: " +
			this.isDel +
			", whoDel: " +
			this.whoDel +
			", dateDel: " +
			this.dateDel
		);
	}

	saveNewscast() {
		// this.listCostsObject.forEach((newInfoInv) => {
			let dataSaveNewscast = {
                idNews :  this.idNews,
                estateNews :  this.estateNews,
                contentNews : this.contentNews,
                dateNews : this.dateNews,
                whoSave : this.whoSave,
                saveDate : this.saveDate,
                isDel : this.isDel,
                whoDel : this.whoDel,
                dateDel : this.dateDel


				// IdInvoice: newInfoInv.idInvoice,
				// Building: newInfoInv.building,
				// ItemInvoice: newInfoInv.numberInv,
				// Nick: newInfoInv.whoSaved,
				// // DateSave: newInfoInv.DateSave,
				// WhoSaved: localStorage.getItem("nick/HC24"),
			};
			// if (dataSaveNewInfoInvoice.Building == "Brak")
			// 	dataSaveNewInfoInvoice.Building = "KOSZTY HC24";
			console.log(dataSaveNewscast);
			$.post(
				"./php/saveNewscast.php",
				dataSaveNewscast,
				function () {
					console.log(`zapisałem nowe czynności do bazy dla osiedla !!! `);
					// console.log(data);
				}
			).fail(function () {
				alert("Błąd reakcji z saveNewscast.php");
			});
		// });
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
