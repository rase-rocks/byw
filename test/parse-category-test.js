/* global describe it */

const expect = require("chai").expect;

const parseCategory = require("../existing-data/parse-category");

describe("parse-category", function () {

    it("handles all test types", function () {

        const tests = [
            { value: "70%", output: 70 },
            { value: "50-70%", output: 60 },
            { value: "50 - 70%", output: 60 },
            { value: "category 50", output: 50 },
            { value: "category 50 - 70", output: 60 },
            { value: "", output: 0 },
            { value: undefined, output: 0 }
        ];

        tests.forEach(test => {
            expect(parseCategory(test.value)).to.equal(test.output);
        });

    });

});