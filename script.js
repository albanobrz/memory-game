const cardArray = [
    {
        id: 0,
        img: './imgs/tanjiro.png',
        name: 'tanjiro'
    },
    {
        id: 1,
        img: './imgs/inosuke.png',
        name: 'inosuke'
    },
    {
        id: 2,
        img: './imgs/zenitsu.png',
        name: 'zenitsu'
    },
    {
        id: 3,
        img: './imgs/nezuko.png',
        name: 'nezuko'
    },
    {
        id: 4,
        img: './imgs/muzan.png',
        name: 'muzan'
    },
    {
        id: 5,
        img: './imgs/urokodaki.png',
        name: 'urokodaki'
    },
    {
        id: 6,
        img: './imgs/rengoku.png',
        name: 'rengoku'
    },
    {
        id: 7,
        img: './imgs/tengen.png',
        name: 'tengen'
    },
    {
        id: 8,
        img: './imgs/tomioka.png',
        name: 'tomioka'
    },
    {
        id: 9,
        img: './imgs/daki.png',
        name: 'daki'
    },
    {
        id: 10,
        img: './imgs/gyutaro.webp',
        name: 'gyutaro'
    },
    {
        id: 11,
        img: './imgs/akaza.webp',
        name: 'akaza'
    },
    {
        id: 12,
        img: './imgs/shinobu.webp',
        name: 'shinobu'
    }
]

const memoryGame = document.querySelector('.memory-game')
let quant = prompt('Digite quantas cartas deseja jogar (numero par, de 6 à 18)')


// numero de cartas que o usuário quer
while (quant % 2 != 0 || quant > 18 || quant < 6) {
    alert('Digite um número par, entre 6 e 18')
    quant = prompt('Digite quantas cartas deseja jogar (numero par, de 6 à 18)')
}


// gerando vetor para cartas aleatórias, não embaralhadas
// função que gera um número aleatório não repetido no vetor
function generateRandom(chosen) {
    let random = parseInt(Math.random() * 13)
    return chosen.includes(random) ? generateRandom(chosen) : random
}


// função que cria o vetor e adiciona dois números, que representa as cartas
function generateNums(qtde) {
    let nums = Array(qtde).fill(0).reduce((nums) => {
        let newNum = generateRandom(nums)
        return [...nums, newNum, newNum]
    }, [])
    return nums
}


// embaralhando os lugares das cartas no vetor acima, com a função Fisher Yates
function fisherYatesShuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
let chosenRandom = []
chosenRandom = generateNums(quant / 2)
fisherYatesShuffle(chosenRandom)
console.log(chosenRandom)


// criação do board, com as cartas aleatórias
function createBoard(n, arr) {
    for (let i = 0; i < n; i++) {
        // criando a div que representa a carta
        let card = document.createElement('div')
        card.classList.add('cards')
        card.setAttribute('data-framework', cardArray[arr[i]].name)

        // criando a back-face da carta
        let imgBlank = document.createElement('img')
        imgBlank.setAttribute('src', './imgs/back-face.png')
        imgBlank.classList.add('back-face')

        // criando a front-face da carta
        let imgFront = document.createElement('img')
        imgFront.setAttribute('src', cardArray[arr[i]].img)
        imgFront.classList.add('front-face')

        memoryGame.appendChild(card)
        card.appendChild(imgBlank)
        card.appendChild(imgFront)
    }
}
createBoard(quant, chosenRandom)


// flip das cartas
const cards = document.querySelectorAll('.cards')

let hasFlippedCard = false
let lockBoard = false
let firstCard, secondCard

function flipCard() {
    if (lockBoard) return // tira bug de clicar rapido
    if (this === firstCard) return // tira bug de double click

    this.classList.add('flip')

    // pega a primeira e segunda carta
    if (hasFlippedCard == false) {
        hasFlippedCard = true
        firstCard = this
        return
    }

    hasFlippedCard = false
    secondCard = this

    checkForMatch()
}


// quando der match, desativa as cartas
let cont = 0
let endmsg = document.querySelector('.overlay')
let numberPlays = document.querySelector('.number-plays')

function disableCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)
    cont++

    // if para abrir o overlay para dar reset quando acaba de achar os pares
    if (cont == quant / 2) {
        endmsg.classList.remove('hidden')
        numberPlays.innerHTML = `Você terminou o jogo em ${plays + 1} jogadas`
        cont = 0
    }
}


// quando não é match, volta as duas cartas
function unflipCards() {
    lockBoard = true

    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        lockBoard = false
        firstCard = null
    }, 1000)
}


// verifica match
let plays = 0
function checkForMatch() {
    let match = firstCard.dataset.framework === secondCard.dataset.framework

    match ? disableCards() : unflipCards()
    plays++
}


// adiciona event listener pra cada div
cards.forEach(e => e.addEventListener("click", flipCard))


// botão para dar reload, gerando novos números e posições aleatórias
const oldBoard = document.querySelector('.memory-game')
const playAgain = document.querySelector('.play-again')

playAgain.addEventListener('click', newBoard)

function newBoard() {
    endmsg.classList.add('hidden')
    console.log('refresh')
    var element = document.querySelector('.memory-game')
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
    plays = 0
    chosenRandom = generateNums(quant / 2)
    fisherYatesShuffle(chosenRandom)

    console.log(chosenRandom)
    hasFlippedCard = false
    lockBoard = false
    createBoard(quant, chosenRandom)

    const cards = document.querySelectorAll('.cards')
    cards.forEach(e => e.addEventListener("click", flipCard))
}


// botão para atualizar o número de cartas sendo jogadas
let changeBtn = document.querySelector('.change-btn')
changeBtn.addEventListener('click', changeQuant)

function changeQuant() {
    let newQuant = document.querySelector('#new-quant')
    let quantValue = newQuant.value

    plays = 0
    cont = 0
    if (quantValue % 2 != 0 || quantValue > 18 || quantValue < 6) {
        return
    } else {
        quant = quantValue
        newBoard()
    }
}