/* global describe it */

const expect = require("chai").expect;

const haversineDistance = require("../client/app/core/model/geodesic").haversineDistance;
const makeArraySort = require("../client/app/core/model/geodesic").makeArraySort;
const makeFilter = require("../client/app/core/model/geodesic").makeFilter;
const bearing = require("../client/app/core/model/geodesic").bearing;
const toBackBearing = require('../client/app/core/model/geodesic').toBackBearing;

// These coordinates come from Google maps and the test expectation is generated using Wolfram Alpha
// The level of accuracy for the purpose of this data only ever has to be rough as it
// purely for the sorting and finding of nearby points. The actual distances are not used.

const toGeoJson = function (coordinate) {
    return [coordinate.longitude, coordinate.latitude];
};
// 53.0685, -4.07625
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

// Friendly names
const snowdon = Object.assign({}, base);
const caernarfon = Object.assign({}, loc1);
const machynlleth = Object.assign({}, loc2);
const carmarthen = Object.assign({}, loc3);

// Getter for test data type
const locationToCoord = function (location) {
    return [location.longitude, location.latitude];
};

describe("geodesic", function () {

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
    
            const haversineSort = makeArraySort(base, locationToCoord);
    
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
    
        it("correctly filters array", function () {
    
            const filter = makeFilter(snowdon, 20, locationToCoord);
    
            const originalLocations = [caernarfon, machynlleth, carmarthen];
    
            const filteredLocations = originalLocations.filter(filter);
    
            expect(filteredLocations.length).to.equal(1);
            expect(filteredLocations[0].latitude).to.equal(caernarfon.latitude);
    
        });
    
    });

    describe("Bearing", function () {

        it("returns the expected value", function () {

            const startCoordinate = [-4.085583854466677, 52.41356327198446];
            const endCoordinate = [-4.0854951490812015, 52.41364978727572];

            const brg = bearing(startCoordinate, endCoordinate);

            const expectedBearing = 32.0217338889.toFixed(9);
            
            expect(brg.toFixed(9)).to.equal(expectedBearing);

        });

    });

    describe("toBackBearing", function () {

        it("returns expected result for value over 180", function () {
            const bearing = 200;
            const expectedBackBearing = 20;

            expect(toBackBearing(bearing)).to.equal(expectedBackBearing);
        });

        it("returns corrent result for values under 180", function () {
            const bearing = 50;
            const expectedBackBearing = 230;

            expect(toBackBearing(bearing)).to.equal(expectedBackBearing);
        });

    });

});
