const gameBoard = (function() {

    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const placeToken = (token, index) => {
        if (index > board.length) return;
        board[index] = token;
    }

    const getBoard = () => board;

    const getCell = (index) => {
        return board[index];
    }

    const resetBoard = () => {
        for (let i = 0; i < board.length; i ++) {
            board[i] = 0;
        }
    }

    const printBoard = () => {
        console.log(board);
    }

    return { placeToken, getBoard, getCell, resetBoard, printBoard };

})();

const player = (sign) => {

    const getSign = () => {
        return sign;
    }

    return { getSign };
}

const displayManager = (function() {
    const displayMessage = document.getElementById("display-message");
    // const boardArea = document.getElementsByClassName("board");
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.getElementById("restart-btn");

    const setMessage = (message) => {
        displayMessage.textContent = message;
    }

    const updateBoard = () => {
        for (let i = 0; i < cells.length; i ++) {
            if (gameBoard.getCell(i) == 1) {
                cells[i].innerText = "X";
            } else if (gameBoard.getCell(i) == 2) {
                cells[i].innerText = "O";
            } else {
                cells[i].innerText = "";
            }
        }
    }

    cells.forEach((cell) => {
        cell.addEventListener("mouseover", (e) => {
            if (e.target.innerText == "") {
                e.target.style.cursor = "pointer";
            } else {
                e.target.style.cursor = "default";
            }
        });
    
        cell.addEventListener("mouseout", (e) => {
            e.target.style.cursor = "default"; // Reset the cursor style
        });
        
        cell.addEventListener("click", (e) => {
            if (gameController.gameOver() || e.target.innerText !== "") return;
            gameController.playRound(parseInt(e.target.dataset.index));
            updateBoard();
        })
    });

    // when restart button clicked, clear board for new game
    restartButton.addEventListener("click", () => {
        gameController.resetGame();
        gameBoard.resetBoard();
        updateBoard();
        setMessage("Click any cell to start game.");
    });

    return { setMessage }
})();


const gameController = (function () {
    const player1 = player(1);
    const player2 = player(2);
    let round = 1;
    let isGameOver = false;

    const currentPlayer = () => {
        return round % 2 == 1 ? player1.getSign() : player2.getSign();
    }

    const playRound = (cellIndex) => {
        gameBoard.placeToken(currentPlayer(), cellIndex);
        
        if (checkWin(cellIndex)) {
            // print win message
            displayManager.setMessage(`Player ${currentPlayer()} won.`);
            isGameOver = true;
            return;
        }

        if (round === 9) {
            // annouce draw
            displayManager.setMessage("Draw, try again.");
            isGameOver = true;
            return;
        }
        round ++;

        // set message for next player's turn
        displayManager.setMessage(`Player ${currentPlayer()}'s turn.`);
        
    }

    const checkWin = (cellIndex) => {
        const winCondition = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winCondition
            .filter((potentialWin) => potentialWin.includes(cellIndex))
            .some((winCombos) => winCombos.every((index) => gameBoard.getCell(index) == currentPlayer()));
    }

    const gameOver = () => {
        return isGameOver;
    }

    const resetGame = () => {
        round = 1;
        isGameOver = false;
    }

    return { currentPlayer, playRound, resetGame, gameOver }
})();
