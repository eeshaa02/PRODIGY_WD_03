// Game State
const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

// Win conditions (index positions for winning combinations)
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Select DOM elements
const cells = document.querySelectorAll(".cell");
const statusDisplay = document.getElementById("status");
const resetButton = document.getElementById("reset");

// Handle cell click
function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = clickedCell.getAttribute("data-index");

  // Ignore clicks on cells that are already filled or if game is over
  if (board[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  // Update the board state and UI
  board[clickedCellIndex] = currentPlayer;
  clickedCell.innerText = currentPlayer;

  // Check for winner or draw
  checkResult();

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();
}

// Update the status display
function updateStatus() {
  if (gameActive) {
    statusDisplay.innerText = `It's ${currentPlayer}'s turn`;
  }
}

// Check for a win or draw
function checkResult() {
  let roundWon = false;

  // Check each winning condition
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    statusDisplay.innerText = `Player ${currentPlayer} has won!`;
    gameActive = false;
    return;
  }

  // Check for draw
  if (!board.includes("")) {
    statusDisplay.innerText = `It's a draw!`;
    gameActive = false;
    return;
  }
}

// Reset game
function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  board.fill("");
  cells.forEach(cell => (cell.innerText = ""));
  updateStatus();
}

// Event listeners
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetButton.addEventListener("click", resetGame);

// Initial status display
updateStatus();
