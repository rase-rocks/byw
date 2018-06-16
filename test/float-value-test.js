/* global describe it */

const expect = require("chai").expect;
const floatValue = require("../client/app/core/model/float-value").default;

const makeMockEvent = function (value) {
    return {
        target: {
            innerHTML: value
        }
    };
};

describe("float-value", function () {

    it("handles numeric string values", function () {
        const test = 123.3;
        const testStr = "" + test;

        const event = makeMockEvent(testStr);

        expect(floatValue(event)).to.equal(test);
    });

    it("returns zero for non numeric", function () {
        const testStr = "Not a number";
        const event = makeMockEvent(testStr);

        const defaultValue = 30;

        expect(floatValue(event, defaultValue)).to.equal(defaultValue);
    });


});