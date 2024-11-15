// script.js

// Game state variables
let board = ['', '', '', '', '', '', '', '', '']; // Represents the board as a 1D array
let currentPlayer = 'X'; // X starts the game
let gameActive = true;

// Get the squares and status div
const squares = document.querySelectorAll('.square');
const statusDiv = document.getElementById('status');
const restartButton = document.getElementById('restart');

// Winning combinations (index combinations in the 1D array)
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle the player's move
function handleSquareClick(event) {
    const index = event.target.dataset.index;

    if (board[index] !== '' || !gameActive) return; // Ignore if square is already filled or game is over

    // Mark the square with the current player's symbol (X or O)
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Check if the current player has won
    if (checkWinner()) {
        gameActive = false;
        statusDiv.textContent = `${currentPlayer} Wins!`;
        return;
    }

    // Check if the game is a draw
    if (board.every(cell => cell !== '')) {
        gameActive = false;
        statusDiv.textContent = 'It\'s a Draw!';
        return;
    }

    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = `${currentPlayer}'s Turn`;
}

// Function to check if there is a winner
function checkWinner() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] === currentPlayer && board[a] === board[b] && board[a] === board[c];
    });
}

// Function to restart the game
function restartGame() {
    board = ['', '', '', '', '', '', '', '', '']; // Reset board
    gameActive = true;
    currentPlayer = 'X'; // X starts the game again
    statusDiv.textContent = `${currentPlayer}'s Turn`;

    // Clear the displayed symbols on the board
    squares.forEach(square => {
        square.textContent = '';
    });
}

// Attach event listeners to each square
squares.forEach(square => {
    square.addEventListener('click', handleSquareClick);
});

// Restart the game when the restart button is clicked
restartButton.addEventListener('click', restartGame);

// Initial status
statusDiv.textContent = `${currentPlayer}'s Turn`;
