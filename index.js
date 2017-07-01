const Board = require('./models/board');
const Move = require('./models/move');
const minimax = require('./algorithms/minimax');

main();

function main() {

    const board = new Board();
    console.log('Initial State');
    console.log(board.toString());
    console.log();

    board.applyMove(new Move(1, 1, Board.X_CELL));
    board.applyMove(new Move(0, 1, Board.O_CELL));
    board.applyMove(new Move(2, 2, Board.X_CELL));
    board.applyMove(new Move(0, 0, Board.O_CELL));

    console.log('After 4 moves');
    console.log(board.toString());

    minimax(board);
}