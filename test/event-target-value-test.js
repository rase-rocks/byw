/* global describe it */

const expect = require("chai").expect;

const eventTargetValue = require("../client/app/core/event-target-value").default;

describe("event-target-value", function () {

    it("correctly applies the processing function", function() {

        const value = eventTargetValue((v) => v.toUpperCase());

        const lowerCaseValue = "this is lower case";

        const mockDomEvent = {
            target: {
                value: lowerCaseValue
            }
        };

        const result = value(mockDomEvent);

        expect(result).to.equal(lowerCaseValue.toUpperCase());

    });

});