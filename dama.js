const boardElement = document.getElementById('board');
const player1ScoreElement = document.getElementById('player1Score');
const player2ScoreElement = document.getElementById('player2Score');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

let board = [];
let selectedPiece = null;
let playerTurn = 1; // 1 para jogador 1 (peças pretas), 2 para jogador 2 (peças brancas)
let player1Score = 0;
let player2Score = 0;

// Função para criar o tabuleiro
function createBoard() {
  board = [];
  boardElement.innerHTML = '';

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');
      
      square.dataset.row = row;
      square.dataset.col = col;

      // Colocar peças iniciais
      if (row < 3 && (row + col) % 2 !== 0) {
        const piece = document.createElement('div');
        piece.classList.add('piece', 'black');
        square.appendChild(piece);
      } else if (row > 4 && (row + col) % 2 !== 0) {
        const piece = document.createElement('div');
        piece.classList.add('piece', 'white');
        square.appendChild(piece);
      }

      square.addEventListener('click', () => handleSquareClick(square));

      board.push(square);
      boardElement.appendChild(square);
    }
  }
}

// Função para lidar com o clique nas casas do tabuleiro
function handleSquareClick(square) {
  const piece = square.querySelector('.piece');

  // Selecionar uma peça
  if (piece && ((playerTurn === 1 && piece.classList.contains('black')) || (playerTurn === 2 && piece.classList.contains('white')))) {
    if (selectedPiece) {
      selectedPiece.classList.remove('selected');
    }
    selectedPiece = piece;
    selectedPiece.classList.add('selected');
  } 
  // Mover a peça ou capturar
  else if (selectedPiece && !piece && square.classList.contains('dark')) {
    const currentRow = parseInt(selectedPiece.parentElement.dataset.row);
    const currentCol = parseInt(selectedPiece.parentElement.dataset.col);
    const targetRow = parseInt(square.dataset.row);
    const targetCol = parseInt(square.dataset.col);

    // Verificar se o movimento ou captura é válido
    if (isMoveValid(currentRow, currentCol, targetRow, targetCol)) {
      // Se for um movimento de captura (pular sobre uma peça adversária)
      const isCapture = Math.abs(targetRow - currentRow) === 2 && Math.abs(targetCol - currentCol) === 2;
      if (isCapture) {
        const jumpedRow = (currentRow + targetRow) / 2;
        const jumpedCol = (currentCol + targetCol) / 2;
        const jumpedSquare = board.find(sq => sq.dataset.row == jumpedRow && sq.dataset.col == jumpedCol);
        const jumpedPiece = jumpedSquare.querySelector('.piece');

        if (jumpedPiece && ((playerTurn === 1 && jumpedPiece.classList.contains('white')) || (playerTurn === 2 && jumpedPiece.classList.contains('black')))) {
          jumpedSquare.removeChild(jumpedPiece); // Remove a peça capturada
          // Atualizar o placar
          if (playerTurn === 1) {
            player1Score++;
          } else {
            player2Score++;
          }
          updateScores();
        } else {
          return; // Movimento inválido se não houver peça para capturar
        }
      }

      // Mover a peça para a nova posição
      square.appendChild(selectedPiece);
      selectedPiece.classList.remove('selected');
      selectedPiece = null;

      // Alternar turno
      playerTurn = playerTurn === 1 ? 2 : 1;
    }
  }
}

// Verificar se o movimento é válido (movimento normal ou captura)
function isMoveValid(currentRow, currentCol, targetRow, targetCol) {
  const rowDiff = targetRow - currentRow;
  const colDiff = Math.abs(targetCol - currentCol);

  // Movimento simples para frente (uma casa)
  if (selectedPiece.classList.contains('black') && rowDiff === 1 && colDiff === 1) {
    return true;
  }
  // Movimento simples para trás (uma casa)
  if (selectedPiece.classList.contains('white') && rowDiff === -1 && colDiff === 1) {
    return true;
  }

  // Captura: pular duas casas na diagonal
  if (selectedPiece.classList.contains('black') && rowDiff === 2 && colDiff === 2) {
    return true;
  }
  if (selectedPiece.classList.contains('white') && rowDiff === -2 && colDiff === 2) {
    return true;
  }

  return false;
}

// Atualizar placar
function updateScores() {
  player1ScoreElement.innerText = player1Score;
  player2ScoreElement.innerText = player2Score;
}

// Inicializar o jogo
function startGame() {
  createBoard();
  player1Score = 0;
  player2Score = 0;
  playerTurn = 1;
  updateScores();
}

// Resetar o jogo
function resetGame() {
  selectedPiece = null;
  player1Score = 0;
  player2Score = 0;
  startGame();
}

// Eventos de clique
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);

// Inicializar o tabuleiro
createBoard();

// Atualiza a data e hora no rodapé
function updateFooterDateTime() {
  const footer = document.createElement('p');
  const now = new Date();
  const formattedDate = now.toLocaleString('pt-BR', { 
      dateStyle: 'short', 
      timeStyle: 'short' 
  });
  footer.innerText = `Última atualização: ${formattedDate}`;
  document.querySelector('.footer-content').appendChild(footer);
}

// Chama a função quando a página é carregada
window.onload = function() {
  updateFooterDateTime();
};

