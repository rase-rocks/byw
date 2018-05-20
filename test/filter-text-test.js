/* global describe it */

const filterText = require("../client/app/core/model/filter-locations/filter-text").default;

const api = {};

describe("filter-text", function () {
    it("returns locations with properties fuzzy matching search string", function (done) {

        const locations = [
            {
                name: "The cafe",
                address: "The cafe, The Street, Town"
            },
            {
                name: "Alfies",
                address: "The cafe, 12 The road, Newtown"
            },
            {
                name: "Balfours",
                address: "13 Main Street, City"
            }
        ];

        filterText(api, "cafe", locations)
            .then(function (results) {
                if (results.length == 2) {
                    done();
                } else {
                    done(new Error("Incorrect filter results for text"));
                }
            });

    });
});