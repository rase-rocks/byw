/* global describe it */

const expect = require("chai").expect;

const eventTargetValue = require("../client/app/core/event-target-value").default;

const makeMockDomEvent = function (v) {
    return {
        target: {
            value: v
        }
    };
};

describe("event-target-value", function () {

    it("correctly applies the processing function", function() {

        const value = eventTargetValue((v) => v.toUpperCase());

        const lowerCaseValue = "this is lower case";

        const mockDomEvent = makeMockDomEvent(lowerCaseValue);

        const result = value(mockDomEvent);

        expect(result).to.equal(lowerCaseValue.toUpperCase());

    });

    it("handles parseFloat", function () {

        const value = eventTargetValue(parseFloat);

        const strValue = "3";

        const mockDomEvent = makeMockDomEvent(strValue);

        const result = value(mockDomEvent);

        expect(result).to.equal(3);

    });

    it("handles empty input when using parseFloat", function () {
        const value = eventTargetValue(parseFloat);

        const strValue = "";

        const mockDomEvent = makeMockDomEvent(strValue);

        const result = value(mockDomEvent);

        expect(result).to.equal(0);
    });

});