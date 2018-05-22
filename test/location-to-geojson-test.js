/* global describe it */

const expect = require("chai").expect;

const locationToGeoJSON = require("../client/app/core/model/location-to-geojson").default;

const latiude = "52.4159479";
const longitude = "-4.06281809999996";

const sample = {
    "name":"Aberystwyth Arts Centre",
    "address":"Aberystwyth University - Penglais Campus, Aberystwyth SY23 3DE, UK",
    "coordinates":[longitude, latiude],
    "category":"75%+"
};

describe("location-to-geojson", function () {

    it("correctly orders coordiates for GeoJSON", function () {

        const json = locationToGeoJSON(sample);

        expect(json.type).to.equal("Feature");
        expect(json.geometry.coordinates[0]).to.equal(parseFloat(longitude));
        expect(json.geometry.coordinates[1]).to.equal(parseFloat(latiude));

    });

    it("correctly records properties", function () {

        const json = locationToGeoJSON(sample);

        const properties = json.properties;

        expect(properties.name).to.equal(sample.name);
        expect(properties.address).to.equal(sample.address);
        expect(properties.category).to.equal(sample.category);


    });

    it("handles floating point coordinates", function () {

        const floatingPointSample = Object.assign({}, sample, {"coordinates": sample.coordinates.map(parseFloat) });

        const json = locationToGeoJSON(floatingPointSample);

        expect(json.geometry.coordinates[0]).to.equal(parseFloat(longitude));
        expect(json.geometry.coordinates[1]).to.equal(parseFloat(latiude));

    });

});


