const {expect} = require('chai');
const Board = require('../models/board');


describe('Board', () => {

    describe('size', () => {
        it('should be 3x3 for a new board', () => {
            const subject = new Board();

            expect(subject.width).to.equal(3);
            expect(subject.height).to.equal(3);
        });

    });


    describe('tiles', () => {
        it(`should all be ${Board.EMPTY_CELL} for a new board`, () => {
            const subject = new Board();

            for( let x = 0; x < subject.width; x++) {
                for( let y = 0; y < subject.height; y++) {
                    const val = subject.getTile(x, y);
                    expect(val).to.equal(Board.EMPTY_CELL);
                }
            }
        });
    });


    describe('#areMovesAvailable()', () => {
        it('should return true for a new board', () => {
            const subject = new Board();

            expect(subject.areMovesAvailable()).to.be.true;
        });
    });


    describe('#checkWinner()', () => {
        it('Board should have no winner for a new board', () => {
            const subject = new Board();

            expect(subject.checkWinner()).to.equal(Board.EMPTY_CELL);
        });
    });

});







