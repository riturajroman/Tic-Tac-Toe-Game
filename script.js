const totalCells = document.querySelectorAll('.cells');
const restartBtn = document.querySelector('.restart-btn');
const msgBox = document.getElementById('msg-box');
const gameBoard = document.querySelector('.game-board');

let currentPlayer = 'X';
let nextPlayer = 'O';
let playerTurn = currentPlayer;
let playerScores = {
    'X': 0,
    'O': 0
};

// main function
const gameFunction = (e) => {
    if (e.target.textContent === '') {
        e.target.textContent = playerTurn;
        if (playerTurn === currentPlayer) {
            msgBox.textContent = `${nextPlayer} turn Now`;
        } else {
            msgBox.textContent = `${currentPlayer} turn Now`;
        }
        if (gameWinner()) {
            msgBox.textContent = `${playerTurn} is the Winner`;
            updateScore(playerTurn);
            holdGame();
            gameBoard.style.backgroundColor = 'rgba(255,255,255,0.5)';
        } else if (tieChecker()) {
            msgBox.textContent = `The Game Ended in a Draw`;
            gameBoard.style.backgroundColor = 'rgba(255,255,255,0.5)';
        } else {
            playerChange();
        }
    }
};

// Game start here
const startGame = () => {
    totalCells.forEach(cell => {
        cell.addEventListener('click', gameFunction)
    })
};

// holding game after winning
const holdGame = () => {
    totalCells.forEach(cell => {
        cell.removeEventListener('click', gameFunction)
    })
};

// player Turn function
const playerChange = () => {
    playerTurn = playerTurn === currentPlayer ? nextPlayer : currentPlayer;
};

// Game win function
const gameWinner = () => {
    const gameArray = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < gameArray.length; i++) {
        const [pos1, pos2, pos3] = gameArray[i];
        if (totalCells[pos1].textContent !== '' &&
            totalCells[pos1].textContent === totalCells[pos2].textContent &&
            totalCells[pos2].textContent === totalCells[pos3].textContent) {
            return true;
        }
    }
    return false;
};

// check the tie
const tieChecker = () => {
    let emptyCells = 0;
    totalCells.forEach(cell => {
        if (cell.textContent === '') {
            emptyCells++;
        }
    })
    return emptyCells === 0 && !gameWinner();
};

// restarting the game
const restartGame = () => {
    restartBtn.addEventListener('click', () => {
        startGame();
        totalCells.forEach(cell => {
            cell.textContent = '';
        })
        gameBoard.style.backgroundColor = 'transparent';
        msgBox.textContent = 'Message Box';
    })
};

// updating the score
function updateScore(player) {
    playerScores[player]++;
    document.querySelector(`.player${player} span`).textContent = playerScores[player];
};

// calling the function
startGame();
restartGame();