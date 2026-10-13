# AI Tic-Tac-Toe

A beginner-friendly Artificial Intelligence mini project. Play Tic-Tac-Toe against a computer opponent that uses the **Minimax algorithm** to select moves.

## Features

- Play as X against the AI (O)
- AI evaluates possible future moves using Minimax
- Detects wins, losses, and draws
- Highlights the winning line
- Scoreboard and restart controls
- Responsive interface for desktop and mobile
- No installation or external libraries required

## How to Run

1. Download or clone this repository.
2. Open `index.html` in any modern web browser.
3. Click a square to make your move.

## How the AI Works

Minimax is a search algorithm used in two-player games. It explores possible moves until it reaches a win, loss, or draw state. The AI tries to maximize its score while assuming the human player will choose moves that minimize the AI's score.

- AI win: positive score
- Human win: negative score
- Draw: zero score

The algorithm checks every available move and chooses the move with the highest score. This makes the computer difficult to beat when it plays correctly.

## Technologies Used

- HTML — game structure
- CSS — visual design and responsive layout
- JavaScript — game logic and Minimax AI

## Project Objective

The objective is to demonstrate a basic Artificial Intelligence technique through a familiar game. The project illustrates game-state evaluation, search, decision-making, and win/draw detection.

## Project Structure

```text
AI-Tic-Tac-Toe/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Future Improvements

- Add difficulty levels
- Add sound effects
- Track match history
- Improve accessibility and animations

## Author

Add your name and class details here before submitting.

## License

This project is provided for educational use.
