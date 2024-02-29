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

class CardComponent {
	title
	subTitle
	phoneme
	identifier
	contentAppContainer
	cardWrapper

	constructor(title, subTitle = null, phoneme = null, identifier, icon = null) {
		this.title = title
		this.subTitle = subTitle
		this.phoneme = phoneme
		this.identifier = identifier
		this.icon = icon

		this.contentAppContainer = document.getElementById('contentAppContainer')
	}

	create() {
		const cardHeaderHTML = `
			<div class="card-body p-0 clickable" data-bs-toggle="collapse" data-bs-target="#collapse${this.identifier}" aria-expanded="false" aria-controls="collapse${this.identifier}">
				<div class="card-header d-flex align-items-center gap-3">
					<i class="bi ${this.icon} fs-5"></i>
					<div class="vstack">
						<h5 class="card-title">
							${this.title}
							${this.phoneme ? '<span class="text-phoneme text-color-main-yellow">' + this.phoneme + '</span>' : ''}
						</h5>
						<h6 class="card-subtitle">
							${this.subTitle}
						</h6>
					</div>
					<i class="bi bi-chevron-down fs-4"></i>
				</div>
			</div>`;

		const gridContainer = document.createElement('div')
		gridContainer.classList.add('col-12', 'col-md-6', 'col-lg-4')

		const cardContent = document.createElement('div')
		cardContent.classList.add('card', 'text-bg-primary', 'mb-3')

		const cardWrapper = this.createElementFromHTML(cardHeaderHTML)

		cardContent.appendChild(cardWrapper)
		this.cardWrapper = cardContent
		gridContainer.appendChild(cardContent)
		this.contentAppContainer.appendChild(gridContainer)
	}

	createElementFromHTML(htmlString) {
		var div = document.createElement('div');
		div.innerHTML = htmlString.trim();
		return div.firstChild;
	}

	addListComponent(listComponent) {
		this.cardWrapper.appendChild(listComponent)
	}
}

class CardListComponent {
	card
	identifier
	listDivWrapper
	listUlWrapper

	constructor(card, identifier) {
		this.card = card
		this.identifier = identifier
	}

	create() {
		const listUlWrapper = document.createElement('ul')
		listUlWrapper.classList.add('list-group', 'list-group-flush')

		const listDivWrapper = document.createElement('div')
		listDivWrapper.classList.add('collapse')
		listDivWrapper.id = `collapse${this.identifier}`
		listDivWrapper.appendChild(listUlWrapper)

		this.listUlWrapper = listUlWrapper

		this.card.addListComponent(listDivWrapper)
	}

	addElement(colorData) {
		const li = document.createElement('li')
		li.classList.add('list-group-item', 'vstack')

		const liUcraTitle = document.createElement('div')
		liUcraTitle.classList.add('fw-bold')
		const liSpainValue = document.createElement('div')

		const phonemeSpan = document.createElement('span')
		phonemeSpan.classList.add('text-phoneme')
		phonemeSpan.innerText = colorData.phoneme

		liSpainValue.innerText = colorData.espa
		liUcraTitle.innerHTML = colorData.ucra
		liUcraTitle.appendChild(phonemeSpan)

		li.appendChild(liUcraTitle)
		li.appendChild(liSpainValue)

		this.listUlWrapper.appendChild(li)
	}
}

// Letters
for (const letter of alphabetJsonData) {
	new AlphabetTableRow(letter)
}

for (const [lessonKey, content] of Object.entries(allDataJsonData)) {
	const card = new CardComponent(lessonKey + '. ' + content.title, '', '', lessonKey, '')
	card.create()
	const cardList = new CardListComponent(card, lessonKey)
	cardList.create()

	for (const [elementKey, elementData] of Object.entries(content.content)) {
		cardList.addElement(elementData)
	}
}