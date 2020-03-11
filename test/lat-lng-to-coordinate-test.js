/* global describe it */

const expect = require("chai").expect;

const toCoordinate = require("../client/app/core/model/lat-lng-to-coordinate").default;

//53.0685, -4.07625

const latitudeStr = "53.0685";
const longitudeStr = "-4.07625";

describe("lat-lng-to-coordinate", function () {

    it("correctly formats a Leaflet.js LatLng object to GeoJson coordinate", function () {

        const mockLatLng = {
            lat: parseFloat(latitudeStr),
            lng: parseFloat(longitudeStr)
        };

        const coordinate = toCoordinate(mockLatLng);

        expect(coordinate[0]).to.equal(mockLatLng.lng);
        expect(coordinate[1]).to.equal(mockLatLng.lat);

    });

    it("correctly handles values as strings", function () {

        const mockLatLng = {
            lat: latitudeStr,
            lng: longitudeStr
        };

        const coordinate = toCoordinate(mockLatLng);

        expect(coordinate[0]).to.equal(parseFloat(longitudeStr));
        expect(coordinate[1]).to.equal(parseFloat(latitudeStr));

    });

});