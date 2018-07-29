/* global describe it */

const expect = require("chai").expect;

const hash = require("../client/app/core/model/marker-opts").hash;
const makeOptsForMarker = require("../client/app/core/model/marker-opts").makeOptsForMarker;
const optsForMarker = require("../client/app/core/model/marker-opts").optsForMarker;

const requiredKeys = [
    "className",
    "iconSize",
    "iconAnchor",
    "html"
];

describe("opts-for-marker", function () {

    describe("optsForMarker", function () {

        it("returns the required keys", function () {

            const opts = optsForMarker(true, true, 0.5);
            const keys = Object.keys(opts);

            requiredKeys.forEach((key) => {

                expect(keys.indexOf(key)).to.not.equal(-1);

            });

        });

    });

    describe("cache", function () {

        it("returns from cache when present", function () {

            const h = hash(false, true, 0.5);
            const obj = { cached: true };

            const cache = { [h]: obj };

            const opts = makeOptsForMarker(cache);

            const candidateOpts = opts(false, true, 0.5);

            expect(candidateOpts.cached).to.equal(true);


        });

        it("caches when not present", function () {

            const cache = {};
            const h = hash(true, true, 0.5);
            const opts = makeOptsForMarker(cache);

            opts(true, true, 0.5);

            const cached = cache[h];

            const keys = Object.keys(cached);

            requiredKeys.forEach((key) => {

                expect(keys.indexOf(key)).to.not.equal(-1);

            });

        });

    });



});