/* global describe it */

const expect = require("chai").expect;
const arrayReversed = require("../client/app/core/model/array-reversed").default;

describe("array-reversed", function() {

    it("returns a new array reversed", function() {

        const original = [1,2,3,4];
        const reversed = arrayReversed(original);

        expect(reversed).to.not.equal(original);
        expect(reversed[3]).to.equal(original[0]);
        expect(reversed[0]).to.equal(original[3]);
    });

});