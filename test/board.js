const {expect} = require('chai');
const _ = require('lodash');
const Move = require('../models/move');
const Board = require('../models/board');
const Game = require('../models/game');


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

    describe('#currentTurn', () => {
        it('should return PlayerX for a new Board', () => {

            const board = new Board();

            expect(board.currentTurn).to.equal(Game.PlayerX);

        });

        it('should return PlayerO for a board after 1 turn.', () => {

            const board = new Board();
            board.applyMove(new Move(0, 0, Game.PlayerX));

            expect(board.currentTurn).to.equal(Game.PlayerO);

        });

        it('should return PlayerX for a board after 2 turns.', () => {

            const board = new Board();
            board.applyMove(new Move(0, 0, Game.PlayerX));
            board.applyMove(new Move(1, 1, Game.PlayerO));

            expect(board.currentTurn).to.equal(Game.PlayerX);

        });
    })

    describe('tiles', () => {
        it(`should all be ${Board.EMPTY_CELL} for a new board`, () => {
            const subject = new Board();

            for( let x = 0; x < subject.width; x++) {
                for( let y = 0; y < subject.height; y++) {
                    const val = subject.getTile(x, y);
                    expect(val).to.equal(Game.EmptyCell);
                }
            }
        });

        describe('#setTile()', () => {
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
        });

        describe('#getTile()', () => {
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

            expect(subject.checkWinner()).to.equal(Game.EmptyCell);
        });

        describe('horizontal winner', () => {
            const maxRows = 3;
            const players = Game.Players;

            _.each(players, (player) => {
                for( let row = 0; row < maxRows; row++ ) {
                    it(`Board should have winner as ${player} when horizontal win exists in row ${row}.`, () => {
                        const subject = new Board();

                        _.each(_.range(subject.height), (col) => subject.setTile(col, row, player));

                        expect(subject.checkWinner()).to.equal(player)
                    });
                }
            });

            it(`should have ${Game.PlayerX} as winner when realistic row win exists.`, () => {
                const subject = new Board();

                subject.setTile(0, 0, Game.PlayerX);
                subject.setTile(0, 1, Game.PlayerO);
                subject.setTile(1, 0, Game.PlayerX);
                subject.setTile(0, 2, Game.PlayerO);
                subject.setTile(2, 0, Game.PlayerX);

                expect(subject.checkWinner()).to.equal(Game.PlayerX);
            });

            it(`should have ${Game.PlayerO} as winner when realistic row win exists.`, () => {
                const subject = new Board();

                subject.setTile(1, 1, Game.PlayerX);
                subject.setTile(0, 0, Game.PlayerO);
                subject.setTile(2, 2, Game.PlayerX);
                subject.setTile(1, 0, Game.PlayerO);
                subject.setTile(0, 1, Game.PlayerX);
                subject.setTile(2, 0, Game.PlayerO);

                expect(subject.checkWinner()).to.equal(Game.PlayerO);
            });
        });

        describe('vertical winner', () => {
            const maxCols = 3;
            const players = Game.Players;

            _.each(players, (player) => {
                for( let col = 0; col < maxCols; col++ ) {
                    it(`Board should have winner as ${player} when vertical win exists in col ${col}.`, () => {
                        const subject = new Board();

                        _.each(_.range(subject.height), (row) => subject.setTile(col, row, player));

                        expect(subject.checkWinner()).to.equal(player)
                    });
                }
            });

            it(`should have ${Game.PlayerX} as winner when realistic col win exists.`, () => {
                const subject = new Board();

                subject.setTile(0, 0, Game.PlayerX);
                subject.setTile(1, 0, Game.PlayerO);
                subject.setTile(0, 1, Game.PlayerX);
                subject.setTile(2, 0, Game.PlayerO);
                subject.setTile(0, 2, Game.PlayerX);

                expect(subject.checkWinner()).to.equal(Game.PlayerX);
            });

            it(`should have ${Game.PlayerO} as winner when realistic col win exists.`, () => {
                const subject = new Board();

                subject.setTile(1, 1, Game.PlayerX);
                subject.setTile(0, 0, Game.PlayerO);
                subject.setTile(2, 2, Game.PlayerX);
                subject.setTile(0, 1, Game.PlayerO);
                subject.setTile(1, 2, Game.PlayerX);
                subject.setTile(0, 2, Game.PlayerO);

                expect(subject.checkWinner()).to.equal(Game.PlayerO);
            });
        });

        describe('diagonal winner', () => {
            const players = Game.Players;
            _.each(players, (player) => {
                it(`Board should have winner as ${player} when diagonal win exists.`, () => {
                    const subject = new Board();

                    subject.setTile(0, 0, player);
                    subject.setTile(1, 1, player);
                    subject.setTile(2, 2, player);

                    expect(subject.checkWinner()).to.equal(player)
                });
            });

            it(`should have ${Game.PlayerX} as winner when realistic diagonal win exists.`, () => {
                const subject = new Board();

                subject.setTile(0, 0, Game.PlayerX);
                subject.setTile(0, 1, Game.PlayerO);
                subject.setTile(1, 1, Game.PlayerX);
                subject.setTile(1, 0, Game.PlayerO);
                subject.setTile(2, 2, Game.PlayerX);

                expect(subject.checkWinner()).to.equal(Game.PlayerX);
            });

            it(`should have ${Game.PlayerO} as winner when realistic diagonal win exists.`, () => {
                const subject = new Board();

                subject.setTile(0, 1, Game.PlayerX);
                subject.setTile(0, 0, Game.PlayerO);
                subject.setTile(1, 0, Game.PlayerX);
                subject.setTile(1, 1, Game.PlayerO);
                subject.setTile(0, 2, Game.PlayerX);
                subject.setTile(2, 2, Game.PlayerO);

                expect(subject.checkWinner()).to.equal(Game.PlayerO);
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

    describe('#applyMove', () => {
        it('should apply a valid move to an empty board.', () => {
            const board = new Board();
            const firstMove = new Move(1, 1, Game.PlayerX);

            board.applyMove(firstMove);

            for(let x = 0; x < board.width; x++) {
                for(let y = 0; y < board.height; y++) {
                    const cellValue = board.getTile(x, y);

                    if(x === firstMove.x && y === firstMove.y) {
                        expect(cellValue).to.equal(firstMove.player);
                    } else {
                        expect(cellValue).to.equal(Game.EmptyCell);
                    }
                }
            }

            const secondMove = new Move(0, 0, Game.PlayerO);

            board.applyMove(secondMove);

            for(let x = 0; x < board.width; x++) {
                for(let y = 0; y < board.height; y++) {
                    const cellValue = board.getTile(x, y);

                    if(x === firstMove.x && y === firstMove.y) {
                        expect(cellValue).to.equal(firstMove.player);
                    } else if( x === secondMove.x && y === secondMove.y ) {
                        expect(cellValue).to.equal(secondMove.player);
                    } else {
                        expect(cellValue).to.equal(Game.EmptyCell);
                    }
                }
            }
        });

        it('should throw error if cell is not empty', () => {

            const board = new Board();

            board.setTile(1, 1, Game.PlayerO);
            board.setTile(0, 0, Game.PlayerX);

            expect(() => {
                board.applyMove(new Move(1, 1, Game.PlayerX));
            }).to.throw(Error, 'empty');

            expect(() => {
                board.applyMove(new Move(0, 0, Game.PlayerO));
            }).to.throw(Error, 'empty');

        });

        it('should throw an error if the PlayerO tries to go first', () => {
            const board = new Board();

            // The First turn is always PlayerX
            expect(() => {
                board.applyMove(new Move(0, 0, Game.PlayerO));
            }).to.throw(Error, 'player');

            expect(board.getTile(0, 0), 'Expected cell to not change').to.equal(Game.EmptyCell);
        });

        it('should throw an error if PlayerX tries to go twice.', () => {
            const board = new Board();
            board.applyMove(new Move(1, 1, Game.PlayerX));

            // The First turn is always PlayerX
            expect(() => {
                board.applyMove(new Move(0, 0, Game.PlayerX));
            }).to.throw(Error, 'player');

            expect(board.getTile(0, 0), 'Expected cell to not change').to.equal(Game.EmptyCell);
        });
    });

    describe('#applyMoveCloning', () => {
        it('should apply a move and not modify the source', () => {
            const initialState = new Board();
            const aMove = new Move(0, 0, Game.PlayerX);

            const newState = initialState.applyMoveCloning(aMove);

            expect(newState.width).to.equal(initialState.width);
            expect(newState.height).to.equal(initialState.height);

            for(let x = 0; x < initialState.width; x++) {
                for(let y = 0; y < initialState.height; y++) {
                    expect(initialState.getTile(x, y)).to.equal(Game.EmptyCell);
                }
            }

            for(let x = 0; x < newState.width; x++) {
                for(let y = 0; y < newState.height; y++) {
                    if( x === aMove.x && y === aMove.y) {
                        expect(newState.getTile(x, y)).to.equal(aMove.player);
                    } else {
                        expect(initialState.getTile(x, y)).to.equal(Game.EmptyCell);
                    }
                }
            }
        });
    })

    describe('#availableMoves()', () => {
        it('should list all moves for empty board (X goes first)', () => {
            const board = new Board();

            const availableMoves = board.availableMoves();

            expect(availableMoves).to.be.an.instanceof(Array);
            expect(availableMoves.length).to.be.equal(board.width*board.height);

            for(let x = 0; x < board.width; x++) {
                for(let y = 0; y < board.height; y++) {

                    const actualMove = _.find(availableMoves, {x, y});

                    expect(actualMove).to.exist;
                    expect(actualMove.x).to.equal(x);
                    expect(actualMove.y).to.equal(y);
                    expect(actualMove.player).to.equal(Game.PlayerX);
                }
            }

        });

        it('should list all available moves for 1 move on board (PlayerO\s first turn & X went first)', () => {
            const board = new Board();

            // Player X takes first turn
            board.applyMove(new Move(1, 1, Game.PlayerX));

            const availableMoves = board.availableMoves();

            expect(availableMoves).to.be.an.instanceof(Array);

            const expectedNumberOfMoves = (board.width * board.height) - 1;
            expect(availableMoves.length).to.equal(expectedNumberOfMoves);

            for(let x = 0; x < board.width; x++) {
                for(let y = 0; y < board.height; y++) {

                    if (x === 1 && y === 1) {
                        continue; // this was X's first turn
                    }

                    const actualMove = _.find(availableMoves, move => move.x === x && move.y === y);

                    expect(actualMove, `actualMove=${actualMove}`).to.exist;
                    expect(actualMove.x).to.equal(x);
                    expect(actualMove.y).to.equal(y);
                    expect(actualMove.player).to.equal(Game.PlayerO);
                }
            }

        });

       it('should return an empty list when game is over', () => {
           const board = new Board();

           // Fill Board so the game is over
           let round = 0;
           for(let x = 0; x < board.width; x++) {
               for(let y = 0; y < board.height; y++) {
                   const player = round % 2 == 0 ? Game.PlayerX : Game.PlayerO;
                   board.applyMove(new Move(x, y, player));
                   round++;
               }
           }

           const availableMoves = board.availableMoves();

           expect(availableMoves).to.be.an.instanceof(Array);
           expect(availableMoves.length).to.be.equal(0);
       });

       it('should return last move when only one move is left', () => {
           const board = new Board();

           const maxRounds = board.width*board.height;
           const secondToLastRound = maxRounds - 1;

           // Fill Board so the game is over
           let round = 0;
           for(let x = 0; x < board.width; x++) {
               for(let y = 0; y < board.height; y++) {
                   if (round === secondToLastRound) {
                       break;
                   }
                   const player = round % 2 == 0 ? Game.PlayerX : Game.PlayerO;
                   const move = new Move(x, y, player);
                   board.applyMove(move);
                   round++;
               }
           }

           console.log(board.toString());

           const availableMoves = board.availableMoves();

           expect(availableMoves).to.be.an.instanceof(Array);
           expect(availableMoves.length).to.be.equal(1);

           const lastMove = _.first(availableMoves);
           expect(lastMove).to.exist;

           // The way we filled the board above is from top-left to bottom-right
           // so our last move should be the bottom-right corner
           expect(lastMove.x).to.equal(board.width-1);
           expect(lastMove.y).to.equal(board.height-1);

           // We filled the board with even rounds being 'X'
           // there are 9 total moves in the board (width:3 * height:3 = moves:9), starting at 0
           // so the last move is for player 'X'
           expect(lastMove.player).to.equal(Game.PlayerX, 'Expected PlayerX');
       });
    });
});







