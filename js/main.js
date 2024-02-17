class AlphabetTableRow {
	constructor(letter) {
		this.c = letter.capital
		this.l = letter.lower
		this.u = letter.ucra
		this.p = letter.phoneme
		this.i = '<i class="bi bi-play-circle-fill fs-5"></i>'

		this.tr = document.createElement('tr')

		this.tableRowContainer = document.getElementById('tableRowContainer')
		this.generateRow()
	}

	generateRow() {
		// Fill Row
		this.addTd(this.c)
		this.addTd(this.l)
		this.addTd(this.u)
		this.addTd(this.p)
		this.addTd(this.i, true)
		// Add it to container
		this.tableRowContainer.appendChild(this.tr)
	}

	addTd(val, end = false) {
		const td = document.createElement('td')
		td.innerHTML = val
		if (end) {
			td.classList.add('text-end')
		}
		this.tr.appendChild(td)
	}
}

for (const letter of alphabetJsonData) {
	new AlphabetTableRow(letter)
}