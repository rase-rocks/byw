/* global describe it */

const expect = require("chai").expect;

const tests = require("../client/app/core/model/filter-locations").tests;
const match = require("../client/app/core/model/filter-locations").match;

describe("filter-locations", function () {

    describe("String type regex", function () {

        describe("postcode", function () {

            it("matches a valid postcode", function () {
                const postcodeTestRe = tests[0].re;

                const validPostcodes = [
                    "ll13 2bj",
                    "LL13 8TG",
                    "wa107ql",
                ];

                validPostcodes.forEach(postcode => {
                    
                    const filter = match(postcode);
                    expect(filter({re: postcodeTestRe})).to.equal(true);

                });

            });

            it("does not match an invalid postcode", function () {
                const postcodeTestRe = tests[0].re;

                const validPostcodes = [
                    "30.1, -3.9",
                    "invalid",
                    "",
                ];

                validPostcodes.forEach(postcode => {
                    
                    const filter = match(postcode);
                    expect(filter({re: postcodeTestRe})).to.equal(false);

                });

            });

        });

        describe("coordinates", function () {

            it("matches valid coordinates", function () {
                const coordinatesRe = tests[1].re;

                const validCoords = [
                    "-3.90, -3.99999",
                    "53.938475, -3.902384",
                    "53.234,-3.982377",
                    "53.4,4.3",
                    "53.234,-3.982377 "
                ];

                validCoords.forEach(coordinate => {
                    
                    const filter = match(coordinate);
                    expect(filter({re: coordinatesRe})).to.equal(true, `Testing: ${coordinate}`);

                });

            });

            it("does not match invalid coordinates", function () {
                const coordinatesRe = tests[1].re;

                const invalidCoords = [
                    "30,40",
                    "invalid",
                    "",
                    "30.9,4",
                    "2,2",
                    "30.9, 2,34",
                    "2, 3",
                    "1"
                ];

                invalidCoords.forEach(coordinate => {
                    
                    const filter = match(coordinate);
                    expect(filter({re: coordinatesRe})).to.equal(false, `Testing: ${coordinate}`);

                });

            });

        });
        

    });

});