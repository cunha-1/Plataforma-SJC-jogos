let selectedImage;
let pieces = [];

// Função para configurar o quebra-cabeça com a imagem selecionada
function setupPuzzle(imageSrc) {
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
        pieces = [];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const pieceSize = 100;

        // Redimensiona a imagem para 300x300 para se ajustar ao tabuleiro 3x3
        canvas.width = 300;
        canvas.height = 300;
        ctx.drawImage(img, 0, 0, 300, 300);

        // Divide a imagem em 9 partes (100px x 100px)
        for (let y = 0; y < 300; y += pieceSize) {
            for (let x = 0; x < 300; x += pieceSize) {
                const pieceCanvas = document.createElement('canvas');
                pieceCanvas.width = pieceSize;
                pieceCanvas.height = pieceSize;
                const pieceCtx = pieceCanvas.getContext('2d');
                pieceCtx.drawImage(canvas, x, y, pieceSize, pieceSize, 0, 0, pieceSize, pieceSize);
                pieces.push(pieceCanvas.toDataURL());
            }
        }

        shuffleAndRenderPuzzle();
    };
}

// Função para embaralhar e renderizar o quebra-cabeça
function shuffleAndRenderPuzzle() {
    pieces.sort(() => Math.random() - 0.5);
    renderPuzzle();
}

// Função para renderizar o quebra-cabeça no tabuleiro
function renderPuzzle() {
    const puzzleContainer = document.getElementById("puzzle-container");
    puzzleContainer.innerHTML = '';

    pieces.forEach((piece, index) => {
        const pieceElement = document.createElement("div");
        pieceElement.classList.add("puzzle-piece");
        pieceElement.style.backgroundImage = `url(${piece})`;
        pieceElement.setAttribute("draggable", true);
        pieceElement.setAttribute("data-index", index);
        pieceElement.addEventListener("dragstart", dragStart);
        pieceElement.addEventListener("dragover", dragOver);
        pieceElement.addEventListener("drop", drop);
        puzzleContainer.appendChild(pieceElement);
    });

    document.getElementById("message").textContent = "";
}

function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.dataset.index);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData("text/plain");
    const droppedIndex = event.target.dataset.index;

    if (draggedIndex !== droppedIndex) {
        const draggedPiece = pieces[draggedIndex];
        pieces[draggedIndex] = pieces[droppedIndex];
        pieces[droppedIndex] = draggedPiece;

        renderPuzzle();
        checkWin();
    }
}

function checkWin() {
    const isCorrectOrder = pieces.every((piece, index) => piece === pieces[index]);
    if (isCorrectOrder) {
        document.getElementById("message").textContent = "Parabéns! Você completou o quebra-cabeça!";
        document.getElementById("restart-button").style.display = "block";
    }
}

document.getElementById("start-button").addEventListener("click", () => {
    const selectedOption = document.getElementById("image-selector").value;
    setupPuzzle(selectedOption);
});

document.getElementById("restart-button").addEventListener("click", () => {
    const selectedOption = document.getElementById("image-selector").value;
    setupPuzzle(selectedOption);
    document.getElementById("restart-button").style.display = "none";
});
