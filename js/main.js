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
					<div class="vstack justify-content-center">
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
		const cardListHtml = `
		<li class="list-group-item hstack">
			<div class="flex-fill">
				<div class="fw-bold">
					${colorData.ucra}<span class="text-phoneme">${colorData.phoneme}</span>
				</div>
				<div>
					${colorData.espa}
				</div>
			</div>
			<div class="p-2" data-media-url="${colorData.audio}">
				<i class="bi bi-play-circle-fill fs-4 isMediaChild"></i>
			</div>
		</li>`;

		const li = this.createElementFromHTML(cardListHtml)

		this.listUlWrapper.appendChild(li)
	}

	createElementFromHTML(htmlString) {
		var div = document.createElement('div');
		div.innerHTML = htmlString.trim();
		return div.firstChild;
	}
}

class StartTestForm {
	formLessonSelectId = 'lessonSelect'

	lessonOptions
	lessonSelect
	lessonLabel
	lessonButton

	constructor() {
		this.lessonButton = this.createLessonButton()
		this.lessonSelect = this.createLessonSelect()
		this.lessonLabel = this.createLessonLabel()

		this.createLayout()
	}

	createLessonButton() {
		const button = document.createElement('button')
		button.classList.add('btn', 'btn-primary', 'w-100')
		button.innerText = 'Empezar'
		button.setAttribute('disabled', 'disabled')
		button.addEventListener('click', (e) => {
			const lessonId = this.lessonSelect.value
			const testEvent = new CustomEvent('startTest', {
				detail: {
					'id': lessonId
				}
			})
			document.dispatchEvent(testEvent)
		})
		return button
	}

	createLessonLabel() {
		const label = document.createElement('label')
		label.setAttribute('for', this.formLessonSelectId)
		label.classList.add('form-label')
		label.innerText = 'Clase de test'
		return label
	}

	createLessonSelect() {
		const select = document.createElement('select')
		select.id = this.formLessonSelectId
		select.classList.add('form-select')
		this.addLessonOptions(select)
		this.addSelectEvent(select)
		return select
	}

	addLessonOptions(select) {
		select.options[0] = new Option('Selecciona clase...', 0, true)
		for (const [lessonKey, content] of Object.entries(allDataJsonData)) {
			const lessonName = content.title
			select.options[lessonKey] = new Option(lessonKey + '. ' + lessonName, lessonKey)
		}
	}

	addSelectEvent(select) {
		select.addEventListener('change', (e) => {
			if (e.target.value > 0) {
				this.lessonButton.removeAttribute('disabled')
			} else {
				this.lessonButton.setAttribute('disabled', 'disabled')
			}
		})
	}

	createLayout() {
		const cardSelectLabel = document.createElement('div')
		cardSelectLabel.classList.add('w-100')
		cardSelectLabel.appendChild(this.lessonLabel)
		cardSelectLabel.appendChild(this.lessonSelect)

		const cardButton = document.createElement('div')
		cardButton.appendChild(this.lessonButton)

		const card = document.createElement('div')
		card.classList.add('card', 'card-body', 'mb-3', 'd-flex', 'flex-column', 'gap-3', 'flex-sm-row', 'align-items-sm-center')
		card.appendChild(cardSelectLabel)
		card.appendChild(cardButton)

		const divGrid = document.createElement('div')
		divGrid.classList.add('col-12')
		divGrid.appendChild(card)

		document.getElementById('contentAppContainer').prepend(divGrid)
	}

	createElementFromHTML(htmlString) {
		var div = document.createElement('div');
		div.innerHTML = htmlString.trim();
		return div.firstChild;
	}
}

// Letters
for (const letter of alphabetJsonData) {
	new AlphabetTableRow(letter)
}

for (const [lessonKey, content] of Object.entries(allDataJsonData)) {
	const card = new CardComponent(lessonKey + '. ' + content.title, '', '', lessonKey, content.icon)
	card.create()
	const cardList = new CardListComponent(card, lessonKey)
	cardList.create()

	for (const elementData of Object.values(content.content)) {
		cardList.addElement(elementData)
	}
}

const startTestForm = new StartTestForm()

// document.addEventListener("DOMContentLoaded", () => {
// 	const audioBaseUrl = "https://www.lingohut.com/flash/lht/mp3/600001/"
// 	document.addEventListener('click', (e) => {
// 		let target = e.target
// 		if (target.hasAttribute('data-media-url') || target.classList.contains('isMediaChild')) {
// 			target = target.classList.contains('isMediaChild') ? target.closest('div') : target
// 			const url = audioBaseUrl + target.dataset.mediaUrl + '.mp3'
// 			const audio = new Audio(url)
// 			audio.play()
// 		}
// 	})
// })