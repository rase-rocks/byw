/* global describe it */
const expect = require("chai").expect;
const { adjustedCategoryFromValues } 
= require("../api-gateway/submit/byw-submission-handler/adjusted-category-from-values");

describe("adjusted-category-from-values", function () {

    it("returns the expected value with add", function () {

        const oldValue = 0.5;
        const targetValue = 0.75;
        const factor = 3;

        const newValue = adjustedCategoryFromValues(oldValue, targetValue, factor);

        const expected = ((targetValue - oldValue) / factor) + oldValue;

        expect(newValue).to.equal(expected);

    });

    it("returns the expected value with minus", function () {

        const oldValue = 0.5;
        const targetValue = 0.3;
        const factor = 3;

        const newValue = adjustedCategoryFromValues(oldValue, targetValue, factor);

        const expected = oldValue - ((oldValue - targetValue) / factor);

        expect(newValue).to.equal(expected);

    });

});