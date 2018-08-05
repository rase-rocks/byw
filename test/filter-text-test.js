/* global describe it */

const filterText = require("../client/app/core/model/filter-locations/filter-text").default;

const api = {};

describe("filter-text", function () {
    it("returns locations with properties fuzzy matching search string", function (done) {

        const locations = [
            {
                name: "The Cafe",
                address: "The Cafe, The Street, Town"
            },
            {
                name: "Alfies",
                address: "The Cafe, 12 The road, Newtown"
            },
            {
                name: "Balfours",
                address: "13 Main Street, City"
            },
            {
                name: "Ty Coffi",
                address: "Y Stryd Fawr, Bala"
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

    it("handles case insensitive results", function (done) {

        const locations = [
            {
                name: "Ty Coffi",
                address: "Y Stryd Fawr, Bala"
            },
            {
                name: "Alfies",
                address: "The Cafe, 12 The road, Newtown"
            },
            {
                name: "Balfours",
                address: "13 Main Street, City"
            }
        ];

        filterText(api, "COFFI", locations)
            .then(function (results) {
                if (results.length == 1) {
                    done();
                } else {
                    done(new Error("Did not handle case insensitive search"));
                }
            });

    });

});