document.addEventListener("DOMContentLoaded", () => {
    const squaresContainer = document.querySelector(".tic-tac-toe");
    const resetButton = document.querySelector("button");
    const playerSymbols = ["X", "O"];
    let currentPlayerIndex = 0;
    let board = ["", "", "", "", "", "", "", "", ""];
  
    // Function to create the Tic Tac Toe board
    function makeBoard() {
      for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.classList.add("square", "empty");
        square.dataset.index = i;
        square.addEventListener("click", makeMove);
        squaresContainer.appendChild(square);
      }
    }
  
    // Function to handle player moves
    function makeMove(event) {
      const clickedSquare = event.target;
      const squareIndex = parseInt(clickedSquare.dataset.index);
      if (clickedSquare.classList.contains("empty")) {
        clickedSquare.textContent = playerSymbols[currentPlayerIndex];
        clickedSquare.classList.remove("empty");
        board[squareIndex] = playerSymbols[currentPlayerIndex];
        currentPlayerIndex = (currentPlayerIndex + 1) % 2;
        checkGameStatus();
      }
    }
  
    // Function to check if all squares are full
    function isBoardFull() {
      return !board.includes("");
    }
  
    // Function to check for a winning combination
    function checkWinner(symbol) {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      return winningCombinations.some((combo) =>
        combo.every((index) => board[index] === symbol)
      );
    }
  
    // Function to check game status after each move
    function checkGameStatus() {
      if (isBoardFull()) {
        alert("Game Over: It's a tie!");
        reset();
      } else if (checkWinner("X")) {
        alert("Player X wins!");
        reset();
      } else if (checkWinner("O")) {
        alert("Player O wins!");
        reset();
      }
    }
  
    // Function to reset the game
    function reset() {
      squaresContainer.innerHTML = "";
      makeBoard();
      board = ["", "", "", "", "", "", "", "", ""];
      currentPlayerIndex = 0;
    }
  
    // Event listener for the reset button
    resetButton.addEventListener("click", reset);
  
    // Call makeBoard() on page load
    makeBoard();
  });

