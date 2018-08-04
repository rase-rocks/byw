/* global describe it */

const expect = require("chai").expect;
const locationUpdateCategory = require("../client/app/core/model/location-update-category").default;

describe("locationUpdateCategory", function () {

    it("returns the expected result", function () {

        const oldValue = 0.75;
        const newValue = 0.5;
        const factor = 3;

        const yrHen = {
            "address": "14-16 Bridge St, Aberystwyth SY23 1PZ, UK",
            "category": 0.75,
            "coordinateHash": "gcm45j8gnurg",
            "id": "e53d01e4-8ce5-11e8-a1b3-e720a48738e2",
            "name": "Yr Hen Lew Du - Pub",
            "postcode": "SY23 1PZ",
            "timestamp": "2018-07-21T11:54:38.285Z"
        };

        const updatedYrHen = locationUpdateCategory(yrHen, newValue, factor);

        const distance = (Math.abs(newValue - oldValue) / factor);
        const result = (oldValue > newValue) ?
            oldValue - distance :
            oldValue + distance;

        expect(updatedYrHen.category).to.equal(result);
        expect(updatedYrHen === yrHen).to.equal(false);

        Object.keys(yrHen)
            .filter(key => key !== "category")
            .forEach(key => {
                expect(updatedYrHen[key]).to.equal(yrHen[key]);
            });

    });

});