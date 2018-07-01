/* global describe it */

const expect = require("chai").expect;

const clamp = require("../client/app/core/model/clamp").default;

describe("clamp", function () {

    it("clamps values", function () {

        const tests = [
            {value: 0.5, min: 0, max: 1, expected: 0.5},
            {value: 0.5, min: 1, max: 2, expected: 1},
            {value: 5, min: 0, max: 1, expected: 1}
        ];

        tests.forEach(test => {
            expect(clamp(test.value, test.min, test.max)).to.equal(test.expected);
        });

    });

});