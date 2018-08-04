/* global describe it */

const expect = require("chai").expect;
const locationsContainsLocation = require("../client/app/core/model/locations-contains-location").default;

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

const bodlon = {
    "address": "12 Park Rd, Cardiff CF14 7BQ, UK",
    "category": 0.62,
    "coordinateHash": "gcjtnd5zdc4z",
    "id": "b4f5d878-8ce5-11e8-bb7a-af9dd74034a3",
    "name": "Bodlon",
    "postcode": "CF14 7BQ",
    "timestamp": "2018-07-21T11:54:38.282Z"
};

describe("locationsContainsLocation", function () {

    it("returns true when location is within locations", function () {

        const locations = [siopInc, yrHen, bodlon];

        const result = locationsContainsLocation(locations, yrHen);

        expect(result).to.equal(1);

    });

    it("returns false when not present", function () {

        const locations = [siopInc, yrHen, bodlon];

        const moodyCow = {
            "address": "Llwyncelyn, Aberaeron SA46 0HL, UK",
            "category": 0.75,
            "coordinateHash": "gckcn2nngfjk",
            "id": "c8cdf48f-8ce5-11e8-97ac-eb5f78175dc0",
            "name": "Moody  Cow Farm Coffee Shop",
            "postcode": "SA46 0HL",
            "timestamp": "2018-07-21T11:54:38.283Z"
        };

        const result = locationsContainsLocation(locations, moodyCow);

        expect(result).to.equal(undefined);

    });

});
