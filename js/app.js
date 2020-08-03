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

    if (playerChoice < minSubtractNumber || playerChoice > maxSubtractNumber) {
        alert(`Number must be in the range of ${minSubtractNumber} to ${maxSubtractNumber}. See game instructions for more`)
    }

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

function scrollPage() {
    window.scrollTo({
        top: document.body.scrollHeight,
        left: 100,
        behavior: 'smooth'
    })
}

function endGame(winner) {
    const controls = document.querySelector('.controls')
    const timeOutElement = document.querySelector('.timeout')
    const resultElement = document.querySelector('.result')
    const restart = document.querySelector('.btn')

    timeOutElement.innerHTML = 'Game over'
    controls.style.display = 'none'

    if (winner === 'computer') {
        resultElement.innerHTML = 'You lost 😔'
        resultElement.classList.add('active')
    } else {
        resultElement.innerHTML = 'You won 😃'
        resultElement.classList.add('active')
    }

    scrollPage()
    setTimeout(() => {
        restart.classList.add('active')
        scrollPage()
    }, 1000)

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
                scrollPage()
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
                    scrollPage()

                    choices.forEach(choice => {
                        choice.disabled = false
                    })
                    scrollPage()
                }
            }, 1000);
        }
    })
}

runGame()
