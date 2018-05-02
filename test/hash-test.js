/* global describe it */

const expect = require("chai").expect;

const hash = require("../client/app/core/hash").default;
const strHash = require("../client/app/core/hash").strHash;

const tests = [
    "a string to be hashed",
    "a string to be hashed",
    "a string to be hashed",
    "a string to be hashed",
    "a string to be hashed",
    "a string to be hashed",
    "a string to be hashed",
    "a string to be hashed",
    "a string to be hashed",
    "a string to be hashed",
    67,
    undefined,
    { key: "value" },
    [{ key: "1" }, { key: "2" }]
];

const stringTests = [
    "a string to be hashed",
    "a string to be hashed",
    "a string to be hashed",
    "a string to be hashed",
    "a string to be hashed",
    "a string to be hashed",
    "a string to be hashed",
    "a string to be hashed",
    "a string to be hashed",
    "a string to be hashed",
    undefined,
    "a string to be hashed",
];

describe("hash", function () {

    describe("hashing values", function () {

        it("returns strings from all passed in", function () {

            tests.forEach((candidate) => {
                const result = hash(candidate);
                expect(typeof result).to.equal("string");
            });


        });

        it("handles being passed undefined", function () {
            const test = undefined;
            const result = hash(test);
            expect(typeof result).to.equal("string");
        });

        it("returns correct hash for multiple values", function () {

            const firstAttempt = tests.map(test => hash(test));
            const secondAttempt = tests.map(test => hash(test));

            firstAttempt.forEach((attempt, idx) => {
                expect(attempt).to.equal(secondAttempt[idx]);
            });

        });

    });

    describe("Hash Performance", function () {

        const time = function (fn, count, label = "hash") {
            console.time(label);

            for (let i = 0; i < count; i++) {
                fn();
            }

            console.timeEnd(label);
        };

        const attempts = 10000;

        describe("strHash", function () {

            time(function () {

                stringTests.forEach(test => strHash(test));

            }, attempts, "strHash");


        });

        describe("hash", function () {

            time(function () {

                tests.forEach(test => hash(test));

            }, attempts, "hash");

        });

    });

});