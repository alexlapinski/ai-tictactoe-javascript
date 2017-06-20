const ndarray = require('ndarray');
const show = require('ndarray-show');
const _ = require('lodash');

const validTileValues = [1, -1];

/**
 * A simple tic-tac-toe board where
 *  '-1' represents 'X'
 *  '0' represents an empty cell
 *  '1' represents 'O'
 */
class Board {
    constructor(width = 3, height = 3) {
        if (width <= 0) {
            throw new Error('width must be greater than zero');
        }

        if (height <= 0) {
            throw new Error('height must be greater than zero');
        }

        this._board = new ndarray(new Int8Array(width * height), [height, width]);
    }

    toString() {
        return show(this._board);
    }

    get height() {
        return _.first(this._board);
    }

    get width() {
        return _.last(this._board);
    }

    setTile(x, y, value) {
        if (x < 0 || x >= this.width) {
            throw new Error(`x must be between 0 and ${this.width-1}`);
        }

        if (y < 0 || y >= this.height) {
            throw new Error(`y must be between 0 and ${this.height-1}`)
        }

        if (validTileValues.indexOf(value) == -1) {
            throw new Error(`value must be one of the following values ${validTileValues}`);
        }

        this._board.set(y, x, value);
    }

    getTile(x, y) {
        if (x < 0 || x >= this.width) {
            throw new Error(`x must be between 0 and ${this.width-1}`);
        }

        if (y < 0 || y >= this.height) {
            throw new Error(`y must be between 0 and ${this.height-1}`)
        }

        return this._board.get(y, x);
    }

    /**
     * areMovesAvailable - Returns true if a player can play a move, false if all tiles have been filled.
     */
    areMovesAvailable() {

    }

    /**
     * Checks the state of the board to determine if there is a winner
     * Returns the value of the winner, or '0' for no winner.
     */
    checkWinner() {
        
    }
}

module.exports = Board;