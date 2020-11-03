/* global describe it */

const expect = require("chai").expect;
const capitalizeWord = require("../client/app/core/model/string-capitalize-first-letter").default;

describe("capitalizeWord", function () {

    it("correctly handles known examples", function () {

        const tests = [
            { test: "one", result: "One" },
            { test: "one Letter", result: "One letter" },
            { test: "One letter", result: "One letter" }
        ];

        tests.forEach(test => {
            expect(capitalizeWord(test.test)).to.be.equal(test.result);
        });

    });

    it("correctly handles undefined string", function () {
        expect(capitalizeWord()).to.be.equal("");
    });

    it("correctly handles number types", function () {
        expect(capitalizeWord(1)).to.be.equal("1");
    });

    it("correctly handles empty string", function () {
        expect(capitalizeWord("")).to.be.equal("");
    });

});