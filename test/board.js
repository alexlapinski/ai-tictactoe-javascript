const {expect} = require('chai');
const _ = require('lodash');
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

        it('should return false when all tiles are filled', () => {
            const subject = new Board();

            let move = 0;
            for( let x = 0; x < subject.width; x++ ) {
                for( let y = 0; y < subject.width; y++ ) {
                    if( move % 2 === 0 ) {
                        subject.setTile(x, y, 1);
                    } else {
                        subject.setTile(x, y, -1);
                    }
                    move++;
                }
            }

            expect(subject.areMovesAvailable()).to.be.false;
        });
    });


    describe('#checkWinner()', () => {
        it('Board should have no winner for a new board', () => {
            const subject = new Board();

            expect(subject.checkWinner()).to.equal(Board.EMPTY_CELL);
        });

        describe('horizontal winner', () => {
            const maxRows = 3;
            const players = [Board.X_CELL, Board.O_CELL];

            _.each(players, (player) => {
                for( let row = 0; row < maxRows; row++ ) {
                    it(`Board should have winner as ${player} when horizontal win exists in row ${row}.`, () => {
                        const subject = new Board();

                        _.each(_.range(subject.height), (col) => subject.setTile(col, row, player));

                        expect(subject.checkWinner()).to.equal(player)
                    });
                }
            });

            it(`should have ${Board.X_CELL} as winner when realistic row win exists.`, () => {
                const subject = new Board();

                subject.setTile(0, 0, Board.X_CELL);
                subject.setTile(0, 1, Board.O_CELL);
                subject.setTile(1, 0, Board.X_CELL);
                subject.setTile(0, 2, Board.O_CELL);
                subject.setTile(2, 0, Board.X_CELL);

                expect(subject.checkWinner()).to.equal(Board.X_CELL);
            });

            it(`should have ${Board.O_CELL} as winner when realistic row win exists.`, () => {
                const subject = new Board();

                subject.setTile(1, 1, Board.X_CELL);
                subject.setTile(0, 0, Board.O_CELL);
                subject.setTile(2, 2, Board.X_CELL);
                subject.setTile(1, 0, Board.O_CELL);
                subject.setTile(0, 1, Board.X_CELL);
                subject.setTile(2, 0, Board.O_CELL);

                expect(subject.checkWinner()).to.equal(Board.O_CELL);
            });
        });

        describe('vertical winner', () => {
            const maxCols = 3;
            const players = [Board.X_CELL, Board.O_CELL];

            _.each(players, (player) => {
                for( let col = 0; col < maxCols; col++ ) {
                    it(`Board should have winner as ${player} when vertical win exists in col ${col}.`, () => {
                        const subject = new Board();

                        _.each(_.range(subject.height), (row) => subject.setTile(col, row, player));

                        expect(subject.checkWinner()).to.equal(player)
                    });
                }
            });

            it(`should have ${Board.X_CELL} as winner when realistic col win exists.`, () => {
                const subject = new Board();

                subject.setTile(0, 0, Board.X_CELL);
                subject.setTile(1, 0, Board.O_CELL);
                subject.setTile(0, 1, Board.X_CELL);
                subject.setTile(2, 0, Board.O_CELL);
                subject.setTile(0, 2, Board.X_CELL);

                expect(subject.checkWinner()).to.equal(Board.X_CELL);
            });

            it(`should have ${Board.O_CELL} as winner when realistic col win exists.`, () => {
                const subject = new Board();

                subject.setTile(1, 1, Board.X_CELL);
                subject.setTile(0, 0, Board.O_CELL);
                subject.setTile(2, 2, Board.X_CELL);
                subject.setTile(0, 1, Board.O_CELL);
                subject.setTile(1, 2, Board.X_CELL);
                subject.setTile(0, 2, Board.O_CELL);

                expect(subject.checkWinner()).to.equal(Board.O_CELL);
            });
        });

        describe('diagonal winner', () => {
            const players = [Board.X_CELL, Board.O_CELL];
            _.each(players, (player) => {
                it(`Board should have winner as ${player} when diagonal win exists.`, () => {
                    const subject = new Board();

                    subject.setTile(0, 0, player);
                    subject.setTile(1, 1, player);
                    subject.setTile(2, 2, player);

                    expect(subject.checkWinner()).to.equal(player)
                });
            });

            it(`should have ${Board.X_CELL} as winner when realistic diagonal win exists.`, () => {
                const subject = new Board();

                subject.setTile(0, 0, Board.X_CELL);
                subject.setTile(0, 1, Board.O_CELL);
                subject.setTile(1, 1, Board.X_CELL);
                subject.setTile(1, 0, Board.O_CELL);
                subject.setTile(2, 2, Board.X_CELL);

                expect(subject.checkWinner()).to.equal(Board.X_CELL);
            });

            it(`should have ${Board.O_CELL} as winner when realistic diagonal win exists.`, () => {
                const subject = new Board();

                subject.setTile(0, 1, Board.X_CELL);
                subject.setTile(0, 0, Board.O_CELL);
                subject.setTile(1, 0, Board.X_CELL);
                subject.setTile(1, 1, Board.O_CELL);
                subject.setTile(0, 2, Board.X_CELL);
                subject.setTile(2, 2, Board.O_CELL);

                expect(subject.checkWinner()).to.equal(Board.O_CELL);
            });
        });

    });

    describe('#toString()', () => {
       it('Board should be written to a string', () => {
          const subject = new Board();

          const initialBoard = '   0.000    0.000    0.000\n   0.000    0.000    0.000\n   0.000    0.000    0.000';
          expect(subject.toString()).to.equal(initialBoard);

          const afterFirstMove = '   0.000    0.000    0.000\n   0.000   -1.000    0.000\n   0.000    0.000    0.000';
          subject.setTile(1, 1, -1);
          expect(subject.toString()).to.equal(afterFirstMove);

           const afterSecondMove = '   1.000    0.000    0.000\n   0.000   -1.000    0.000\n   0.000    0.000    0.000';
           subject.setTile(0, 0, 1);
           expect(subject.toString()).to.equal(afterSecondMove);

       });
    });

});







