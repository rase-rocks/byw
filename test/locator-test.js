/* global describe it */
const expect = require("chai").expect;

const geoJsonFromMarker = require("../client/app/pages/submit/locator-map").geoJsonFromMarker;

const MOCK_LAT = 53.9;
const MOCK_LNG = -3.9;

const mockMarker = {
    getLatLng: function () {
        return {
            lat: MOCK_LAT,
            lng: MOCK_LNG
        };
    }
};

describe("locator", function () {

    describe("geoJsonFromMarker", function () {

        it("returns values in correct order", function () {
            const marker = mockMarker;

            const geoJson = geoJsonFromMarker(marker);

            expect(geoJson[0]).to.equal(MOCK_LNG);
            expect(geoJson[1]).to.equal(MOCK_LAT);

        });

    });
});