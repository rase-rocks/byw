/* global describe it */

const expect = require("chai").expect;

const parseCoordinateHash = require("../existing-data/parse-coordinate-hash").default;

describe("parseCoordinateHash", function () {

    it("returns a determinstic hash for a set of coordinates", function () {

        const coordinates = [
            [53.9, -3.9],
            [55.02134, -2.78473],
            [55.9, -1],
            []
        ];

        coordinates.forEach(coord => {
            const hash = parseCoordinateHash(coord);
            
            expect(typeof hash).to.equal("string");
            expect(hash.length > 0).to.equal(true);
            
            for (var i = 0; i < 10; i++) {
                const h = parseCoordinateHash(coord);
                expect(h).to.equal(hash);
            }

        });

    });

});