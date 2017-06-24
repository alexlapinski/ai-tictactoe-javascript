const pool = require('ndarray-scratch');
const ops = require('ndarray-ops');
const show = require('ndarray-show');
const diag = require('ndarray-diagonal');
const _ = require('lodash');

/**
 * A simple tic-tac-toe board where
 *  '-1' represents 'X'
 *  '0' represents an empty cell
 *  '1' represents 'O'
 */
class Board {

    static get EMPTY_CELL() { return 0; }
    static get X_CELL() { return -1; }
    static get O_CELL() { return 1; }
    static get VALID_TILE_VALUES() {
        return [Board.X_CELL, Board.O_CELL];
    }

    constructor(width = 3, height = 3) {
        if (width <= 0) {
            throw new Error('width must be greater than zero');
        }

        if (height <= 0) {
            throw new Error('height must be greater than zero');
        }

        this._board = pool.zeros([height, width]);
    }

    toString() {
        return show(this._board);
    }

    get height() {
        return _.first(this._board.shape);
    }

    get width() {
        return _.last(this._board.shape);
    }

    setTile(x, y, value) {
        if (x < 0 || x >= this.width) {
            throw new Error(`x must be between 0 and ${this.width-1}`);
        }

        if (y < 0 || y >= this.height) {
            throw new Error(`y must be between 0 and ${this.height-1}`)
        }

        if (Board.VALID_TILE_VALUES.indexOf(value) == -1) {
            throw new Error(`value must be one of the following values ${Board.VALID_TILE_VALUES}`);
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
     * Returns true if any player can play a move, false if all tiles have been filled.
     */
    areMovesAvailable() {
        for(let x = 0; x < this.width; x++) {
            for(let y = 0; y < this.height; y++) {
                const val = this.getTile(x, y);
                if( val === Board.EMPTY_CELL) {
                    // Return True if any cells are '0'
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Checks the state of the board to determine if there is a winner
     * Returns the value of the winner, or '0' for no winner.
     */
    checkWinner() {
        //
        // The winner check algorithm takes advantage of the fact that cell values are signed integers
        // If all of the cells in a row / col / diag are equal to the sign and number of cells, that sign won
        // eg. all row values sumed equals 3, then 'O' won because it is the positive cell type.
        //

        for(let row = 0; row < this.height; row++) {
            const sum = ops.sum(this._board.pick(row));
            if (sum == Board.X_CELL*this.width) {
                return Board.X_CELL;
            }
            if (sum == Board.O_CELL*this.width) {
                return Board.O_CELL;
            }
        }

        for(let col = 0; col < this.width; col++) {
            const sum = ops.sum(this._board.pick(null, col));
            if (sum == Board.X_CELL*this.height) {
                return Board.X_CELL;
            }

            if (sum == Board.O_CELL*this.height) {
                return Board.O_CELL;
            }
        }

        const diagArr = diag(this._board);
        const diagSum = ops.sum(diagArr);
        if ( diagSum == Board.X_CELL*diagArr.size) {
            return Board.X_CELL;
        }

        if (diagSum == Board.O_CELL*diagArr.size) {
            return Board.O_CELL;
        }

        return Board.EMPTY_CELL;
    }
}

module.exports = Board;