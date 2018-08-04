/* global describe it */

const expect = require("chai").expect;
const arrayMake = require("../client/app/core/model/array-make").default;
const geoHashMatch = require("../client/app/core/model/locations-contains-coordinate").geoHashMatch;
const coordinateFromHash = require("../client/app/core/model/geo-hash").coordinateFromHash;
const locationsContainsCoordinate = require("../client/app/core/model/locations-contains-coordinate").default;

const sample1 = {
    "coordinateHash": "gcm45w1912zk",
    "name": "Aberystwyth Arts Centre",
    "address": "Aberystwyth University - Penglais Campus, Aberystwyth SY23 3DE, UK",
    "postcode": "SY23 3DE",
    "category": 0.75
};

describe("locations-contains-coordinate", function () {

    describe("geoHashMatch", function () {

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

    describe("locationsContainsCoordinate", function () {

        it("rejects known examples", function () {
    
            const siopInc = {
                "address": "13 Bridge St, Aberystwyth SY23 1PY, UK",
                "category": 0.75,
                "coordinateHash": "gcm45j8u1q2m",
                "id": "d057bbec-8ce5-11e8-8d02-cb2cc5dfae12",
                "name": "Siop Inc",
                "postcode": "SY23 1PY",
                "timestamp": "2018-07-21T11:54:38.283Z"
            };
    
            const yrHen = {
                "address": "14-16 Bridge St, Aberystwyth SY23 1PZ, UK",
                "category": 0.75,
                "coordinateHash": "gcm45j8gnurg",
                "id": "e53d01e4-8ce5-11e8-a1b3-e720a48738e2",
                "name": "Yr Hen Lew Du - Pub",
                "postcode": "SY23 1PZ",
                "timestamp": "2018-07-21T11:54:38.285Z"
            };

            const locations = [siopInc, yrHen];
            const clearFormCoordinateFromYrHen = [-4.085583854466677, 52.41356327198446];
            const precision = 8;
            const result = geoHashMatch(locations, clearFormCoordinateFromYrHen, precision);
        
            expect(result.coordinateHash).to.equal(yrHen.coordinateHash); // sanity check

            const lccResult = locationsContainsCoordinate(locations, clearFormCoordinateFromYrHen, precision, 0.01);

            expect(lccResult).to.equal(true); // The points are the same so the bearing should be 0
    
        });
    
    });




});