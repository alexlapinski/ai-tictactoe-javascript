const {expect} = require('chai');
const Board = require('../models/board');


describe('Board', () => {

    describe('constructor', () => {

        it('should throw error with invalid width', () => {
           expect(() => {
               new Board(-1, 3);
           }).to.throw(RangeError, 'width');
        });

        it('should throw error with invalid height', () => {
            expect(() => {
                new Board(3, -1);
            }).to.throw(RangeError, 'height');
        });

    });


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

        it('should throw error when setting invalid x', () => {
            const subject = new Board();
            expect(() => {
                subject.setTile(-1, 0, 1);
            }).to.throw(RangeError, 'x');

            expect(() => {
                subject.setTile(3, 0, 1);
            }).to.throw(RangeError, 'x');
        });

        it('should throw error when setting invalid y', () => {
            const subject = new Board();
            expect(() => {
                subject.setTile(0, -1, 1);
            }).to.throw(RangeError, 'y');

            expect(() => {
                subject.setTile(0, 3, 1);
            }).to.throw(RangeError, 'y');
        });

        it('should throw error when setting invalid cell value', () => {
            const subject = new Board();
            expect(() => {
                subject.setTile(0, 0, 2);
            }).to.throw(RangeError, 'value');
        });

        it('should be set to a new value', () => {
            const subject = new Board();
            const x = 1, y = 1;

            expect(subject.getTile(x, y)).to.equal(0);

            subject.setTile(x, y, -1);

            expect(subject.getTile(x, y)).to.equal(-1);
        });

        it('should throw error when getting invalid x', () => {
            const subject = new Board();
            expect(() => {
                subject.getTile(-1, 0);
            }).to.throw(RangeError, 'x');

            expect(() => {
                subject.getTile(4, 0);
            }).to.throw(RangeError, 'x');
        });

        it('should throw error when getting invalid y', () => {
            const subject = new Board();
            expect(() => {
                subject.getTile(0, -1);
            }).to.throw(RangeError, 'y');

            expect(() => {
                subject.getTile(0, 4);
            }).to.throw(RangeError, 'y');
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







