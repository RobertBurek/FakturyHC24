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

	wreteLine(line) {
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

	writeForm(whoseCostWrapper) {
		console.log(whoseCostWrapper);
		var form = document.createElement("FORM");
		form.innerHTML=
		'<p>'
		+'<label>'
		+'	Pozycja NR na fakturze:'
		+'	<select name="costsObject">'
		+'		<option>Budrysów 11/13</option>'
		+'		<option>Cybernetyli 4a</option>'
		+'		<option>Cybernetyki 6</option>'
		+'		<option>Grochowska 105</option>'
		+'		<option>Kapelanów AK 1</option>'
		+'		<option selected >KOSZTY HC24</option>'
		+'		<option>Postępu 12</option>'
		+'		<option>Polna 3</option>'
		+'		<option>Skoroszewska 4</option>'
		+'		<option>Ziemowita 4</option>'
		+'		<option>Ziemowita 4a</option>'
		+'		<option>Wilanowska 105</option>'
		+'	</select>'
		+'</label>'
	+'</p>';
	whoseCostWrapper.appendChild(form);
	}
};