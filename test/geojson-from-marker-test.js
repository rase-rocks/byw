/* global describe it */

const expect = require("chai").expect;
const geojsonFromMarker = require("../client/app/core/model/geojson-from-marker").default;

const mockMarker = function (geojsonCoordinateArray) {
    return {
        getLatLng: function () {
            return {
                lng: geojsonCoordinateArray[0],
                lat: geojsonCoordinateArray[1]
            };
        }
    };
};

describe("geojson-from-marker", function () {

    it("returns valid and correct geojson", function() {

        const latitude = 53.9;
        const longitude = -3.9;
        const geoJsonCoordinates = [longitude, latitude];

        const marker = mockMarker(geoJsonCoordinates);

        const candidate = geojsonFromMarker(marker);

        expect(candidate[0]).to.equal(longitude);
        expect(candidate[1]).to.equal(latitude);

    });

});