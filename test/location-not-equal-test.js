/* global describe it */

const expect = require("chai").expect;

const locationNotEqual = require("../client/app/core/model/location-not-equal").default;
const arrayMake = require("../client/app/core/model/array-make").default;
const arrayCompare = require("../client/app/core/model/array-compare").default;

const sample1 = {
    "coordinateHash": "gcm45w1912zk",
    "name": "Aberystwyth Arts Centre",
    "address": "Aberystwyth University - Penglais Campus, Aberystwyth SY23 3DE, UK",
    "postcode": "SY23 3DE",
    "category": 0.75
};

const sample2 = Object.assign({}, sample1);

const sample3 = Object.assign({}, sample1, {
    "coordinateHash": "gbb45w1912zj"
});

describe("locationNotEqual", function () {

    describe("function only", function () {

        it("handles matching locations", function () {
            const result = locationNotEqual(sample1, sample2);
            expect(result).to.equal(false);
        });

        it("handles non-matching locations", function () {
            const result = locationNotEqual(sample1, sample3);
            expect(result).to.equal(true);
        });

    });

    describe("within array compare", function () {

        it("handles matching array", function () {

            const maker = function () {
                return Object.assign({}, sample1);
            };

            const matching = arrayMake(10, maker);
            const matching2 = arrayMake(10, maker);

            const result = arrayCompare(matching, matching2, locationNotEqual);

            expect(result).to.equal(true);


        });

        it("handles mismatched array", function () {

            const maker = function () {
                return Object.assign({}, sample1);
            };

            const maker2 = function () {
                return Object.assign({}, sample1, { coordinateHash: "gfdsw" });
            };

            const arr = arrayMake(10, maker);
            const arr2 = arrayMake(10, maker2);

            const result = arrayCompare(arr, arr2, locationNotEqual);

            expect(result).to.equal(false);

        });

    });


});