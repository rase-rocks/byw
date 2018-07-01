/* global describe it */

const expect = require("chai").expect;

const safeParseFloat = require("../client/app/core/model/safe-parse-float");

describe("safe-parse-float", function () {

    it("handles object types", function () {

        const tests = [
            {value: 0.5, output: 0.5},
            {value: "", output: 0},
            {value: "0.5", output: 0.5},
            {value: "T", output: 0},
            {value: undefined, output: 0},
            {value: {}, output: 0},
            {value: [], output: 0}
        ];

        tests.forEach(test => {
            const result = safeParseFloat(test.value);
            expect(result).to.equal(test.output);
        });

    });

});

