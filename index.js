const Board = require('./models/board');

main();

function main() {

    const board = new Board();
    console.log('Initial State');
    console.log(board.toString());
    console.log();

    board.setTile(1, 1, -1);
    board.setTile(0, 1, 1);
    board.setTile(2, 2, -1);
    board.setTile(0, 0, 1);

    console.log('After 3 turns');
    console.log(board.toString());
}