/* no html coloca todas as cartas
faz um vetor aqui pra gerar numeros aleatorios 
adiciona a classe pra deixar invisivel as cartas que nao forem pra jogar
programa um tabuleiro preparado pra todas as cartas
 */

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
    }
]

const memoryGame = document.querySelector('.memory-game')
let quant = prompt('Digite quantas cartas deseja jogar (numero par, de 6 à 18)')

// numero de cartas que o usuário quer
while (quant % 2 != 0 || quant > 18 || quant < 6) {
    alert('Digite um número par, entre 6 e 18')
    quant = prompt('Digite quantas cartas deseja jogar (numero par, de 6 à 18)')
}


// criação do board
function createBoard(n) {
    for (let i = 0; i < n; i++) {
        let card = document.createElement('div')
        card.classList.add('cards')
        card.setAttribute('data-id', i)
        let imgBlank = document.createElement('img')
        imgBlank.setAttribute('src', './imgs/back-face.png')
        imgBlank.classList.add('back-face')
        memoryGame.appendChild(card)
        card.appendChild(imgBlank)
    }
}
createBoard(quant)


let chosen = []
function aleatorio() {
    let random = parseInt(Math.random() * 9)
    console.log(random)   
}


// gerando cartas em posições aleatórias
function bla() {
    let frontFace = document.createElement('img')
    frontFace.setAttribute('src', '') //aa?
    card.appendChild(frontFace)
}

// flip das cartas
const cards = document.querySelectorAll('.cards')

function flipCard() {
    /* console.log('teste')
    console.log(this) */
    this.classList.toggle('flip')
}

cards.forEach(e => e.addEventListener("click", flipCard))