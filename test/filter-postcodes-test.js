/* global describe it */

const filterPostcodes = require("../client/app/core/model/filter-locations/filter-postcodes").default;

const api = {
    geocodePostcode: function () {
        return new Promise(function (resolve) {
            resolve([-4.07625, 53.0685]);
        });
    }
};

const searchString = "snowdonPostcode";
// Snowdom Summit
const snowdon = {
    latitude: 53.0685,
    longitude: -4.07625
};

// Caernarfon
const caernarfon = {
    order: 0,
    latitude: 53.141305555555554,
    longitude: -4.276
};

// Machynlleth
const machynlleth = {
    order: 1,
    latitude: 52.590722222222226,
    longitude: -3.8493333333333335
};

// Carmarthen
const carmarthen = {
    order: 2,
    latitude: 51.85347222222222,
    longitude: -4.310138888888889
};

// Give the locations a name we can use to check the results are as we expect
const locations = [snowdon, caernarfon, machynlleth, carmarthen]
    .map(element => {
        return {
            name: "" + element.latitude,
            coordinates: [element.longitude, element.latitude].map(coord => coord + "")
        };
    });

const string = function (number) {
    return `${number}`;
};

describe("filter-postcodes", function () {
    it("returns expected results", function (done) {

        filterPostcodes(api, searchString, locations, 30)
            .then(function (filteredLocations) {
                if (filteredLocations.length !== 2) {
                    done(new Error("Returned incorrect number of results"));
                } else {
                    let success = true;

                    filteredLocations.forEach(result => {
                        if (result.name !== string(snowdon.latitude) && result.name !== string(caernarfon.latitude)) {
                            success = false;
                        } 
                    });

                    if (success) {
                        done();
                    } else {
                        done(new Error("Returned a result out of range"));
                    }
                }
            });

    });
});