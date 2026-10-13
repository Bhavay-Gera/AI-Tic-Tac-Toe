// AI Tic-Tac-Toe: human is X, computer is O.
// The Minimax algorithm checks possible future moves and chooses the best one.

const HUMAN = "X";
const AI = "O";
const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

let board = Array(9).fill("");
let gameOver = false;
let scores = { human: 0, ai: 0, draw: 0 };

const cells = [...document.querySelectorAll(".cell")];
const statusText = document.getElementById("status");
const humanPill = document.getElementById("human-pill");
const aiPill = document.getElementById("ai-pill");

function getWinner(state) {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (state[a] && state[a] === state[b] && state[a] === state[c]) {
      return { player: state[a], line };
    }
  }
  return null;
}

function minimax(state, isMaximizing, depth = 0) {
  const result = getWinner(state);
  if (result?.player === AI) return 10 - depth;
  if (result?.player === HUMAN) return depth - 10;
  if (state.every(Boolean)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < state.length; i++) {
      if (!state[i]) {
        state[i] = AI;
        bestScore = Math.max(bestScore, minimax(state, false, depth + 1));
        state[i] = "";
      }
    }
    return bestScore;
  }

  let bestScore = Infinity;
  for (let i = 0; i < state.length; i++) {
    if (!state[i]) {
      state[i] = HUMAN;
      bestScore = Math.min(bestScore, minimax(state, true, depth + 1));
      state[i] = "";
    }
  }
  return bestScore;
}

function getBestMove() {
  let bestScore = -Infinity;
  let bestMove = -1;
  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = AI;
      const score = minimax(board, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  return bestMove;
}

function renderBoard(winningLine = []) {
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
    cell.classList.toggle("x", board[index] === HUMAN);
    cell.classList.toggle("o", board[index] === AI);
    cell.classList.toggle("winner", winningLine.includes(index));
    cell.disabled = gameOver || Boolean(board[index]);
  });
}

function setTurn(turn) {
  humanPill.classList.toggle("active", turn === HUMAN);
  aiPill.classList.toggle("active", turn === AI);
}

function finishRound() {
  const result = getWinner(board);
  if (result) {
    gameOver = true;
    const humanWon = result.player === HUMAN;
    statusText.textContent = humanWon ? "You win! Great move." : "AI wins this round. Try again!";
    if (humanWon) scores.human++;
    else scores.ai++;
    renderBoard(result.line);
    updateScores();
    setTurn("");
    return true;
  }
  if (board.every(Boolean)) {
    gameOver = true;
    statusText.textContent = "It's a draw. Well played!";
    scores.draw++;
    renderBoard();
    updateScores();
    setTurn("");
    return true;
  }
  return false;
}

function playHumanMove(index) {
  if (gameOver || board[index]) return;
  board[index] = HUMAN;
  renderBoard();
  if (finishRound()) return;

  statusText.textContent = "AI is thinking...";
  setTurn(AI);
  cells.forEach(cell => cell.disabled = true);

  // A short pause makes the computer's move feel natural.
  window.setTimeout(() => {
    const move = getBestMove();
    if (move !== -1) board[move] = AI;
    renderBoard();
    if (!finishRound()) {
      statusText.textContent = "Your turn — choose a square.";
      setTurn(HUMAN);
    }
  }, 350);
}

function updateScores() {
  document.getElementById("human-score").textContent = scores.human;
  document.getElementById("ai-score").textContent = scores.ai;
  document.getElementById("draw-score").textContent = scores.draw;
}

function newGame() {
  board = Array(9).fill("");
  gameOver = false;
  statusText.textContent = "Your turn — choose a square.";
  setTurn(HUMAN);
  renderBoard();
}

cells.forEach(cell => cell.addEventListener("click", () => playHumanMove(Number(cell.dataset.index))));
document.getElementById("restart").addEventListener("click", newGame);
document.getElementById("reset-score").addEventListener("click", () => {
  scores = { human: 0, ai: 0, draw: 0 };
  updateScores();
  newGame();
});

newGame();
