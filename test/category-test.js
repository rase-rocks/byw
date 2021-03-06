/* global describe it */

const expect = require("chai").expect;

const formattedPercentage = require("../client/app/core/model/form/category").formattedPercentage;
const formattedDescription = require("../client/app/core/model/form/category").formattedDescription;
const color = require("../client/app/core/model/form/category").color;
const descriptions = require("../client/app/core/model/form/category").descriptions;

const text = require("../client/app/core/text/data").default;
const supportedLanguages = require("../client/app/core/text/supported-languages").default;

describe("category", function () {

    describe("formattedPercentage", function () {

        it("returns the expected result", function () {

            const tests = [
                { value: 0, output: "0%" },
                { value: 0.25, output: "25%" },
                { value: 0.5, output: "50%" },
                { value: 1, output: "100%" },
                { value: 2, output: "100%" }
            ];

            tests.forEach(test => {
                expect(formattedPercentage(test.value)).to.equal(test.output);
            });

        });

    });

    describe("formattedDescription", function () {
        it("returns the expected result", function () {

            const tests = [
                { value: -1, output: text[supportedLanguages.english].category0 },
                { value: 0, output: text[supportedLanguages.english].category0 },
                { value: 1, output: text[supportedLanguages.english].category5 },
                { value: 2, output: text[supportedLanguages.english].category5 }
            ];

            tests.forEach(test => {
                expect(formattedDescription(test.value), test.output).to.equal(test.output);
            });

        });
    });

    describe("color", function () {

        it("returns the expected color", function () {

            const tests = [
                { value: - 1, output: descriptions[0].color },
                { value: 0, output: descriptions[0].color },
                { value: 1, output: descriptions[descriptions.length - 1].color },
                { value: 2, output: descriptions[descriptions.length - 1].color }
            ];

            tests.forEach(test => {
                expect(color(test.value)).to.equal(test.output);
            });

        });

    });

});