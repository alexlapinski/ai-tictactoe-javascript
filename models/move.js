const { Players } = require('./game');
const _ = require('lodash');

class Move {

    constructor(x, y, player) {

        if ( x < 0 ) {
            throw new RangeError('x must be greater than or equal to zero.');
        }

        if ( y < 0 ) {
            throw new RangeError('y must be greater than or equal to zero.');
        }

        if ( _.indexOf(Players, player) === -1 ) {
            throw new RangeError(`player must be one of the following values. ${JSON.stringify(Players)}`);
        }


        this._x = x;
        this._y = y;
        this._player = player;
    }

    /**
     * x location of move
     */
    get x() {
        return this._x;
    }

    /**
     * Y location of move.
     */
    get y() {
        return this._y;

    }

    /**
     * Player (-1 for X, 1 for O)
     */
    get player() {
        return this._player;
    }
}

module.exports = Move;