/* global describe it */

const expect = require("chai").expect;
const arrayMake = require("../client/app/core/model/array-make").default;
const geoHashMatch = require("../client/app/core/model/locations-contains-coordinate").geoHashMatch;
const coordinateFromHash = require("../client/app/core/model/geo-hash").coordinateFromHash;

const sample1 = {
    "coordinateHash": "gcm45w1912zk",
    "name": "Aberystwyth Arts Centre",
    "address": "Aberystwyth University - Penglais Campus, Aberystwyth SY23 3DE, UK",
    "postcode": "SY23 3DE",
    "category": 0.75
};

describe("locations-contains-coordinate", function () {

    it("identifies coordinate in locations to 8 places", function () {

        // starts with hash gcm45w10

        const testHash = "gcm45w12";
        const testCoordinate = coordinateFromHash(testHash);

        const maker = function (index) {
            const coordinateHash = sample1.coordinateHash.substr(0, 7) + index + "zk";
            return Object.assign({}, sample1, { coordinateHash });
        };

        const locations = arrayMake(10, maker);

        const result = geoHashMatch(locations, testCoordinate, 8);

        expect(result).to.not.equal(undefined);
    });

    it("rejects coordinate in locations to 9 places", function () {

        // starts with hash gcm45w10

        const testHash = "gcm45w12";
        const testCoordinate = coordinateFromHash(testHash);

        const maker = function (index) {
            const coordinateHash = sample1.coordinateHash.substr(0, 7) + index + "zk";
            return Object.assign({}, sample1, { coordinateHash });
        };

        const locations = arrayMake(10, maker);

        const result = geoHashMatch(locations, testCoordinate, 9);

        expect(result).to.equal(undefined);
    });



});