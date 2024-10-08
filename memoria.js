const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = true; // Inicialmente bloqueia o tabuleiro para a revelação inicial
let matchedPairs = 0;

// Array de frases motivacionais de São João Calábria
const motivationalPhrases = [
    "A verdadeira riqueza está no coração.",
    "Servir aos outros é a maior forma de louvor.",
    "A fé move montanhas.",
    "Cada gesto de bondade conta.",
    "A esperança é a luz que nunca se apaga.",
    "Com humildade, tudo é possível.",
    "A caridade é a essência do amor.",
    "Onde há amor, há vida."
];

// Função para virar a carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        // Primeira carta virada
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Segunda carta virada
    secondCard = this;
    checkForMatch();
}

// Função para verificar se há correspondência
function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
        matchedPairs++;
        if (matchedPairs === 8) {
            setTimeout(() => {
                displayMotivationalMessage();
            }, 500);
        }
    } else {
        unflipCards();
    }
}

// Desativa as cartas que deram match
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

// Vira as cartas de volta se não der match
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1000);
}

// Reseta as variáveis do tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Função para embaralhar as cartas manipulando o DOM
function shuffle() {
    const gameContainer = document.querySelector('.game-container');
    const cardsArray = Array.from(cards);
    const shuffledCards = shuffleArray(cardsArray);

    // Remover todas as cartas do contêiner
    while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
    }

    // Reapender as cartas embaralhadas
    shuffledCards.forEach(card => {
        gameContainer.appendChild(card);
    });
}

// Função auxiliar para embaralhar um array (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para exibir a mensagem motivacional
function displayMotivationalMessage() {
    const messageContainer = document.getElementById('motivational-message');
    const messageText = document.getElementById('motivational-text');

    // Seleciona uma frase aleatória
    const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
    const selectedPhrase = motivationalPhrases[randomIndex];

    messageText.textContent = selectedPhrase;
    messageContainer.classList.remove('hidden');
}

// Função para ocultar a mensagem motivacional
function hideMotivationalMessage() {
    const messageContainer = document.getElementById('motivational-message');
    messageContainer.classList.add('hidden');
}

// Função para reiniciar o jogo
function resetGame() {
    matchedPairs = 0;
    hasFlippedCard = false;
    firstCard = null;
    secondCard = null;
    lockBoard = true; // Bloqueia o tabuleiro durante o reset

    // Remove 'flipped' class e re-add event listeners
    cards.forEach(card => {
        card.classList.remove('flipped');
        card.removeEventListener('click', flipCard);
        card.addEventListener('click', flipCard);
    });

    // Embaralhar as cartas
    shuffle();

    // Re-exibir as cartas viradas por 3 segundos
    initialReveal();

    // Esconder a mensagem motivacional
    hideMotivationalMessage();
}

// Função para mostrar todas as cartas temporariamente ao iniciar o jogo
function initialReveal() {
    cards.forEach(card => {
        card.classList.add('flipped');
    });

    // Depois de 3 segundos, virar todas as cartas de volta
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.remove('flipped');
        });
        lockBoard = false; // Desbloqueia o tabuleiro após a revelação inicial
    }, 3000);
}

// Evento para o botão "Jogar Novamente"
const playAgainButton = document.getElementById('play-again');
playAgainButton.addEventListener('click', resetGame);

// Evento para o botão "Resetar Jogo"
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);

// Inicialização do jogo
(function initGame() {
    shuffle();
    initialReveal();
    // Adiciona o evento de clique a cada carta
    cards.forEach(card => card.addEventListener('click', flipCard));
})();
