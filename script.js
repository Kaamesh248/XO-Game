const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;

let board = ["", "", "", "", "", "", "", "", ""];

const winningPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


// Cell click
cells.forEach(cell => {

    cell.addEventListener("click", function () {

        let index = this.getAttribute("data-index");

        if (board[index] !== "" || !gameActive) {
            return;
        }

        board[index] = currentPlayer;
        this.textContent = currentPlayer;

        checkWinner();

    });

});


// Check winner
function checkWinner() {

    let winner = false;

    for (let pattern of winningPatterns) {

        let position1 = board[pattern[0]];
        let position2 = board[pattern[1]];
        let position3 = board[pattern[2]];


        if (position1 === "" || position2 === "" || position3 === "") {
            continue;
        }


        if (position1 === position2 && position2 === position3) {
            winner = true;
            break;
        }
    }


    if (winner) {

        statusText.textContent = "Player " + currentPlayer + " Wins 🎉";
        gameActive = false;
        return;

    }


    if (!board.includes("")) {

        statusText.textContent = "Game Draw 🤝";
        gameActive = false;
        return;

    }


    changePlayer();

}


// Change player
function changePlayer() {

    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }


    statusText.textContent = "Player " + currentPlayer + "'s Turn";

}


// Restart button
restartBtn.addEventListener("click", restartGame);


// Restart game function
function restartGame() {

    currentPlayer = "X";
    gameActive = true;

    board = ["", "", "", "", "", "", "", "", ""];

    statusText.textContent = "Player X's Turn";


    cells.forEach(cell => {

        cell.textContent = "";  // Backend update by collobrator

    });

}
