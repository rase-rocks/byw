/* global describe it */

const expect = require("chai").expect;
const formatCoordinate  = require("../client/app/pages/submit/form/form").formatCoordinate;
const PLACEHOLDER = require("../client/app/pages/submit/form/form").coordinateInputPlaceholder;

describe("form-ui", function () {

    describe("formatCoordinate", function () {

        it("correctly formats geojson", function () {
            const geojson = [-3.9, 53.9];
            const result = formatCoordinate(geojson);
            expect(result).to.equal("53.9, -3.9");
        });

        it("handles an empty coordinate", function () {
            const result = formatCoordinate();
            expect(result).to.equal(PLACEHOLDER);
        });

        it("handles a null coordinate", function () {
            const result = formatCoordinate(null);
            expect(result).to.equal(PLACEHOLDER);
        });

    });

});