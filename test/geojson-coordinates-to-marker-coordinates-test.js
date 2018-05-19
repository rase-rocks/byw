/* global describe it */

const expect = require("chai").expect;

const toMarkerCoords = require("../client/app/core/model/geojson-coordinates-to-marker-coordinates").default;

describe("geojson-coordinates-to-marker-coordinates", function () {
    it("returns new array with position swapped", function () {
        const geojsonCoordinate = [
            -4.9143407883402324,
            52.724594188467151
        ];

        const markerCoordinate = toMarkerCoords(geojsonCoordinate);

        expect(markerCoordinate[0]).to.equal(geojsonCoordinate[1]);
        expect(markerCoordinate[1]).to.equal(geojsonCoordinate[0]);
    });
});