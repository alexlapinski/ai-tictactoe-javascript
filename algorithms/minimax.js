const _ = require('lodash');
const Board = require('../models/board');

module.exports = {
    getMove
};

function getMove(state, player, maxDepth = 3) {
    //
    // Given the current state, search all possible moves to find the optimal move
    //  if player is 'X', then search for the min value
    //  if player is 'O', then search for the max value
    //
    if(_.indexOf(Board.VALID_TILE_VALUES, player) === -1) {
        throw new RangeError(`player must be one of '${Board.VALID_TILE_VALUES}' but it was '${player}'`);
    }

    if(!(state instanceof Board)) {
        throw new Error('board must be a valid Board instance');
    }

    let action;
    const actions = state.availableMoves();

    if (player === Board.X_CELL) {
        let value = Number.NEGATIVE_INFINITY;
        for( let i = 0, len = actions.length; i < len; i++) {
            let localAction = actions[i];
            let state = state.applyMoveCloning(localAction);
            let localValue = _minValue(state, maxDepth)
            if (localValue > value) {
                value = localValue;
                action = localAction;
            }
        }
    } else {
        let value = Number.POSITIVE_INFINITY;
        for( let i = 0, len = actions.length; i < len; i++) {
            let localAction = actions[i];
            let board = state.applyMoveCloning(localAction);
            let localValue = _maxValue(board, maxDepth);
            if( localValue < value) {
                value = localValue;
                action = localAction;
            }
        }
    }

    // action is the one that is the max from above
    return action
}

function _maxValue(state, depth) {
    if( depth === 0 || !state.areMovesAvailable()) {
        return state.checkWinner();
    }

    let value = Number.NEGATIVE_INFINITY;
    let moves = state.availableMoves();
    let successors = _.map(moves, (move) => state.applyMoveCloning(move));
    for (let i = 0, len = successors.length; i < len; i++) {
        value = Math.max(value, _minValue(successors[i], depth - 1));
    }
    return value
}

function _minValue(state, depth) {
    if( depth === 0 || !state.areMovesAvailable()) {
        return state.checkWinner();
    }

    let value = Number.POSITIVE_INFINITY;
    let moves = state.availableMoves();
    let successors = _.map(moves, (move) => state.applyMoveCloning(move));
    for(let i = 0, len = successors.length; i < len; i++) {
        value = Math.min(value, _maxValue(successors[i], depth - 1));
    }

    return value
}