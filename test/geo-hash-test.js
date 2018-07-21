/* global describe it */

const expect = require("chai").expect;

const encodeGeoHash = require("../client/app/core/model/geo-hash/geo-hash").encodeGeoHash;
const decodeGeoHashToPoint = require("../client/app/core/model/geo-hash/geo-hash").decodeGeoHashToPoint;
//const neighbours = require("../client/app/core/model/geo-hash/geo-hash").neighbours;

const addCoordinates = require("../client/app/core/model/geo-hash").addCoordinates;
const encodeGeoJsonCoordinates = require("../client/app/core/model/geo-hash").encodeGeoJsonCoordinates;

const sampleLatitude = 52.4159479;
const sampleLongitude = -4.062818;
const geohash = "gcm45w1912zk";

const sample = {
    "coordinateHash": geohash,
    "name": "Aberystwyth Arts Centre",
    "address": "Aberystwyth University - Penglais Campus, Aberystwyth SY23 3DE, UK",
    "postcode": "SY23 3DE",
    "category": 0.75
};

const values = [
    {
        latitude: 38.897,
        longitude: -77.036,
        expectedHash: "dqcjr0bp" // 1600 Pennsylvania Avenue, Washington DC
    },
    {
        latitude: 53.105006,
        longitude: -3.912463,
        expectedHash: "gcmnngrp148h" // Pinnacle Stores, Capel Curig
    },
    {
        latitude: -42.775050,
        longitude: -65.024357,
        expectedHash: "683u8m49q8tp" // Puerto Madryn, Argentina
    }
];

const round = function (coordinateValue, expectedValue) {
    const expectedString = `${expectedValue}`;
    const decimalPlaces = expectedString.split(".")[1].length;
    const roundedCoordinateValue = coordinateValue.toFixed(decimalPlaces);
    return roundedCoordinateValue.slice(0, `${expectedValue}`.length);
};

describe("geo-hash", function () {

    describe("encodeGeoHash", function () {

        it("correctly encodes known values", function () {

            values.forEach((value) => {
                const hash = encodeGeoHash(value.latitude, value.longitude);
                const prefix = hash.slice(0, value.expectedHash.length);
                expect(prefix).to.equal(value.expectedHash);
            });

        });

    });

    describe("decodeGeoHash", function () {

        it("correctly decodes known values", function () {

            values.forEach((value) => {
                const decodedCoordinates = decodeGeoHashToPoint(value.expectedHash);

                const roundedLatitude = round(decodedCoordinates.latitude, value.latitude);
                const roundedLongitude = round(decodedCoordinates.longitude, value.longitude);

                expect(roundedLatitude).to.equal(`${value.latitude}`);
                expect(roundedLongitude).to.equal(`${value.longitude}`);
            });

        });

    });

    describe("addCoordinates", function () {

        it("correctly add coordinates in geojson format", function () {
            const withCoordinates = addCoordinates(sample);

            const lat = parseFloat(round(withCoordinates.coordinates[1], sampleLatitude));
            const lon = parseFloat(round(withCoordinates.coordinates[0], sampleLongitude));

            expect(lat).to.equal(sampleLatitude);
            expect(lon).to.equal(sampleLongitude);

        });

    });

    describe("encodeGeoJsonCoordinates", function () {

        it("correctly encodes coordinates in geojson array format", function () {
            const geojsonCoordinates = [sampleLongitude, sampleLatitude];

            const coordinateHash = encodeGeoJsonCoordinates(geojsonCoordinates);

            expect(coordinateHash).to.equal(geohash);

        });

    });

    // describe("calculateAdjacent", function () {

    //     it("correctly finds adjacent", function () {

    //         const washington = values[0].expectedHash;
    //         const bounding = neighbours(washington);


    //     });

    // });

});