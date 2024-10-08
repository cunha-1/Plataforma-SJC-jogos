const wordContainer = document.getElementById('word-container');
const lettersContainer = document.getElementById('letters-container');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset-btn');
const usedLettersElement = document.getElementById('used-letters'); // Novo elemento para letras usadas
const canvas = document.getElementById('hangman-canvas');
const ctx = canvas.getContext('2d');
const shiftButton = document.getElementById('shift-btn'); // Botão de Shift

let shiftPressed = false; // Variável para controlar se o Shift está ativo

// Adicionar evento ao botão Shift
shiftButton.addEventListener('click', function() {
    shiftPressed = true;
});

// Lista de palavras para o jogo
const words = [
    'João calábria', 
    'Verona', 
    'Itália', 
    'Trabalho', 
    'Padre', 
    'Igreja', 
    'Vocação', 
    'Infância', 
    'Adolescência', 
    'Pobreza'
];

let selectedWord = '';
let guessedLetters = [];
let maxWrongGuesses = 6;
let wrongGuesses = 0;

// Função para inicializar o jogo
function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    wrongGuesses = 0;
    messageElement.textContent = '';
    usedLettersElement.textContent = 'Letras usadas: '; // Resetar letras usadas
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpar o canvas

    displayWord();
    createLetterButtons();
}

// Função para exibir a palavra com letras adivinhadas
function displayWord() {
    wordContainer.innerHTML = '';
    const wordDisplay = selectedWord.split('').map(letter => 
        guessedLetters.includes(letter.toLowerCase()) ? letter : (letter === ' ' ? ' ' : '_')
    ).join(' ');
    wordContainer.textContent = wordDisplay;

    if (!wordDisplay.includes('_')) {
        messageElement.textContent = 'Parabéns, você ganhou!';
        disableLetters();
    }
}

// Função para criar os botões de letras
function createLetterButtons() {
    lettersContainer.innerHTML = '';
    const alphabet = 'abcdefghijklmnopqrstuvwxyzãâáàêéèíìõôóòûúù'.split('');
    
    alphabet.forEach(letter => {
        const button = document.createElement('button');
        button.classList.add('letter');
        button.textContent = letter;
        button.addEventListener('click', () => handleGuess(letter, button));
        lettersContainer.appendChild(button);
    });
}

// Função para lidar com o chute de uma letra
function handleGuess(letter, button) {
    button.disabled = true;

    // Converter para maiúscula se o Shift estiver ativo
    if (shiftPressed) {
        letter = letter.toUpperCase();
        shiftPressed = false; // Desativar o Shift após a primeira letra
    }

    // Adicionar a letra à lista de letras usadas (case-insensitive)
    if (!guessedLetters.includes(letter.toLowerCase())) {
        guessedLetters.push(letter.toLowerCase()); // Armazenar sempre em minúscula para evitar duplicatas
        usedLettersElement.textContent = 'Letras usadas: ' + guessedLetters.join(', ').toUpperCase(); // Exibir todas em maiúsculas para uniformidade
    }

    if (selectedWord.toLowerCase().includes(letter.toLowerCase())) { // Comparação case-insensitive
        displayWord();
    } else {
        wrongGuesses++;
        drawHangman(); // Desenhar a forca
        checkGameOver();
    }
}

// Função para desenhar o boneco da forca
function drawHangman() {
    ctx.strokeStyle = '#000'; 
    ctx.lineWidth = 2;

    switch (wrongGuesses) {
        case 1:
            ctx.beginPath();
            ctx.arc(100, 30, 20, 0, Math.PI * 2, true); 
            ctx.stroke();
            break;
        case 2:
            ctx.beginPath();
            ctx.moveTo(100, 50);
            ctx.lineTo(100, 120);
            ctx.stroke();
            break;
        case 3:
            ctx.beginPath();
            ctx.moveTo(100, 70);
            ctx.lineTo(70, 90);
            ctx.stroke();
            break;
        case 4:
            ctx.beginPath();
            ctx.moveTo(100, 70);
            ctx.lineTo(130, 90);
            ctx.stroke();
            break;
        case 5:
            ctx.beginPath();
            ctx.moveTo(100, 120);
            ctx.lineTo(70, 150);
            ctx.stroke();
            break;
        case 6:
            ctx.beginPath();
            ctx.moveTo(100, 120);
            ctx.lineTo(130, 150);
            ctx.stroke();
            break;
    }
}

// Função para verificar se o jogo acabou
function checkGameOver() {
    if (wrongGuesses >= maxWrongGuesses) {
        messageElement.textContent = `Você perdeu! A palavra era: ${selectedWord}`;
        disableLetters();
    }
}

// Função para desativar as letras após o jogo terminar
function disableLetters() {
    const buttons = document.querySelectorAll('.letter');
    buttons.forEach(button => button.disabled = true);
}

// Reiniciar o jogo
resetButton.addEventListener('click', initGame);

// Inicializar o jogo ao carregar a página
initGame();
