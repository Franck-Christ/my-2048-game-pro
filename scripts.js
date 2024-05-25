const boardSize = 4;
const gameBoard = document.getElementById('game-board');
var score = 0; 
 
let board = Array(boardSize).fill().map(() => Array(boardSize).fill(0));

function createBoard() {
    gameBoard.innerHTML = '';
    board.forEach(row => {
        row.forEach(cell => {
            const cellElement = document.createElement('div');
            cellElement.className = 'cell';
            if (cell !== 0) {
                cellElement.textContent = cell;
                cellElement.dataset.value = cell;
            }
            gameBoard.appendChild(cellElement);
        });
    });
}

function addRandomTile() {
    let emptyCells = [];
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === 0) emptyCells.push({ r, c });
        }
    }
    if (emptyCells.length === 0) return;
    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[r][c] = Math.random() > 0.1 ? 2 : 4;
    createBoard();
}

function moveLeft() {
    let moved = false;
    for (let r = 0; r < boardSize; r++) {
        let newRow = board[r].filter(cell => cell !== 0);
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                newRow[i + 1] = 0;
                i++;
            }
        }
        newRow = newRow.filter(cell => cell !== 0);
        while (newRow.length < boardSize) newRow.push(0);
        if (newRow.join('') !== board[r].join('')) moved = true;
        board[r] = newRow;
    }
    if (moved) addRandomTile();
}

function moveRight() {
    rotateBoard();
    rotateBoard();
    moveLeft();
    rotateBoard();
    rotateBoard();
}

function moveUp() {
    rotateBoard();
    rotateBoard();
    rotateBoard();
    moveLeft();
    rotateBoard();
}

function moveDown() {
    rotateBoard();
    moveLeft();
    rotateBoard();
    rotateBoard();
    rotateBoard();
}

function rotateBoard() {
    const newBoard = Array(boardSize).fill().map(() => Array(boardSize).fill(0));
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            newBoard[c][boardSize - 1 - r] = board[r][c];
        }
    }
    board = newBoard;
}

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
        
            break;
    }
       document.getElementById("score").innerText= score;{
    score= board[0][0]+board[0][1]+board[0][2]+board[0][3]+board[1][0]+board[1][1]+board[1][2]+board[1][3]+board[2][0]+board[2][1]+board[2][2]+board[2][3]+board[3][0]+board[3][1]+board[3][2]+board[3][3];
       }

});

window.onload = () => {
    addRandomTile();
    addRandomTile();
    createBoard();
};

