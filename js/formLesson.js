class FormCard {
    lesson
    lessonQuestionsLength
    lessonIndex = 1

    cardContent
    progressStackBar
    formControll

    create() {
        // Main Card
        const card = document.createElement('div')
        card.classList.add('card', 'card-body', 'mb-3')
        // Title of Card
        const cardTitle = document.createElement('h5')
        cardTitle.classList.add('card-title')
        cardTitle.innerText = 'Test'
        // Subtitle of card
        const cardSubTitle = document.createElement('h6')
        cardSubTitle.classList.add('card-subtitle', 'text-secondary')
        cardSubTitle.innerText = this.lesson.title
        // An empty <div> for the content
        const cardContent = document.createElement('div')
        cardContent.id = 'test-card-content'
        cardContent.classList.add('pt-2')
        this.cardContent = cardContent
        // Append sections to Main Card
        card.appendChild(cardTitle)
        card.appendChild(cardSubTitle)
        card.appendChild(cardContent)
        // Add card after the selector of the lesson
        const appContainer = document.getElementById('contentAppContainer')
        appContainer.firstChild.appendChild(card)
        // Generate the different parts of the card
        this.generateProgressBar()
        this.generateForm()
        this.generateQuestionsButtons()
        this.generateNextButton()

        document.addEventListener('changeQuestion', (e) => {
            const newIndex = e.detail.index
            this.lessonIndex = newIndex
            const question = this.lesson.content[newIndex]
            document.dispatchEvent(new CustomEvent('newQuestion', {
                'detail': {
                    'index': newIndex,
                    'question': question,
                }
            }))
        })
    }

    generateProgressBar() {
        this.progressStackBar = new ProgressStackBar(this.lessonQuestionsLength)
        this.cardContent.appendChild(this.progressStackBar.stackBar)
    }

    generateForm() {
        this.formControll = new FormControll(
            this.lesson.content[this.lessonIndex].espa,
            this.lesson.content[this.lessonIndex].ucra,
            this.lessonIndex
        )
        this.cardContent.appendChild(this.formControll.label)
        this.cardContent.appendChild(this.formControll.inputGroup)
        this.cardContent.appendChild(this.formControll.helpMessage)
    }

    generateQuestionsButtons() {
        const stepperButtons = new StepperButtons(this.lessonQuestionsLength)
        this.stepperButtons = stepperButtons
        this.cardContent.appendChild(stepperButtons.container)
    }

    generateNextButton() {
        const button = document.createElement('button')
        button.classList.add('btn', 'btn-primary', 'float-end')
        button.innerText = 'Siguiente'
        button.addEventListener('click', (e) => {
            document.dispatchEvent(new CustomEvent('changeQuestion', {
                detail: {
                    index: this.lessonIndex + 1
                }
            }))
        })
        this.cardContent.appendChild(button)
    }

    setLesson(lesson) {
        this.lesson = lesson
        this.lessonQuestionsLength = Object.keys(this.lesson.content).length
    }

}

class StepperButtons {
    container
    numButtons
    buttons

    constructor(numButtons) {
        this.numButtons = numButtons
        this.buttons = []

        this.create()

        document.addEventListener('validationWord', (e) => {
            const index = e.detail.index
            const isCorrect = e.detail.correct
            let codeColor = isCorrect === true ? 1 : 0;
            this.changeColorButton(index, codeColor)
        })

        document.addEventListener('changeQuestion', (e) => {
            console.log(e);
            const newIndex = e.detail.index
            this.changeColorButton(newIndex - 1, 2)
        })
    }

    create() {
        const container = document.createElement('div')
        container.classList.add('d-flex', 'gap-3', 'py-3', 'overflow-x-auto')

        this.container = container

        this.generateButtons()
    }

    changeColorButton(index, codeColor) {
        const button = this.buttons[index]
        if (codeColor == 0) {
            button.addDanger()
        } else if (codeColor == 1) {
            button.addSuccess()
        } else if (codeColor == 2) {
            button.addSecondary()
        }
    }

    generateButtons() {
        for (let i = 0; i < this.numButtons; i++) {
            const button = new StepButton(i)
            this.buttons.push(button)
            this.container.appendChild(button.button)
        }
    }
}

class StepButton {
    index
    button

    constructor(index) {
        this.index = index + 1
        this.create()
        this.button.addEventListener('click', (e) => {
            document.dispatchEvent(new CustomEvent('changeQuestion', {
                detail: {
                    'index': this.index
                }
            }))
        })
    }

    create() {
        const button = document.createElement('button')
        button.innerText = this.index
        button.classList.add('btn', 'btn-sm')
        button.setAttribute('data-question-index', this.index)
        if (this.index == 1) {
            button.classList.add('btn-secondary')
        } else {
            button.classList.add('btn-outline-secondary')
        }
        this.button = button
    }

    addSecondary() {
        this.button.classList.remove('btn-danger', 'btn-outline-secondary', 'btn-danger')
        this.button.classList.add('btn-secondary')
    }

    addSuccess() {
        this.button.classList.remove('btn-secondary', 'btn-outline-secondary', 'btn-danger')
        this.button.classList.add('btn-success')
    }
    addDanger() {
        this.button.classList.remove('btn-secondary', 'btn-outline-secondary', 'btn-success')
        this.button.classList.add('btn-danger')
    }
}

class FormControll {
    correctAnswer
    labelText
    label
    input
    button
    inputGroup
    helpMessage

    messages = {
        'good': ['¡Weep!', '¡Wip!', 'дуже добре', 'добре', 'Oso ondo'],
        'bad': ['Oyoyoy', 'Uhm...', 'No no']
    }

    constructor(spaWord, ucraWord, lessonIndex) {
        this.labelText = spaWord
        this.correctAnswer = ucraWord
        this.lessonIndex = lessonIndex

        this.generateLabel()
        this.generateInput()
        this.generateButton()
        this.generateInputGroup()
        this.generateHelpMessage()

        this.button.addEventListener('click', (e) => this.checkWord())
        document.addEventListener('validationWord', (e) => {
            const isCorrect = e.detail.correct
            if (isCorrect) {
                this.correct()
            } else {
                this.wrong()
            }

            this.printMesssage(isCorrect)
        })

        document.addEventListener('newQuestion', (e) => {
            const question = e.detail.question
            const index = e.detail.index
            this.setLabel(question.espa)
            this.setCorrectAnswer(question.ucra)
            this.input.value = ''
            this.input.classList.remove('is-invalid', 'is-valid')
            this.lessonIndex = index
            this.helpMessage.innerText = ''
            this.helpMessage.classList.add('d-none')
        })
    }

    checkWord() {
        const word = this.input.value
        const lessonIndex = this.lessonIndex - 1

        let validation;
        if (word.toLowerCase().trim() == this.correctAnswer.toLowerCase().trim()) {
            validation = new CustomEvent('validationWord', {
                detail: {
                    'index': lessonIndex,
                    'correct': true
                }
            })
        } else {
            validation = new CustomEvent('validationWord', {
                detail: {
                    'index': lessonIndex,
                    'correct': false
                }
            })
        }
        document.dispatchEvent(validation)
    }

    correct() {
        this.input.classList.remove('is-invalid')
        this.input.classList.add('is-valid')
    }

    wrong() {
        this.input.classList.remove('is-valid')
        this.input.classList.add('is-invalid')
    }

    generateLabel() {
        const label = document.createElement('label')
        label.classList.add('form-label')
        label.setAttribute('for', 'lessonLabel')
        label.innerText = this.labelText
        this.label = label
    }

    printMesssage(isCorrect) {
        const availableMessages = isCorrect ? this.messages.good : this.messages.bad
        const randomElement = availableMessages[Math.floor(Math.random() * availableMessages.length)]
        this.helpMessage.classList.remove('d-none')
        if (isCorrect) {
            this.helpMessage.classList.add('text-success')
            this.helpMessage.classList.remove('text-danger')
        } else {
            this.helpMessage.classList.remove('text-success')
            this.helpMessage.classList.add('text-danger')
        }
        this.helpMessage.innerText = randomElement
    }

    generateHelpMessage() {
        const p = document.createElement('p')
        p.classList.add('d-none', 'mb-0')
        this.helpMessage = p
    }

    generateInput() {
        const input = document.createElement('input')
        input.classList.add('form-control')
        input.id = 'lessonLabel'
        input.type = 'text'
        this.input = input
    }

    generateButton() {
        const button = document.createElement('button')
        button.classList.add('btn', 'btn-outline-secondary')
        button.innerHTML = '<i class="bi bi-send-fill"></i>'
        this.button = button
    }

    generateInputGroup() {
        const inputGroup = document.createElement('div')
        inputGroup.classList.add('input-group')
        inputGroup.appendChild(this.input)
        inputGroup.appendChild(this.button)
        this.inputGroup = inputGroup
    }

    setLabel(labelText) {
        this.labelText = labelText
        this.label.innerText = labelText
    }

    setCorrectAnswer(correctAnswer) {
        this.correctAnswer = correctAnswer
    }
}

class ProgressBar {
    total
    value
    color
    bar

    constructor(total, color = null, value = 0) {
        this.total = total
        this.color = color
        this.value = value
    }

    startForm(e) {
        console.log(e);
    }

    setCorrects(numCorrect) {
        const width = (numCorrect * 100) / this.total;
        this.bar.style.width = `${width}%`
    }

    create() {
        const progress = document.createElement('div')
        progress.setAttribute('role', 'progressbar')
        progress.setAttribute('aria-label', '')
        progress.setAttribute('aria-valuenow', `${this.value}`)
        progress.setAttribute('aria-valuemin', '0')
        progress.setAttribute('aria-valuemax', `${this.total}`)
        progress.style.width = this.value

        const progressBar = document.createElement('div')
        progressBar.classList.add('progress-bar', 'h-100', 'progress-bar-striped', 'progress-bar-animated')
        if (this.color) progressBar.classList.add('bg-' + this.color)

        progress.appendChild(progressBar)

        this.bar = progress
        return progress
    }
}

class ProgressStackBar {
    stackBar
    correctBar
    worngBar

    total
    corrects
    wrong

    totalData

    constructor(total) {
        this.totalData = {}
        this.total = total
        this.correctBar = new ProgressBar(total, 'success')
        this.worngBar = new ProgressBar(total, 'danger')

        this.generateStackBar()
        document.addEventListener('validationWord', (e) => {
            const index = e.detail.index
            const isCorrect = e.detail.correct
            this.totalData[index] = isCorrect
            this.updateProgressBars()
        })
    }

    updateProgressBars() {
        let correct = 0
        let wrong = 0
        for (const [index, isCorrect] of Object.entries(this.totalData)) {
            if (isCorrect) {
                correct++;
            } else {
                wrong++;
            }
        }
        this.correctBar.setCorrects(correct)
        this.worngBar.setCorrects(wrong)

        this.stackBar.querySelector('#counterPositive').innerText = correct
        this.stackBar.querySelector('#counterNegative').innerText = wrong
        this.stackBar.querySelector('#counterTotal').innerText = `${correct + wrong}/${this.total}`
    }

    generateStackBar() {
        const stack = document.createElement('div')
        stack.classList.add('progress-stacked')

        stack.appendChild(this.correctBar.create())
        stack.appendChild(this.worngBar.create())

        const divCount = document.createElement('div')
        divCount.classList.add('d-flex', 'justify-content-between')
        const positive = document.createElement('span')
        positive.id = 'counterPositive'
        positive.innerText = '0'
        const total = document.createElement('span')
        total.innerText = `0/${this.total}`
        total.id = 'counterTotal'
        const negative = document.createElement('span')
        negative.innerText = '0'
        negative.id = 'counterNegative'

        divCount.appendChild(positive)
        divCount.appendChild(total)
        divCount.appendChild(negative)

        const container = document.createElement('div')
        container.appendChild(stack)
        container.appendChild(divCount)

        this.stackBar = container
    }
}

const formCard = new FormCard()

document.addEventListener(
    'startTest',
    (e) => {
        formCard.setLesson(allDataJsonData[e.detail.id])
        formCard.create()
    }
)