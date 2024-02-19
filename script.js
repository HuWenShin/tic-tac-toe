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
    const dropToken = (row, column, player) => {
        //cells that don't already have a token
        const availableCells = #;
    }
}


//control cell operations
function cell() {
    let value = 0;

    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {addToken, getValue};
}

// //player name and score
// function player(name) {
//     let score = 0;

//     const showScore = () => score;
//     const winRound = () => score ++;

//     return {name, showScore, winRound};
// }


function gameController() {
    
}