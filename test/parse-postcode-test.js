/* global describe it */

const expect = require("chai").expect;

const parsePostcode = require("../existing-data/parse-postcode").default;

describe("parse-postcode", function () {

    it("handles all test types", function () {

        const VALID_POSTCODE = "WA10 8DS";
        const VALID_POSTCODE_2 = "WA108DS";

        const tests = [
            {
                address: `The house, The road, County, ${VALID_POSTCODE}`,
                expectedPostcode: VALID_POSTCODE
            },
            {
                address: `The house, The road, County, ${VALID_POSTCODE_2}`,
                expectedPostcode: VALID_POSTCODE_2
            },
            {
                address: "",
                expectedPostcode: ""
            },
            {
                address: "The house, the road",
                expectedPostcode: ""
            },
            {
                address: undefined,
                expectedPostcode: ""
            }
        ];

        tests.forEach(test => {
            const result = parsePostcode(test.address);
            
            expect(result).to.equal(test.expectedPostcode);
        });


    });

});