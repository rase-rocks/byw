/* global describe it */

const expect = require("chai").expect;
const getter = require("../client/app/core/model/coordinates-getter").default;

describe("coordinates-getter", function() {
    it("returns correct coordinates from location object", function () {
        const location = {
            name: "The location", 
            address: "",
            coordinates: [-3.9, 53.9]
        };

        const coordinates = getter(location);

        expect(coordinates[0]).to.equal(-3.9);
        expect(coordinates[1]).to.equal(53.9);

    });
});