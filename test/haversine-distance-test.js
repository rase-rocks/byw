/* global describe it */

const expect = require("chai").expect;

const haversineDistance = require("../client/app/core/model/haversine-distance").haversineDistance;
const makeArraySort = require("../client/app/core/model/haversine-distance").makeArraySort;

// These coordinates come from Google maps and the test expectation is generated using Wolfram Alpha
// The level of accuracy for the purpose of this data only ever has to be rough as it
// purely for the sorting and finding of nearby points. The actual distances are not used.

const toGeoJson = function (coordinate) {
    return [coordinate.longitude, coordinate.latitude];
};

// Snowdom Summit
const base = {
    latitude: 53.0685,
    longitude: -4.07625
};

// Caernarfon
const loc1 = {
    order: 0,
    latitude: 53.141305555555554,
    longitude: -4.276
};

// Machynlleth
const loc2 = {
    order: 1,
    latitude: 52.590722222222226,
    longitude: -3.8493333333333335
};

// Carmarthen
const loc3 = {
    order: 2,
    latitude: 51.85347222222222,
    longitude: -4.310138888888889
};

describe("Haversine Forumlae", function () {

    it("correctly estimates distances", function () {

        [
            {
                coordinates: [base, loc1],
                expected: "15.6"
            },
            {
                coordinates: [base, loc2],
                expected: "55.3"
            },
            {
                coordinates: [base, loc3],
                expected: "136.0"
            }
        ].forEach((test) => {
            const result = haversineDistance(toGeoJson(test.coordinates[0]), toGeoJson(test.coordinates[1]));
            expect(result.toFixed(1)).to.equal(test.expected);
        });

    });

    it("correctly sorts an array", function () {

        const locationToCoord = function (location) {
            return [location.longitude, location.latitude];
        };

        const baseCoord = locationToCoord(base);
        const haversineSort = makeArraySort(baseCoord, locationToCoord);

        const locs = [loc2, loc3, loc1];

        const sortedPoints = locs
            .sort(haversineSort);

        const locWithOrder = function (idx) {
            return locs.filter(loc => loc.order == idx)[0];
        };

        sortedPoints.forEach((element, idx) => {

            const expectedLoc = locWithOrder(idx);

            expect(element.latitude).to.equal(expectedLoc.latitude);
            expect(element.longitude).to.equal(expectedLoc.longitude);

        });

    });

});