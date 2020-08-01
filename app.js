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

function startGame() {
    const startNumberContainer = document.querySelector('.start-number')
    const remainderContainer = document.querySelector('.remainder')
    const timeOutContainer = document.querySelector('.timeout')
    const resultContainer = document.querySelector('.result')
    const choices = document.getElementsByName('playerNumber')
    let generatedNumber = generateStartNumber()
    let playerInput
    let computerInput
    let remainder

    startNumberContainer.innerHTML = `Your start number is ${generatedNumber}`

    choices.forEach(choice => {
        choice.onchange = () => {
            playerInput = getPlayerNumber(choice.value)
            computerInput = getComputerNumber()
            remainder

            if (playerInput) {
                remainder = getRemainder(generatedNumber, playerInput)
                remainderContainer.innerHTML = `${remainder} remaining`
                generatedNumber = remainder

                if (remainder === 0) {
                    timeOutContainer.innerHTML = 'Game over'
                    resultContainer.innerHTML = 'You lose'
                    return
                }
            }

            if (computerInput) {
                remainder = getRemainder(generatedNumber, computerInput)
                remainderContainer.innerHTML = `${remainder} remaining`
                generatedNumber = remainder

                if (remainder === 0) {
                    timeOutContainer.innerHTML = 'Game over'
                    resultContainer.innerHTML = 'You win'
                    return
                }
            }
        }
    })
}

startGame()
