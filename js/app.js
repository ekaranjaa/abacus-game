const minStartNumber = 20
const maxStartNumber = 30
const minSubtractNumber = 1
const maxSubtractNumber = 3

function generateStartNumber() {
    const startNumber = Math.round(Math.random() * maxStartNumber)

    if (startNumber < minStartNumber || startNumber > maxStartNumber) {
        return generateStartNumber(minStartNumber, maxStartNumber)
    }

    return startNumber
}

function getPlayerNumber(input) {
    const playerChoice = input

    return playerChoice
}

function getComputerNumber() {
    const computerChoice = Math.round(Math.random() * maxSubtractNumber)

    if (computerChoice < minSubtractNumber || computerChoice > maxSubtractNumber) {
        return getComputerNumber(minSubtractNumber, maxSubtractNumber)
    }

    return computerChoice
}

function getRemainder(n1, n2) {
    return n1 - n2 > 0 ? n1 - n2 : 0
}

function scrollPageUp() {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    })
}

function scrollPageDown() {
    window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
    })
}

function restartGame() {
    const resultElement = document.querySelector('.result')
    const timeOutElement = document.querySelector('.timeout')
    const remainderElement = document.querySelector('.remainder .content')
    const controls = document.querySelector('.controls')
    const restart = document.querySelector('.btn')
    const choices = document.getElementsByName('playerNumber')

    resultElement.innerHTML = ''
    timeOutElement.innerHTML = ''
    remainderElement.innerHTML = ''
    remainderElement.parentElement.open = false

    restart.classList.remove('active')
    controls.classList.add('active')

    choices.forEach(choice => {
        choice.checked = false
        choice.disabled = false
    })

    scrollPageUp()
    runGame()
}

function endGame(winner) {
    const controls = document.querySelector('.controls')
    const timeOutElement = document.querySelector('.timeout')
    const resultElement = document.querySelector('.result')
    const restart = document.querySelector('.btn')

    timeOutElement.innerHTML = 'Game over'
    controls.classList.remove('active')
    incrementScore(winner)

    if (winner === 'computer') {
        resultElement.innerHTML = 'You lost 😔'
    } else {
        resultElement.innerHTML = 'You won 😃'
    }

    scrollPageDown()
    setTimeout(() => {
        restart.classList.add('active')
        scrollPageDown()
    }, 1000)
}

function incrementScore(winner) {
    const scoreEl = document.querySelector(`.scores .${winner} span`)
    let score = Number(scoreEl.innerHTML)
    scoreEl.innerHTML = score + 1
}

function runGame() {
    const startNumberElement = document.querySelector('.start-number')
    const choices = document.getElementsByName('playerNumber')
    const remainderElement = document.querySelector('.remainder .content')

    let generatedNumber = generateStartNumber()
    let playerInput
    let computerInput
    let remainder

    startNumberElement.innerHTML = `Your start number is <span>${generatedNumber}</span>`

    choices.forEach(choice => {
        choice.onchange = () => {
            remainderElement.parentElement.open = true
            playerInput = getPlayerNumber(choice.value)
            computerInput = getComputerNumber()

            if (playerInput) {
                remainder = getRemainder(generatedNumber, playerInput)
                generatedNumber = remainder

                const remEl = document.createElement('div')
                remEl.className = 'rem'
                remEl.innerHTML = `
                    <p class="player-input">You: -${playerInput}</p>
                    <p class="computer-input">Remainder: ${remainder}</p>
                    <hr>
                `
                remainderElement.appendChild(remEl)

                if (remainder === 0) {
                    return endGame('computer')
                }

                choices.forEach(choice => {
                    choice.checked = false
                    choice.disabled = true
                })
                scrollPageDown()
            }

            setTimeout(() => {
                if (computerInput) {
                    remainder = getRemainder(generatedNumber, computerInput)
                    generatedNumber = remainder

                    const remEl = document.createElement('div')
                    remEl.className = 'rem'
                    remEl.innerHTML = `
                        <p class="player-input">Computer: -${computerInput}</p>
                        <p class="computer-input">Remainder: ${remainder}</p>
                        <hr>
                    `
                    remainderElement.appendChild(remEl)

                    if (remainder === 0) {
                        return endGame('player')
                    }

                    choices.forEach(choice => {
                        choice.disabled = false
                    })
                    scrollPageDown()

                    choices.forEach(choice => {
                        choice.disabled = false
                    })
                    scrollPageDown()
                }
            }, 1000);
        }
    })
}

runGame()
