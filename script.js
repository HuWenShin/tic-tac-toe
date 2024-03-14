function gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i ++) {
            board[i] = [];
            for (let j = 0; j < columns; j ++) {
                board[i].push(cell());
        }
    }

    const getBoard = () => board;


    const placeToken = (row, column, player) => {
        if (board[row][column] === 0) {
            board[row][column] = player;
        } else {
            return
        }
    }

    const printBoard = () => {
        console.log(board);
    }

    return { getBoard, placeToken, printBoard };
}


//control cell operations
function cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return { addToken, getValue };
}


function gameController() {
    const playerOne = 1;
    const playerTwo = 2;


}