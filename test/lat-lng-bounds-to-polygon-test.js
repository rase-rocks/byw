/* global describe it */

const expect = require("chai").expect;

const toPolygon = require("../client/app/core/model/lat-lng-bounds-to-polygon").default;

describe("lat-lng-bounds-to-polygon", function () {

    it("correctly orders bounds to coordinates", function () {

        const mockBounds = {
            getNorthWest: function () {
                return { lat: 53.18466746508822, lng: -4.665085673332215 };
            },
            getNorthEast: function () {
                return { lat: 53.18466746508822, lng: -3.12287986278534 };
            },
            getSouthEast: function () {
                return { lat: 52.87661571819092, lng: -3.12287986278534 };
            },
            getSouthWest: function () {
                return { lat: 52.87661571819092, lng: -4.665085673332215 };
            }
        };

        const polygon = toPolygon(mockBounds);

        const nw = polygon[0];
        const ne = polygon[1];
        const se = polygon[2];
        const sw = polygon[3];

        expect(nw[0]).to.equal(mockBounds.getNorthWest().lng);
        expect(nw[1]).to.equal(mockBounds.getNorthWest().lat);

        expect(ne[0]).to.equal(mockBounds.getNorthEast().lng);
        expect(ne[1]).to.equal(mockBounds.getNorthEast().lat);

        expect(se[0]).to.equal(mockBounds.getSouthEast().lng);
        expect(se[1]).to.equal(mockBounds.getSouthEast().lat);

        expect(sw[0]).to.equal(mockBounds.getSouthWest().lng);
        expect(sw[1]).to.equal(mockBounds.getSouthWest().lat);

    });

});