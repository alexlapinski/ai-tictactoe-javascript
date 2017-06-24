const { expect } = require('chai');
const Move = require('../models/move');

describe('Move', () => {

    it('should return inputs', () => {

        const subject = new Move(1, 2, -1);

        expect(subject.x).to.equal(1);
        expect(subject.y).to.equal(2);
        expect(subject.player).to.equal(-1);
    });


    it('should throw an error with invalid x value', () => {
        expect(() => {
            new Move(-1, 0, -1);
        }).to.throw(RangeError, 'x');
    });

    it('should throw an error with invalid y value', () => {
        expect(() => {
            new Move(0, -1, -1)
        }).to.throw(RangeError, 'y');
    });

    it('should throw an error with invalid player value', () => {
        expect(() => {
            new Move(0, 0, 0)
        }).to.throw(RangeError, 'player');
    });
});